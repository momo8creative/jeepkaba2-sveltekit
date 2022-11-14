import { PUBLIC_API_URL } from '$env/static/public'
import { SECRET_API_KEY } from '$env/static/private'
import { error } from '@sveltejs/kit'

const fetchData = async (req) => {
	try {
		const { url: uri, method, body } = req

		const res = await fetch(PUBLIC_API_URL + uri, {
			method: method,
			body: body ? JSON.stringify(body) : undefined,
			headers: {
				'content-type': 'appication/json',
				'api-key': SECRET_API_KEY
			}
		})

		if (res.status == 200) {
			const result = await res.json()
			return result
		}

		return null
	} catch (err) {
		throw error(400, 'Gagal fetch data !')
	}
}

const user = {
	sheet: 'user',
	findUnique: async (param) => {
		const url = `/${user.sheet}`
		const method = 'get'
		const res = await fetchData({ url, method })
		if (!res || res.error) return null
		let users = res.data
		for (const prop in param) {
			users = users.filter((u) => u[prop] == param[prop])
		}
		if (users.length != 1) return null
		let userx = users[0]
		userx['role'] = userx.role.split(',')
		return userx
	},

	get: async (req) => {
		const url = `/${user.sheet}`
		const method = 'get'
		return await fetchData({ url, method })
	},

	post: async (body) => {
		const url = `/${user.sheet}?uniq=username`
		const method = 'post'
		return await fetchData({ url, method, body })
	},
	delete: async (id) => {
		const url = `/${user.sheet}/${id}`
		const method = 'delete'
		return await fetchData({ url, method })
	},
	put: async (id, body) => {
		const url = `/${user.sheet}/${id}`
		const method = 'put'
		return await fetchData({ url, method, body })
	}
}

const pemakaian = {
	sheet: 'pemakaian',
	post: async (body) => {
		const url = `/${pemakaian.sheet}`
		const method = 'post'
		return await fetchData({ url, method, body })
	}
}

export default { user, pemakaian }
