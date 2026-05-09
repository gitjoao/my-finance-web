import { apiFetch } from "./api"

export async function getCategories(
	type?: string,
) {
	const query = type ? `?type=${type}` : ""

	return apiFetch(`/categories${query}`)
}