import { apiFetch } from "./api";

export async function getExpenseCategorySummaries(month: number, year: number) {
    return apiFetch(`/reports/expenses-by-category?month=${month}&year=${year}`);
}
