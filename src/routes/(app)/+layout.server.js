import { redirect } from '@sveltejs/kit'

export const load = (event) => {
	if (!event.locals.user) throw redirect(303, '/login?fromUrl=' + event.url.pathname)

	return {
		user: event.locals.user
	}
}
