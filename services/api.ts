const API_URL = "http://localhost:3333"

export async function getMonthlySummary(month: number, year: number) {
	const response = await fetch(
		`${API_URL}/transactions/summary?month=${month}&year=${year}`
	)

	if (!response.ok) {
		throw new Error("Failed to fetch summary")
	}

	return response.json()
}

export async function createTransaction(data: unknown) {
	const response = await fetch(
		`${API_URL}/transactions`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	)

	if (!response.ok) {
		throw new Error("Failed to create transaction")
	}

	return response.json()
}