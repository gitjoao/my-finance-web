import { apiFetch } from "./api";

export async function getExpenseCategorySummaries(month: number, year: number) {
    return apiFetch(`/reports/expenses-by-category?month=${month}&year=${year}`);
}

export async function getTransactionsByPeriod(startMonth: number, startYear: number, endMonth: number, endYear: number) {
    return apiFetch(`/reports/transactions-by-period?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`);
}