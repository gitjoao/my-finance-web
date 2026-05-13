import { apiFetch } from "./api";

export async function getBudgetSummary(month: number, year: number) {
    return apiFetch(`/budgets/summary?month=${month}&year=${year}`);
}
