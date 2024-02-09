<script>
  // Importing CSS file to apply styles to the component
  import "../app.css";

  // Importing Svelte components: Navigation and NewAlert
  import Navigation from "./nav.svelte";
  import NewAlert from "./alert.svelte";
</script>

<!-- Render the Navigation component -->
<Navigation />

<!-- Render the NewAlert component -->
<NewAlert />

<!-- Render the content provided within the slot -->
<slot />
