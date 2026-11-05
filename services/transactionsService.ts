
import { apiFetch } from "./api";

export type GetTransactionsParams = {
    type?: string;
    month?: string;
    year?: string;
    paymentMethod?: string;
    categoryId?: string;
    paid?: string;
    description?: string;
};

export async function createTransaction(data: unknown) {
    return apiFetch("/transactions", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function payCreditCardBill(month: number, year: number) {
    return apiFetch("/transactions/pay-credit-card-bill", {
        method: "POST",
        body: JSON.stringify({ month, year }),
    });
}

export async function getTransactionById(id: string) {
    return apiFetch(`/transactions/${id}`);
}

export async function updateTransaction(id: string, data: unknown) {
    return apiFetch(`/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteTransaction(id: string) {
    return apiFetch(`/transactions/${id}`, {
        method: "DELETE",
    });
}
