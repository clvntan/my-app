<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { authenticateUser } from '../../utils/auth.js';
	import { goto } from '$app/navigation';

	let formErrors = '';
	let clicked = false; // set 'false' as a default status

	function postLogin() {
		goto('/');
	}

	async function userLogin(evt) {
		evt.preventDefault();
		clicked = true; // if it's true it will trigger the loading status

		const userData = {
			username: evt.target['username'].value,
			password: evt.target['password'].value
		};

		const res = await authenticateUser(userData.username, userData.password);

		if (res.success) {
			postLogin();
		} else {
			formErrors = res.res.message;
			clicked = false; // if it's false it won't trigger the loading status
		}
	}

	let sayHi = false;
	let name = '';
	function updateSayHi() {
		if (name !== '') {
			sayHi = true;
		}
	}
</script>

<div
	role="alert"
	class="container mx-auto flex justify-center items-center alert alert-warning shadow-lg"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="stroke-current shrink-0 h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
		/></svg
	>
	<span>Incorrect username or password.</span>
</div>

<h1 class="text-center text-xl font-bold mt-8">Log In To Account</h1>

{#if sayHi}
	<h2 class="text-center text-base mt-8">Welcome back, {name}</h2>
{/if}

<div class="flex justify-center items-center mt-8">
	<form on:submit={userLogin} class="w-1/3">
		<div class="form-control w-full">
			<label class="label" for="username">
				<span class="label-text">Username</span>
			</label>
			<input
				bind:value={name}
				on:input={updateSayHi}
				type="text"
				name="username"
				placeholder="johndoe"
				class="input input-bordered w-full"
			/>

			{#if formErrors}
				<div class="text-red-500 text-center mt-2">{formErrors}</div>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				placeholder=""
				class="input input-bordered w-full"
				required
			/>

			{#if formErrors}
				<div class="text-red-500 text-center mt-2">{formErrors}</div>
			{/if}
		</div>

		{#if clicked}
			<button class="btn btn-outline w-full mt-4">
				<span class="loading loading-spinner"></span>
				loading...
			</button>
		{:else}
			<button class="btn btn-md w-full mt-4">Log In</button>
		{/if}

		<div class="text-center mt-5">
			<a class="link-hover italic text-xs" href="/users/new"
				>Don't have an account? Click here to sign up one instead.</a
			>
		</div>
	</form>
</div>
