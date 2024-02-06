<script>
    import SvelteMarkdown from 'svelte-markdown';
    import humanize from 'humanize-plus';
	import { getTokenFromLocalStorage } from '../../../utils/auth.js';
    export let data;

function editButton() {
    goto("/jobs/update")
}

</script>


<div class="container mx-auto px-8 lg:px-0 mt-10">
    <div class="flex">
        <div class="flex-1">
            <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
            <p class="text-xl">{data.job.employer}</p>
        </div>
    </div>

    <div class="flex flex-row mt-20">
        <div class="basis-2/3 prose max-w-none w-full">
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
                <button on:click={editButton} class="btn btn-md">Edit</button>
        </div>
        </div>
    </div>
</div>