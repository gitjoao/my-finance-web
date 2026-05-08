const API_URL = "http://localhost:3333"

type GetTransactionsParams = {
	type?: string
	month?: string
	year?: string
	paymentMethod?: string
	category?: string
}


export async function getTransactions(params?: GetTransactionsParams) {

	const search = new URLSearchParams()

	if (params?.type) {
		search.append("type", params.type)
	}

	if (params?.month) {
		search.append("month", params.month)
	}

	if (params?.year) {
		search.append("year", params.year)
	}

	if (params?.paymentMethod) {
		search.append("paymentMethod", params.paymentMethod)
	}

	if (params?.category) {
		search.append("category", params.category)
	}

	const response = await fetch(
		`${API_URL}/transactions?${search.toString()}`
	)

	if (!response.ok) {
		throw new Error("Failed to fetch summary")
	}

	return response.json()
}

export async function getMonthlySummary(month: number, year: number) {
	const response = await fetch(
		`${API_URL}/dashboard/summary?month=${month}&year=${year}`
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

export async function getTransactionById(id: string) {
	const response = await fetch(`${API_URL}/transactions/${id}`)

	if (!response.ok) {
		throw new Error("Failed to fetch transaction")
	}

	return response.json()
}

export async function updateTransaction(id: string, data: unknown) {
	const response = await fetch(
		`${API_URL}/transactions/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	)

	if (!response.ok) {
		throw new Error("Failed to update transaction")
	}

	return response.json()
}

export async function deleteTransaction(id: string) {
	const response = await fetch(
		`http://localhost:3333/transactions/${id}`,
		{
			method: "DELETE",
		}
	)

	if (!response.ok) {
		throw new Error("Failed to delete")
	}
}