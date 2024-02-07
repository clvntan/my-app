<script>
	import { isLoggedIn, logOut, logIn } from '/Users/Calvin/Next Academy/my-app/src/utils/auth.js';
	import { goto } from '$app/navigation';
</script>

<div style="display: contents">
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-cass=e text-xl">Next Jobs Listing</a>
		</div>

		<div class="flex-none">
			{#if $logIn}
					<button class="btn mx-5" on:click={()=> goto ('/jobs/new')}>Post a Job</button>
			{:else}
					<button class="btn mx-5"on:click={()=> goto ('/users/new')}>Post a Job</button>
			{/if}

			<!--Write a condition for log in and log out button-->
			<!--call the store name in utils-->
			{#if $logIn}
						<button class="btn" on:click={logOut}><a href="/">Log Out</a></button>
			{:else}
						<button class="btn"><a href="/login">Log In</a></button>
						<!-- Set Login button leads log in page -->
			{/if}

			<label class="cursor-pointer grid place-items-center px-5">
				<input type="checkbox" value="dim" class="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
				<svg class="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
				<svg class="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
			  </label>
		</div>
	</div>
</div>
