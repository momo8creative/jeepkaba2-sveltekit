export const load = async (event) => {
	const fromUrl = event.url.searchParams.get('fromUrl')
	const redirectTo = fromUrl ? fromUrl : '/'

	const fields = [
		{ name: 'username', type: 'text', label: 'Nama' },
		{ name: 'password', type: 'password', label: 'Sandi' }
	]
	return {
		redirectTo,
		fields
	}
}
