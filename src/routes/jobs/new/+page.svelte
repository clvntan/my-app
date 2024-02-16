<script>
	// Import necessary modules and functions
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { getUserId } from './../../../utils/auth.js';
	import { createJobAlert, createJobFailedAlert } from '../../../utils/alert.js';

	// Define variables to manage form errors and loading status
	let formErrors = {};
	let clicked = false; // Set 'false' as a default status

	// Function to handle job creation form submission
	async function createJob(evt) {
		evt.preventDefault();
		clicked = true; // Set to true to trigger the loading status

		// Get the user ID from local storage
		const getLocalId = getUserId();

		// Extract job data from the form
		const jobData = {
			user: getLocalId,
			title: evt.target['title'].value,
			minAnnualCompensation: evt.target['minAnnualCompensation'].value,
			maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
			description: evt.target['description'].value,
			requirements: evt.target['requirements'].value,
			applicationInstructions: evt.target['applicationInstructions'].value,
			location: evt.target['location'].value,
			employer: evt.target['employer'].value
		};

		// Send a POST request to the backend to create a new job
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jobData)
		});

		// Parse the response
		const res = await resp.json();

		// Check the status of the response
		if (resp.status == 200) {
			// If successful, navigate to the newly created job page and display success alert
			goto(`/jobs/${res.id}`);
			createJobAlert();
		} else {
			// If there are errors, handle them and display a failure alert
			formErrors = res.data;
			createJobFailedAlert();
			clicked = false; // Set clicked to false to stop the loading status
		}
	}
</script>

<!-- Heading -->
<h1 class="text-center text-xl font-bold">Create A Job</h1>
<div class="container mx-auto px-8 lg:px-0 mt-10">
	<form on:submit={createJob}>
		<!-- Job Title -->
		<div class="form-control w-full">
			<label class="label" for="title">
				<span class="label-text">Job Title</span>
			</label>
			<input
				type="text"
				name="title"
				placeholder="Software Engineer"
				class="input input-bordered w-full"
			/>
			{#if 'title' in formErrors}
				<label class="label" for="title">
					<span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
				</label>
			{/if}
		</div>
		<!-- Min. Annual Compensation -->
		<div class="form-control mw-full">
			<label class="label" for="title">
				<span class="label-text">Min. Annual Compensation</span>
			</label>
			<input
				type="number"
				name="minAnnualCompensation"
				placeholder="40000"
				class="input input-bordered w-full"
			/>
			<label class="label" for="salary">
				<span class="label-text-alt">USD</span>
				<span class="label-text-alt">per annum</span>
			</label>
			{#if 'minAnnualCompensation' in formErrors}
				<label class="label" for="minAnnualCompensation">
					<span class="label-text-alt text-red-500"
						>{formErrors['minAnnualCompensation'].message}</span
					>
				</label>
			{/if}
		</div>
		<!-- Max. Annual Compensation -->
		<div class="form-control w-full">
			<label class="label" for="title">
				<span class="label-text">Max. Annual Compensation</span>
			</label>
			<input
				type="number"
				name="maxAnnualCompensation"
				placeholder="40000"
				class="input input-bordered w-full"
			/>
			<label class="label" for="salary">
				<span class="label-text-alt">USD</span>
				<span class="label-text-alt">per annum</span>
			</label>
			{#if 'maxAnnualCompensation' in formErrors}
				<label class="label" for="maxAnnualCompensation">
					<span class="label-text-alt text-red-500"
						>{formErrors['maxAnnualCompensation'].message}</span
					>
				</label>
			{/if}
		</div>
		<!-- Company -->
		<div class="form-control w-full">
			<label class="label" for="salary">
				<span class="label-text">Company Name</span>
			</label>
			<input
				type="text"
				name="employer"
				placeholder="e.g. Facebook"
				class="input input-bordered w-full"
			/>
			{#if 'employer' in formErrors}
				<label class="label" for="employer">
					<span class="label-text-alt text-red-500">{formErrors['employer'].message}</span>
				</label>
			{/if}
		</div>
		<!-- Job Location -->
		<div class="form-control w-full">
			<label class="label" for="salary">
				<span class="label-text">Job Location</span>
			</label>
			<input
				type="text"
				name="location"
				placeholder="e.g. Singapore"
				class="input input-bordered w-full"
			/>
			{#if 'location' in formErrors}
				<label class="label" for="location">
					<span class="label-text-alt text-red-500">{formErrors['location'].message}</span>
				</label>
			{/if}
		</div>
		<!-- Description -->
		<div class="form-control w-full">
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<textarea class="textarea textarea-bordered h-24" name="description" placeholder></textarea>
			{#if 'description' in formErrors}
				<label class="label" for="description">
					<span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
				</label>
			{/if}
		</div>
		<!-- Requirement -->
		<div class="form-control w-full">
			<label class="label" for="requirements">
				<span class="label-text">Requirements</span>
			</label>
			<textarea class="textarea textarea-bordered h-24" name="requirements" placeholder></textarea>
			{#if 'requirements' in formErrors}
				<label class="label" for="requirements">
					<span class="label-text-alt text-red-500">{formErrors['requirements'].message}</span>
				</label>
			{/if}
		</div>
		<!-- Application Instruction -->
		<div class="form-control w-full">
			<label class="label" for="application-instruction">
				<span class="label-text">Application Instruction</span>
			</label>
			<textarea class="textarea textarea-bordered h-24" name="applicationInstructions" placeholder
			></textarea>
			{#if 'applicationInstructions' in formErrors}
				<label class="label" for="applicationInstructions">
					<span class="label-text-alt text-red-500"
						>{formErrors['applicationInstructions'].message}</span
					>
				</label>
			{/if}
		</div>
		<!-- Button -->
		{#if clicked}
			<button class="btn btn-accent w-full mt-8">
				<span class="loading loading-spinner"></span>
				loading...
			</button>
		{:else}
			<button class="btn btn-accent w-full mt-8" type="submit"> Post Job </button>
		{/if}
	</form>
</div>

<div class="mt-28"></div>
