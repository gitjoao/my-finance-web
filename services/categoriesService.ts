import { apiFetch } from "./api"

export async function getCategories(
	type?: string,
) {
	const query = type ? `?type=${type}` : ""

	return apiFetch(`/categories${query}`)
}

export async function getCategoryById(id: string) {
	return apiFetch(`/categories/${id}`)
}

export async function createCategory(data: unknown) {
	return apiFetch("/categories", {
		method: "POST",
		body: JSON.stringify(data),
	})
}

export async function updateCategory(id: string, data: unknown) {
	return apiFetch(`/categories/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
	})
}

export async function deleteCategory(id: string) {
	return apiFetch(`/categories/${id}`, {
		method: "DELETE",
	})
}