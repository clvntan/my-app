<script>
	// Importing necessary functions and constants from other modules
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { getTokenFromLocalStorage, getUserId } from '../../../../utils/auth.js';

	// Declaring variables
	export let data;
	let formErrors = '';
	let clicked = false;

	// Function to update job details
	async function updateJob() {
		goto(`/jobs/${data.job.id}`);
	}

	// Function to handle job editing form submission
	async function editJob(evt) {
		evt.preventDefault(); // Prevent default form submission behavior
		clicked = true; // Indicates that the submit button has been clicked

		// Retrieve user ID and token from local storage
		const getLocalId = getUserId();
		const getToken = getTokenFromLocalStorage();

		// Extract job data from form inputs
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

		// Send a PATCH request to update the job record
		const resp = await fetch(
			PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`,
			{
				method: 'PATCH',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getToken
				},
				body: JSON.stringify(jobData)
			}
		);

		// Handle response
		if (resp.status == 200) {
			updateJob(); // If successful, update the job details and navigate to the job page
		} else {
			const res = await resp.json(); // If there's an error, parse the response body as JSON
			formErrors = res.data; // Set formErrors variable with the error data
			clicked = false; // Reset clicked status
		}
	}
</script>

<!-- HTML form for updating job details -->
<h1 class="text-center text-xl font-bold">Update Job Details</h1>
<div class="container mx-auto px-8 lg:px-0 mt-10">
	<form on:submit={editJob}> <!-- Call editJob function when form is submitted -->
		<!-- Input fields for job details -->
		<!-- Data values are populated from the 'data' variable passed to the component -->
		<!-- Users can edit these fields -->
		<!-- The 'value' attribute binds each input to the corresponding property of 'data.job' -->
		<!-- The 'name' attribute is used to access the input values in the editJob function -->
		<div class="form-control mw-full">
			<!-- Job Title -->
			<label class="label" for="title">
				<span class="label-text">Job Title</span>
			</label>
			<input
				value={data.job.title}
				type="text"
				name="title"
				placeholder="Software Engineer"
				class="input input-bordered w-full"
			/>
		</div>
		<div class="form-control w-full">
			<!-- min. salary -->
			<label class="label" for="title">
				<span class="label-text">Min. Annual Compensation</span>
			</label>
			<input
				value={data.job.minAnnualCompensation}
				type="number"
				name="minAnnualCompensation"
				placeholder="40000"
				class="input input-bordered w-full"
			/>
			<label class="label" for="salary">
				<span class="label-text-alt">USD</span>
				<span class="label-text-alt">per annum</span>
			</label>
		</div>
		<div class="form-control mw-full">
			<!-- max. salary -->
			<label class="label" for="salary">
				<span class="label-text">Max. Annual Compensation</span>
			</label>
			<input
				value={data.job.maxAnnualCompensation}
				type="number"
				name="maxAnnualCompensation"
				placeholder="40000"
				class="input input-bordered w-full"
			/>
			<label class="label" for="salary">
				<span class="label-text-alt">USD</span>
				<span class="label-text-alt">per annum</span>
			</label>
		</div>
		<div class="form-control w-full">
			<!-- Employer -->
			<label class="label" for="title">
				<span class="label-text">Company Name</span>
			</label>
			<input
				value={data.job.employer}
				type="text"
				name="employer"
				placeholder="e.g. Facebook"
				class="input input-bordered w-full"
			/>
		</div>
		<div class="form-control w-full">
			<!-- Job Location -->
			<label class="label" for="title">
				<span class="label-text">Job Location</span>
			</label>
			<input
				value={data.job.location}
				type="text"
				name="location"
				placeholder="e.g. Singapore"
				class="input input-bordered w-full"
			/>
		</div>
		<div class="form-control w-full">
			<!-- Job Description -->
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<textarea
				value={data.job.description}
				class="textarea textarea-bordered h-24"
				name="description"
				placeholder
			></textarea>
		</div>
		<div class="form-control w-full">
			<!-- Requirement -->
			<label class="label" for="requirements">
				<span class="label-text">Requirements</span>
			</label>
			<textarea
				value={data.job.requirements}
				class="textarea textarea-bordered h-24"
				name="requirements"
				placeholder
			></textarea>
		</div>
		<div class="form-control w-full">
			<!-- Application Instruction -->
			<label class="label" for="application-instruction">
				<span class="label-text">Application Instruction</span>
			</label>
			<textarea
				value={data.job.applicationInstructions}
				class="textarea textarea-bordered h-24"
				name="applicationInstructions"
				placeholder
			></textarea>
		</div>

		<!-- Submit button -->
		{#if clicked} <!-- Show loading state if the submit button was clicked -->
			<button class="btn btn-accent w-full mt-8">
				<span class="loading loading-spinner"></span>
				loading...
			</button>
		{:else} <!-- Show the regular submit button if not clicked -->
			<button class="btn btn-accent w-full mt-8" type="submit"> Update Job </button>
		{/if}
	</form>
</div>