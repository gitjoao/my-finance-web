import { serverApiFetch } from "../api-service"

export async function getMonthlySummary(month: number, year: number) {
    const response = await serverApiFetch(
        `/dashboard/summary?month=${month}&year=${year}`,
    )

    return response
}