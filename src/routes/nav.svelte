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
			<ul class="menu menu-horizontal px-1">
				<li>
					<button on:click={()=> goto ('/jobs/new')}>Post a Job</button>
				</li>
			</ul>
			{:else}
			<ul class="menu menu-horizontal px-1">
				<li>
					<button on:click={()=> goto ('/users/new')}>Post a Job</button>
				</li>
			</ul>
			{/if}

			{#if !$logIn}
			<ul class="menu menu-horizontal px-1">
				<li>
					<button on:click={logOut}><a href="/users/new">Create Account</a></button>
				</li>
			</ul>
			{/if}

			<!--Write a condition for log in and log out button-->
			<!--call the store name in utils-->
			{#if $logIn}
				<!-- step 1: to create a log out button when user logs in = true, true means logged in -->
				<ul class="menu menu-horizontal px-1">
					<li>
						<button on:click={logOut}><a href="/">Log Out</a></button>
						<!-- Set Logout button leads to homepage -->
					</li>
				</ul>
			{:else}
				<ul class="menu menu-horizontal px-1">
					<li>
						<button><a href="/login">Log In</a></button>
						<!-- Set Login button leads log in page -->
					</li>
				</ul>
			{/if}
		</div>
	</div>
</div>
