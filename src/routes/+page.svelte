<script>
  import humanize from 'humanize-plus';
  export let data;
</script>

<div class="relative h-80 flex justify-center items-center">
  <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.pexels.com/photos/4022041/pexels-photo-4022041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); z-index: 0;"></div>
  <h1 class="text-center text-4xl font-bold relative z-10" style="color: white;">Find Your Next Job</h1>
</div>

<div class="container mx-auto flex justify-center items-center">
<div class="overflow-x-auto">
  {#each data.jobs as job}
      <div class="flex flex-col mt-10">
          <div>
              <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
              <div class="text-sm mt-1">
                  {job.employer} . {job.location} .
                  <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(
                          job.maxAnnualCompensation
                      )}</span>
              </div>
              <div class="italic text-xs opacity-50 mt-2">
                 posted {new Date(job.created).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                 })}
            </div>
          </div>

          <div class="mt-4">
              {job.description.slice(0, 150)}...
          </div>
      </div>
  {/each}
</div>
</div>
