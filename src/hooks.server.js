import db from '$lib/database'
import { SECRET_ROLE_ADMIN } from '$env/static/private'

export const handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session')
	if (!session) return await resolve(event)

	const user = await db.user.findUnique({ token: session })
	if (!user) return await resolve(event)
	console.log(user.username)
	const role = user.role.includes(SECRET_ROLE_ADMIN) ? 'admin' : 'member'
	event.locals.user = {
		id: user.id,
		username: user.username,
		role
	}

	return await resolve(event)
}
