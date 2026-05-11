import { apiFetch } from "./api"

export async function createTransaction(data: unknown) {
    console.log("Creating transaction with data:", data)
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