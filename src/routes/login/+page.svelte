<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	  import { authenticateUser } from '../../utils/auth.js';
    import { goto } from '$app/navigation';
    let formErrors = "";
  
    function postLogin() {
      goto('/');
    }
  
    async function userLogin(evt) {
      evt.preventDefault()
  
  
      const userData = {
        username: evt.target['username'].value,
        password: evt.target['password'].value,
      };
 
        const res = await authenticateUser(userData.username, userData.password);
  
        if (res.success) {
          postLogin();
        } else {
        formErrors = res.res.message;
      }
    }
  </script>


  <h1 class="text-center text-xl font-bold">Log In To Account</h1>
  <div class="flex justify-center items-center mt-8">
      <form on:submit={userLogin} class="w-1/3">
          <div class="form-control w-full">
              <label class="label" for="username">
                  <span class="label-text">Username</span>
              </label>
              <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />

              {#if formErrors}
              <div class="text-red-500 text-center mt-2">{formErrors}</div>
            {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
              
              {#if formErrors}
              <div class="text-red-500 text-center mt-2">{formErrors}</div>
            {/if}
          </div>
  
  
          <div class="form-control w-full mt-4">
              <button class="btn btn-md">Log In</button>
          </div>
      </form>
  </div>