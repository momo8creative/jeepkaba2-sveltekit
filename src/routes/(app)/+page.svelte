<script>
	export let data
</script>

<h1 class="p-4 text-center">Selamat datang, <strong>{data?.user?.username}</strong></h1>

<section class="space-y-4 p-4">
	<a class="block bg-slate-400 px-4 py-2 text-white" href="/pemakaian">Daftar Pemakain</a>
	<a class="block bg-slate-400 px-4 py-2 text-white" href="/tambah">Tambah Pemakain</a>
</section>
