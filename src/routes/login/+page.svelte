<script>
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	export let data
	let loading = false
	let resultForm
	function redirectTo() {
		console.log('ok')
		setTimeout(() => {
			goto(data?.redirectTo)
		}, 3000)
	}
</script>

<section class="mx-auto mt-20 w-10/12 bg-white p-8">
	<h1 class="text-3xl">LOGIN</h1>
	<!-- error -->
	{#if resultForm?.type == 'invalid'}
		<div class="my-4 bg-red-100 px-4 py-2 text-red-500">
			<h2 class="text-xl font-semibold">Kesalahan !</h2>
			<p>{resultForm?.data}</p>
		</div>
	{/if}

	<!-- success -->
	{#if resultForm?.type == 'success'}
		<div class="absolute inset-0 flex items-center justify-center bg-black/50">
			<div class="bg-white p-4">Anda berhasil masuk !</div>
		</div>
	{/if}

	{#if loading}
		<div class="animate-pulse p-4 text-center">
			<span>loading...</span>
		</div>
	{/if}

	<form
		action={`?/login`}
		method="post"
		use:enhance={({ form, data, action }) => {
			loading = true
			form.password.value = ''

			return async ({ result, update }) => {
				loading = false
				console.log(result)

				if (result?.type == 'success') redirectTo()
				resultForm = result
			}
		}}
	>
		{#each data?.fields as field}
			<div class="my-4">
				<label for="username">{field.label}</label>
				<input
					class="w-full bg-slate-200 px-4 py-2"
					type={field.type}
					name={field.name}
					id={field.name}
					required
				/>
			</div>
		{/each}

		<div class="my-4">
			<button class="bg-slate-400 px-4  py-2 text-white" type="submit">Masuk</button>
			<!-- <button
				formaction={`?/register`}
				class="bg-slate-100 px-4 py-2 "
				type="submit">Daftar</button
			> -->
		</div>
	</form>
</section>
