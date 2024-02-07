<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
       import { goto } from '$app/navigation';
       import { getTokenFromLocalStorage, getUserId } from '../../../../utils/auth.js';

       export let data;
       let formErrors = "";
     
       async function updateJob() {
         goto(`/jobs/${data.job.id}`);
    //    goto("/")
       }
   
       async function editJob(evt) {
           evt.preventDefault();
       const getLocalId = getUserId();
       const getToken = getTokenFromLocalStorage();
   
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
   
       const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
           method: 'PATCH',
           mode: 'cors',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': getToken
           },
           body: JSON.stringify(jobData)
         });
   
         
        //  const res = await resp.json();
         if (resp.status == 200) {
            updateJob()
            // goto(`/jobs/${res.id}`)
       } else {
        const res = await resp.json();
           formErrors = res.data;
         }
       }
   </script>
   
   
       <h1 class="text-center text-xl font-bold">Update Job Details</h1>
           <div class="container mx-auto px-8 lg:px-0 mt-10">
               <form on:submit={editJob}>
               <div class="form-control mx-60">
                   <label class="label" for="title">
                       <span class="label-text">Job Title</span>
                   </label>
                   <input value={data.job.title} type="text" name="title" placeholder="Software Engineer" class="input input-bordered w-full">
                   <!-- <label class="label" for="title">
                       <span class="label-texxt-alt text-red-500">Missing required value.</span>
                   </label> -->
               </div>
               <div class="form-control mx-60">
                   <label class="label" for="title">
                       <span class="label-text">Min. Annual Compensation</span>
                   </label>
                   <input value={data.job.minAnnualCompensation} type="number" name="minAnnualCompensation" placeholder="40000" class="input input-bordered w-full">
                   <!-- <label class="label" for="minAnnualCompensation">
                       <span class="label-texxt-alt text-red-500">Missing required value.</span>
                   </label> -->
                   <label class="label" for="salary">
                       <span class="label-text-alt">USD</span>
                       <span class="label-text-alt">per annum</span>
                   </label>
               </div>
               <div class="form-control mx-60">
                   <label class="label" for="title">
                       <span class="label-text">Max. Annual Compensation</span>
                   </label>
                   <input value={data.job.maxAnnualCompensation} type="number" name="maxAnnualCompensation" placeholder="40000" class="input input-bordered w-full">
                   <!-- <label class="label" for="maxAnnualCompensation">
                       <span class="label-texxt-alt text-red-500">Missing required value.</span>
                   </label> -->
                   <label class="label" for="salary">
                       <span class="label-text-alt">USD</span>
                       <span class="label-text-alt">per annum</span>
                   </label>
               </div>
               <div class="form-control mx-60">
                   <label class="label" for="salary">
                       <span class="label-text">Company Name</span>
                   </label>
                   <input value={data.job.employer} type="text" name="employer" placeholder="e.g. Facebook" class="input input-bordered w-full">
                   <!-- <label class="label" for="employer">
                       <span class="label-texxt-alt text-red-500">Missing required value.</span>
                   </label> -->
               </div>
               <div class="form-control mx-60">
                   <label class="label" for="salary">
                       <span class="label-text">Job Location</span>
                   </label>
                   <input value={data.job.location} type="text" name="location" placeholder="e.g. Singapore" class="input input-bordered w-full">
                   <!-- <label class="label" for="location">
                       <span class="label-texxt-alt text-red-500">Missing required value.</span>
                   </label> -->
               </div>
               <div class="form-control mx-60">
                   <label class="label" for="description">
                       <span class="label-text">Description</span>
                   </label>
                   <textarea value={data.job.description} class="textarea textarea-bordered h-24" name="description" placeholder></textarea>
                   <!-- <label class="label" for="description">
                       <span class="label-texxt-alt text-red-500">Missing required value.</span>
                   </label> -->
               </div>
               <div class="form-control mx-60">
                   <label class="label" for="requirements">
                       <span class="label-text">Requirements</span>
                   </label>
                   <textarea value={data.job.requirements} class="textarea textarea-bordered h-24" name="requirements" placeholder></textarea>
                   <!-- <label class="label" for="requirements">
                       <span class="label-texxt-alt text-red-500">Missing required value.</span>
                   </label> -->
               </div>
               <div class="form-control mx-60">
                   <label class="label" for="application-instruction">
                       <span class="label-text">Application Instruction</span>
                   </label>
                   <textarea value={data.job.applicationInstructions} class="textarea textarea-bordered h-24" name="applicationInstructions" placeholder></textarea>
                   <!-- <label class="label" for="applicationInstructions">
                       <span class="label-texxt-alt text-red-500">Missing required value.</span>
                   </label> -->
               </div>
               <div class="form-control mx-60 mt-8">
                   <button class="btn btn-accent" type="submit">
                       Update Job
                   </button>
               </form>
           </div>
       
   <div class="mt-28"></div>
           
           
       