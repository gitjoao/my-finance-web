
import "server-only";

import { serverApiFetch } from "../api-service";
import type { GetTransactionsParams } from "../transactionsService";

export async function getTransactions(params?: GetTransactionsParams) {
    const search = new URLSearchParams();

    if (params?.type) {
        search.append("type", params.type);
    }

    if (params?.month) {
        search.append("month", params.month);
    }

    if (params?.year) {
        search.append("year", params.year);
    }

    if (params?.paymentMethod) {
        search.append("paymentMethod", params.paymentMethod);
    }

    if (params?.categoryId) {
        search.append("categoryId", params.categoryId);
    }

    if (params?.paid !== undefined) {
        search.append("paid", params.paid);
    }

    if (params?.description) {
        search.append("description", params.description);
    }

    const query = search.toString();

    return serverApiFetch(
        `/transactions${query ? `?${query}` : ""}`
    );
}

export async function getTransactionById(id: string) {
    return serverApiFetch(`/transactions/${id}`);
}
