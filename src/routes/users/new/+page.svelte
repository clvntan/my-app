<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { authenticateUser } from './../../../utils/auth.js';

    let formErrors = {};
    let clicked = false; // set 'false' as a default status
  
    function postSignUp() {
      goto('/jobs/new');
    }
  
    async function createUser(evt) {
      evt.preventDefault();
      clicked = true;  // if it's true it will trigger the loading status
  
      if (evt.target['password'].value != evt.target['password-confirmation'].value) {
        formErrors['password'] = { message: 'Password confirmation does not match' };
        return;
      }
  // get data to send
      const userData = {
        username: evt.target['username'].value,
        email: evt.target['email'].value,
        password: evt.target['password'].value,
        passwordConfirm: evt.target['password-confirmation'].value
      };
  // creation part
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  //verification to get logged in
      if (resp.status == 200) {
        const res = await authenticateUser(userData.username, userData.password);
  
        if (res.success) {
          postSignUp();
        } else {
          postJobLogInAlert();
          throw 'Sign up succeeded but authentication failed';
        }
      } else {
        const res = await resp.json();
        formErrors = res.data;
        clicked = false;  // if it's false it won't trigger the loading status
      }
    }
  </script>
<!-- <div role="alert" class="container mx-auto flex justify-center items-center alert alert-error shadow-lg">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Please sign up first.</span>
</div> -->
  <h1 class="text-center text-xl mt-8">Create an Account to Post a Job</h1>

  <div class="flex justify-center items-center mt-8">
      <form on:submit={createUser} class="w-1/3">
          <div class="form-control w-full">
              <label class="label" for="username">
                  <span class="label-text">Username</span>
              </label>
              <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
              {#if 'username' in formErrors}
              <label class="label" for="username">
                  <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="email">
                  <span class="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
              {#if 'email' in formErrors}
              <label class="label" for="email">
                  <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="A minimum of 8 characters, including both letters and numbers" class="input input-bordered w-full" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text">Confirm Password</span>
              </label>
              <input type="password" name="password-confirmation" placeholder="Repeat passwords" class="input input-bordered w-full" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          {#if clicked}
          <button class="btn btn-outline w-full mt-4">
            <span class="loading loading-spinner"></span>
            loading...
          </button>
          {:else}
              <button class="btn btn-md w-full mt-4">Create an Account</button>
          {/if}

          <div class="text-center mt-5">
            <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
        </div>

      </form>
  </div>