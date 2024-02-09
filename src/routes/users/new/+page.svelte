<script>
  // Importing necessary modules and functions
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { goto } from '$app/navigation';
  import { authenticateUser } from './../../../utils/auth.js';

  // Declaring variables to manage form state
  let formErrors = {}; // Stores form validation errors
  let clicked = false; // Indicates if the create account button is clicked (for loading status)

  // Function to navigate to the new job creation page after successful account creation
  function postSignUp() {
      goto('/jobs/new');
  }

  // Function to handle user account creation form submission
  async function createUser(evt) {
      evt.preventDefault(); // Prevents default form submission behavior
      clicked = true; // Sets clicked to true, triggering loading status

      // Checking if password and password confirmation match
      if (evt.target['password'].value != evt.target['password-confirmation'].value) {
          formErrors['password'] = { message: 'Password confirmation does not match' };
          return;
      }

      // Extracting user data from the form
      const userData = {
          username: evt.target['username'].value,
          email: evt.target['email'].value,
          password: evt.target['password'].value,
          passwordConfirm: evt.target['password-confirmation'].value
      };

      // Sending user data to the backend for account creation
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      });

      // Handling the response from the backend
      if (resp.status == 200) {
          // Authenticating the user after successful account creation
          const res = await authenticateUser(userData.username, userData.password);

          // Redirecting to the new job creation page if authentication is successful
          if (res.success) {
              postSignUp();
          } else {
              // Displaying an alert and throwing an error if authentication fails
              postJobLogInAlert();
              throw 'Sign up succeeded but authentication failed';
          }
      } else {
          // Handling form errors if account creation fails
          const res = await resp.json();
          formErrors = res.data;
          clicked = false; // Resets clicked to false to hide loading status
      }
  }
</script>


<h1 class="text-center text-xl mt-8">Create an Account to Post a Job</h1>

<div class="flex justify-center items-center mt-8">
    <!-- Account creation form -->
    <form on:submit={createUser} class="w-1/3">
        <!-- Username input field -->
        <div class="form-control w-full">
            <label class="label" for="username">
                <span class="label-text">Username</span>
            </label>
            <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
            <!-- Display error message if username field has errors -->
            {#if 'username' in formErrors}
            <label class="label" for="username">
                <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
            </label>
            {/if}
        </div>

        <!-- Email input field -->
        <div class="form-control w-full">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
            <!-- Display error message if email field has errors -->
            {#if 'email' in formErrors}
            <label class="label" for="email">
                <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
            </label>
            {/if}
        </div>

        <!-- Password input field -->
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Password</span>
            </label>
            <input type="password" name="password" placeholder="A minimum of 8 characters, including both letters and numbers" class="input input-bordered w-full" required />
            <!-- Display error message if password field has errors -->
            {#if 'password' in formErrors}
            <label class="label" for="password">
                <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
            </label>
            {/if}
        </div>

        <!-- Password confirmation input field -->
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Confirm Password</span>
            </label>
            <input type="password" name="password-confirmation" placeholder="Repeat passwords" class="input input-bordered w-full" required />
            <!-- Display error message if password confirmation field has errors -->
            {#if 'password' in formErrors}
            <label class="label" for="password">
                <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
            </label>
            {/if}
        </div>

        <!-- Create account button -->
        {#if clicked}
        <!-- Display loading spinner if clicked -->
        <button class="btn btn-outline w-full mt-4">
          <span class="loading loading-spinner"></span>
          loading...
        </button>
        {:else}
            <!-- Display create account button if not clicked -->
            <button class="btn btn-md w-full mt-4">Create an Account</button>
        {/if}

        <!-- Link to login page -->
        <div class="text-center mt-5">
          <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
      </div>

    </form>
</div>
