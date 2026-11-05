import { serverApiFetch } from "./api-service";


export async function getExpenseCategorySummaries(month: number, year: number) {
    return serverApiFetch(`/reports/expenses-by-category?month=${month}&year=${year}`);
}

export async function getTransactionsByPeriod(startMonth: number, startYear: number, endMonth: number, endYear: number) {
    return serverApiFetch(`/reports/transactions-by-period?startMonth=${startMonth}&startYear=${startYear}&endMonth=${endMonth}&endYear=${endYear}`);
}