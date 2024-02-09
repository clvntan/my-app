// Importing the `writable` store from Svelte
import { writable } from 'svelte/store';

// Creating writable stores for alert message, warning status, and success status
export const alertMsg = writable('');
export const warningAlert = writable(false);
export const successAlert = writable(false);

// Timeout function to hide alerts after a certain period
let timeoutId;
function resetTimeout() {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		// Setting warningAlert and successAlert to false after timeout
		const variable = [warningAlert, successAlert];
		variable.forEach((index) => index.set(false));
	}, 2500); // Timeout duration: 2500 milliseconds (2.5 seconds)
}

// All alert functions go below

// Function to display a success alert for sign up
export function signUpAlert() {
	successAlert.set(true);
	alertMsg.set('Sign up successful!');
	resetTimeout();
}

// Function to display a warning alert when attempting to post a job without logging in
export function postJobLogInAlert() {
	warningAlert.set(true);
	alertMsg.set('Please log in first!');
	resetTimeout();
}

// Function to display a warning alert for login error
export function logInErrorAlert() {
	warningAlert.set(true);
	alertMsg.set('Incorrect username or password.');
	resetTimeout();
}

// Function to display a success alert for successful login
export function logInSucAlert() {
	successAlert.set(true);
	alertMsg.set('Successfully logged in. Welcome back!');
	resetTimeout();
}

// Function to display a success alert for successfully creating a job
export function createJobAlert() {
	successAlert.set(true);
	alertMsg.set('Successfully created job!');
	resetTimeout();
}

// Function to display a warning alert for failed job creation due to missing required values
export function createJobFailedAlert() {
	warningAlert.set(true);
	alertMsg.set('Missing required value!');
	resetTimeout();
}
