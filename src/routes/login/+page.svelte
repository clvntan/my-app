<script>
	// Importing necessary modules and functions
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { authenticateUser } from '../../utils/auth.js';
	import { goto } from '$app/navigation';
	import { logInErrorAlert, logInSucAlert } from '../../utils/alert.js';

	 // Declaring variables to manage form state
	let formErrors = ''; // Stores form validation errors
	let clicked = false; // Indicates if the login button is clicked (for loading status)

	// Function to navigate to the home page after successful login
	function postLogin() {
		goto('/');
	}

	// Function to handle user login form submission
	async function userLogin(evt) {
		evt.preventDefault(); // Prevents default form submission behavior
		clicked = true; // Sets clicked to true, triggering loading status

		// Extracting username and password from the form
		const userData = {
			username: evt.target['username'].value,
			password: evt.target['password'].value
		};

		// Calling the authenticateUser function to authenticate the user
		const res = await authenticateUser(userData.username, userData.password);

		 // Handling the authentication response
		if (res.success) {
			logInSucAlert(); // Display success alert
			postLogin(); // Redirect to home page
		} else {
			logInErrorAlert(); // Display error alert
			// formErrors = res.res.message; // Uncomment to show specific error messages
			clicked = false; // Resets clicked to false to hide loading status
	}
}

 // Variables to manage UI state
	let sayHi = false; // Indicates whether to display a welcome message
	let name = '';  // Stores the entered username

	// Function to update sayHi based on the entered name
	function updateSayHi() {
		if (name !== '') {
			sayHi = true;  // Sets sayHi to true if name is not empty
		}
	}
</script>

<!-- Login form -->
<h1 class="text-center text-xl font-bold mt-8">Log In To Account</h1>

<!-- Display welcome message if sayHi is true -->
{#if sayHi}
	<h2 class="text-center text-base mt-8">Welcome back, {name}</h2>
{/if}

<!-- Login form -->
<div class="flex justify-center items-center mt-8">
	<form on:submit={userLogin} class="w-1/3">
		<!-- Username input -->
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

			 <!-- Display username validation error if present -->
			{#if formErrors}
				<div class="text-red-500 text-center mt-2">{formErrors}</div>
			{/if}
		</div>

		<!-- Password input -->
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

			<!-- Display password validation error if present -->
			{#if formErrors}
				<div class="text-red-500 text-center mt-2">{formErrors}</div>
			{/if}
		</div>

		<!-- Login button -->
		{#if clicked}
			<button class="btn btn-outline w-full mt-4">
				<span class="loading loading-spinner"></span>
				loading...
			</button>
		{:else}
			<button class="btn btn-md w-full mt-4">Log In</button>
		{/if}

		 <!-- Link to sign up page -->
		<div class="text-center mt-5">
			<a class="link-hover italic text-xs" href="/users/new"
				>Don't have an account? Click here to sign up one instead.</a
			>
		</div>
	</form>
</div>
