import { ApiError } from "./errors";

const API_URL = "/api"

export async function apiFetch(
	path: string,
	options?: RequestInit,
) {
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
	});

	if (response.status === 204) {
		return null;
	}

	// if (response.status === 401) {
	// 	if (typeof window !== "undefined") {
	// 		window.location.href = "/login";
	// 	}



	const text = await response.text();

	let data = null;

	try {
		data = text ? JSON.parse(text) : null;
	} catch {
		data = { message: text };
	}

	if (!response.ok) {
		console.error("API Error:", {
			path,
			status: response.status,
			statusText: response.statusText,
			response: data,
		});

		throw new ApiError(
			data?.message || data?.error || "Erro na requisição",
			response.status,
			data?.details
		);
	}

	return data;
}
