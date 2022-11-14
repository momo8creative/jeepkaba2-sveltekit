import { invalid } from '@sveltejs/kit'
import db from '$lib/database'

export const actions = {
	add: async (event) => {
		const data = Object.fromEntries(await event.request.formData())
		data['user_id'] = event.locals.user.id
		console.log(data)
		let inValid = undefined
		for (const prop in data) {
			if (data[prop] == '') inValid = prop
			if (inValid) break
		}

		if (inValid) return invalid(400, { invalid: inValid, message: 'Semua wajib diisi !' })

		const respon = await db.pemakaian.post(data)
		console.log(respon)

		return { success: true }
	}
}
