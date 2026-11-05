import { apiFetch } from "./api";

export async function login(username: string, password: string) {
    return apiFetch(`/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });
}
