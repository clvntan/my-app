<script>
  // Importing the humanize library to format numbers
  import humanize from 'humanize-plus';

  // Declaring a prop named 'data' to receive job data from the parent component
  export let data;
</script>

<!-- Hero section with background image -->
<div class="relative h-96 flex justify-center items-center">
  <!-- Background image with absolute positioning -->
  <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.pexels.com/photos/4022041/pexels-photo-4022041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); z-index: 0;"></div>
  <!-- Title for the hero section -->
  <h1 class="text-center text-4xl font-bold relative z-10" style="color: white;">Find Your Next Job</h1>
</div>

<!-- Job cards section -->
<div class="overflow-x-auto w-full" style="padding: 50px;">
  <div class="flex flex-wrap justify-center">
    <!-- Iterating over job data to create job cards -->
    {#each data.jobs as job}
    <div class="flex justify-center">
      <div class="card w-96 md:w-80 lg:w-80 bg-base-100 bg-white text-secondary-content shadow-xl" style="height: 400px; padding: 10px; margin: 20px;">
        <div class="card-body">
          <!-- Job title -->
          <h2 class="card-title">{job.title}</h2>
          <div class="text-sm mt-1">
            <!-- Job details: employer, location, and salary range -->
            <p class="text-sm mt-1">{job.employer} . {job.location} .</p>
            <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
          </div>
          <!-- Date posted -->
          <div class="italic text-xs opacity-50 mt-2">
            posted {new Date(job.created).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          </div>
          <!-- Job description excerpt -->
          <div class="mt-4 text-xs opacity-70">
            {job.description.slice(0, 150)}...
          </div>
          <div class="flex justify-center mt-auto">
            <!-- Read more button linking to job details page -->
            <a class="btn btn-outline btn-accent" href="/jobs/{job.id}">Read More</a>
          </div>
        </div>
      </div>
    </div>
    {/each}
  </div>
</div>
