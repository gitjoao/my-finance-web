import { serverApiFetch } from "./api-service";

export async function getBudgetSummary(month: number, year: number) {
    return serverApiFetch(`/budgets/summary?month=${month}&year=${year}`);
}
