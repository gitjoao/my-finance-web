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

export async function payCreditCardBill(month: number, year: number) {
    return await apiFetch(
        `/transactions/pay-credit-card-bill`,
        {
            method: "POST",
            body: JSON.stringify({ month, year }),
        }
    )
}