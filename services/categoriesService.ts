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

export async function createCategory(name: string, type: string, slug: string) {
	return apiFetch("/categories", {
		method: "POST",
		body: JSON.stringify({ name, type, slug }),
	})
}

export async function updateCategory(id: string, data: { name: string; type: string; slug: string }) {
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