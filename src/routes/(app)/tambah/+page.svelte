<script>
	import { enhance } from '$app/forms'
	export let data
	let formResult
	let loading = false
	const { arrForms } = data
	let values = {
		sopir: '',
		tujuan: '',
		keperluan: '',
		tgl_berangkat: '',
		jam_berangkat: '',
		tgl_kembali: '',
		jam_kembali: '',
		km_awal: '',
		km_akhir: ''
	}
	$: values.km_jumlah = values.km_akhir - values.km_awal
</script>

<main class="m-4 space-y-4">
	<h1 class="text-2xl font-bold">Tambah Pemakaian</h1>

	<section class="bg-white p-4">
		<form
			class="space-y-2"
			action="?/add"
			method="post"
			use:enhance={() => {
				loading = true
				return async ({ result }) => {
					loading = false
					formResult = result.data
					console.log(result)
				}
			}}
		>
			{#each arrForms.pertama as form}
				<div>
					<label class="opacity-80" class:hidden={data?.part != 1} for={form.name}
						>{form.label}</label
					>
					<input
						class={`w-full border-b-2 border-slate-300 px-4 py-2 focus:border-slate-500 focus:outline-none ${
							formResult?.invalid == form.name ? 'bg-red-200' : 'bg-slate-200'
						}`}
						type={form.type}
						name={form.name}
						id={form.name}
						hidden={data?.part != 1}
						value={form.name == 'sopir' ? 'Santoso' : ''}
					/>
				</div>
			{/each}
			{#each arrForms.kedua as form}
				<div>
					<label class="opacity-80" class:hidden={data?.part != 2} for={form.name}
						>{form.label}</label
					>

					<input
						class={`w-full border-b-2 border-slate-300 px-4 py-2 focus:border-slate-500 focus:outline-none ${
							formResult?.invalid == form.name ? 'bg-red-200' : 'bg-slate-200'
						}`}
						type={form.type}
						name={form.name}
						id={form.name}
						hidden={data?.part != 2}
					/>
				</div>
			{/each}
			{#each arrForms.ketiga as form}
				<div>
					<label class="opacity-80" class:hidden={data?.part != 3} for={form.name}
						>{form.label}</label
					>

					<input
						class="w-full border-b-2 border-slate-300 bg-slate-100  px-4 py-2  focus:border-slate-500 focus:outline-none"
						name={form.name}
						id={form.name}
						bind:value={values[form.name]}
						hidden={data?.part != 3}
						readonly={form.name == 'km_jumlah'}
					/>
				</div>
			{/each}
			{#if data?.part == 3}
				<button
					class="w-full bg-slate-300 px-4 py-2 font-semibold hover:brightness-90"
					type="submit"
				>
					{#if loading}
						<span class="animate-pulse">menyimpan...</span>
					{:else}
						Simpan
					{/if}
				</button>
			{/if}
		</form>
	</section>

	<section class="flex bg-white ">
		<a
			class="flex-1 px-4 py-2 text-center hover:bg-slate-300"
			class:pointer-events-none={data?.part == 1}
			href={`?part=${data?.prev}`}>{'<'} Sebelumnya</a
		>
		<a
			class="flex-1 px-4 py-2 text-center hover:bg-slate-300"
			class:pointer-events-none={data?.part == 3}
			href={`?part=${data?.next}`}>Selanjutnya {'>'}</a
		>
	</section>
</main>
