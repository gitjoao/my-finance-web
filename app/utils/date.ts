export const dateFormatter =
	new Intl.DateTimeFormat("pt-BR", {
		timeZone: "UTC",
		dateStyle: "short",
	})

export const formatMonth = (month: string) => {
	const [year, m] = month.split("-");

	return new Date(
		Number(year),
		Number(m) - 1
	).toLocaleDateString("pt-BR", {
		month: "short",
		year: "2-digit",
	});
}