<script>
	export let data
	if (data?.locals)
		console.log('data locals : ', data.locals)
</script>

<header class="bg-white p-4">
	<a href="/">Jeep Kaba</a>
</header>
<slot />
