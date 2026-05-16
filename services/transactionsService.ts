import { apiFetch } from "./api"

export async function createTransaction(data: unknown) {
    return await apiFetch(
        `/transactions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    )

}