import arrForms from '$lib/fieldTambahPemakaian'

export const load = async (event) => {
	let part = parseInt(event.url.searchParams.get('part'))
	if (isNaN(part)) part = 1

	return { part, next: part + 1, prev: part - 1, arrForms }
}
