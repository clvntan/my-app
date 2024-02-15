<script>
 import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { getUserId } from './../../../utils/auth.js';
    import { createJobAlert, createJobFailedAlert } from '../../../utils/alert.js';

    let formErrors = "";
    let clicked = false; // set 'false' as a default status

    async function createJob(evt) {
        evt.preventDefault();
        clicked = true; // if it's true it will trigger the loading status

    const getLocalId = getUserId();

    const jobData = {
        user: getLocalId,
        title: evt.target['title'].value,
        minAnnualCompensation: evt.target['minAnnualCompensation'].value,
        maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
        description: evt.target['description'].value,
        requirements: evt.target['requirements'].value,
        applicationInstructions: evt.target['applicationInstructions'].value,
        location: evt.target['location'].value,
        employer: evt.target['employer'].value,
    };

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      const res = await resp.json();
      if (resp.status == 200) {
        goto(`/jobs/${res.id}`)
        createJobAlert();
    } else {
        // formErrors = res.data;
        createJobFailedAlert();
        clicked = false;
      }
    }
</script>


    <h1 class="text-center text-xl font-bold">Create A Job</h1>
        <div class="container mx-auto px-8 lg:px-0 mt-10">
            <form on:submit={createJob}>
            <div class="form-control w-full">
                <label class="label" for="title">
                    <span class="label-text">Job Title</span>
                </label>
                <input type="text" name="title" placeholder="Software Engineer" class="input input-bordered w-full">
                <!-- <label class="label" for="title">
                    <span class="label-texxt-alt text-red-500">Missing required value.</span>
                </label> -->
            </div>
            <div class="form-control mw-full">
                <label class="label" for="title">
                    <span class="label-text">Min. Annual Compensation</span>
                </label>
                <input type="number" name="minAnnualCompensation" placeholder="40000" class="input input-bordered w-full">
                <!-- <label class="label" for="minAnnualCompensation">
                    <span class="label-texxt-alt text-red-500">Missing required value.</span>
                </label> -->
                <label class="label" for="salary">
                    <span class="label-text-alt">USD</span>
                    <span class="label-text-alt">per annum</span>
                </label>
            </div>
            <div class="form-control w-full">
                <label class="label" for="title">
                    <span class="label-text">Max. Annual Compensation</span>
                </label>
                <input type="number" name="maxAnnualCompensation" placeholder="40000" class="input input-bordered w-full">
                <!-- <label class="label" for="maxAnnualCompensation">
                    <span class="label-texxt-alt text-red-500">Missing required value.</span>
                </label> -->
                <label class="label" for="salary">
                    <span class="label-text-alt">USD</span>
                    <span class="label-text-alt">per annum</span>
                </label>
            </div>
            <div class="form-control w-full">
                <label class="label" for="salary">
                    <span class="label-text">Company Name</span>
                </label>
                <input type="text" name="employer" placeholder="e.g. Facebook" class="input input-bordered w-full">
                <!-- <label class="label" for="employer">
                    <span class="label-texxt-alt text-red-500">Missing required value.</span>
                </label> -->
            </div>
            <div class="form-control w-full">
                <label class="label" for="salary">
                    <span class="label-text">Job Location</span>
                </label>
                <input type="text" name="location" placeholder="e.g. Singapore" class="input input-bordered w-full">
                <!-- <label class="label" for="location">
                    <span class="label-texxt-alt text-red-500">Missing required value.</span>
                </label> -->
            </div>
            <div class="form-control w-full">
                <label class="label" for="description">
                    <span class="label-text">Description</span>
                </label>
                <textarea class="textarea textarea-bordered h-24" name="description" placeholder></textarea>
                <!-- <label class="label" for="description">
                    <span class="label-texxt-alt text-red-500">Missing required value.</span>
                </label> -->
            </div>
            <div class="form-control w-full">
                <label class="label" for="requirements">
                    <span class="label-text">Requirements</span>
                </label>
                <textarea class="textarea textarea-bordered h-24" name="requirements" placeholder></textarea>
                <!-- <label class="label" for="requirements">
                    <span class="label-texxt-alt text-red-500">Missing required value.</span>
                </label> -->
            </div>
            <div class="form-control w-full">
                <label class="label" for="application-instruction">
                    <span class="label-text">Application Instruction</span>
                </label>
                <textarea class="textarea textarea-bordered h-24" name="applicationInstructions" placeholder></textarea>
                <!-- <label class="label" for="applicationInstructions">
                    <span class="label-texxt-alt text-red-500">Missing required value.</span>
                </label> -->
            </div>

            {#if clicked}
            <button class="btn btn-accent w-full mt-8">
                <span class="loading loading-spinner"></span>
            loading...
            </button>
            {:else}
            <button class="btn btn-accent w-full mt-8" type="submit">
            Post Job
             </button>
            {/if}
            
            <!-- <div class="form-control mx-60 mt-8">
                <button class="btn btn-secondary" type="submit">
                    Post Job
                </button> -->
            </form>
        </div>
    
<div class="mt-28"></div>
        
        
    