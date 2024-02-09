<script>
	// Importing necessary modules and functions
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	import { getUserId } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';

	// Declaring a variable to store data passed to the component
	export let data;

	// Function to navigate to the job update page
	function editButton() {
		goto(`/jobs/${data.job.id}/update`);
	}
</script>

<div class="container mx-auto px-8 lg:px-0 mt-10">
	<div class="flex">
		<div class="flex-1">
			<!-- Displaying job title and employer -->
			<h1 class="text-3xl font-extrabold">{data.job.title}</h1>
			<p class="text-xl">{data.job.employer}</p>
		</div>
	</div>

	<div class="flex flex-row mt-20">
		<div class="basis-2/3 prose max-w-none w-full">
			<!-- Displaying job description, requirements, and application instructions -->
			<h2 class="text-xl font-thin">Description</h2>
			<SvelteMarkdown source={data.job.description} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Requirements</h2>
			<SvelteMarkdown source={data.job.requirements} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">How to Apply?</h2>
			<p>{data.job.applicationInstructions}</p>
		</div>
		<div class="basis-1/3 ml-4">
			<!-- Displaying job location and salary range -->
			<h2 class="text-xl font-thin">Location</h2>
			<p>{data.job.location}</p>
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Salary Range</h2>
			<p>
				USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
					data.job.maxAnnualCompensation
				)}
			</p>
			<div class="mt-8">
				<!-- Displaying edit button if the logged-in user is the creator of the job -->
				{#if data.job.user == getUserId()}
					<button on:click={editButton} class="btn btn-outline btn-secondary">Edit</button>
				{/if}
			</div>
		</div>
	</div>
</div>
