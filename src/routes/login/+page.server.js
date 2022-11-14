import { invalid } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import db from '$lib/database'

export const actions = {
	login: async (event) => {
		const formData = Object.fromEntries(await event.request.formData())

		const respon = await db.user.get()
		let user = respon.data.filter((d) => (d.username = formData.username.trim()))[0]
		if (!user) return invalid(400, 'Nama atau sandi salah !')

		// console.log(user)
		const checkPassword = await bcrypt.compare(formData.password, user.password)
		if (!checkPassword) return invalid(400, 'Nama atau sandi salah !')
		const token = crypto.randomUUID()
		let regToken = await db.user.put(user.id, { token })
		if (!regToken || regToken.error) return invalid(500, 'Gagal set token !')

		event.cookies.set('session', token, { path: '/', maxAge: 60 * 60 * 24 })

		return {
			success: true
		}
	},

	register: async (event) => {
		const formData = Object.fromEntries(await event.request.formData())
		formData['username'] = formData.username.trim()
		formData['password'] = await bcrypt.hash(formData.password, 10)
		formData['role'] = '2023,1232,4321,3412'

		const user = await db.user.post(formData)

		return {
			user,
			success: true
		}
	}
}
