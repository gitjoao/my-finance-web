
import "server-only"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = "http://localhost:3333"

export async function serverApiFetch(
    path: string,
    options?: RequestInit
) {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...options?.headers,
            Cookie: cookieHeader,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (response.status === 204) {
        return null;
    }

    if (response.status === 401 && path !== "/login") {
        redirect("/login");
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(
            data?.message || data?.error || "Erro na requisição"
        );
    }

    return data;
}
