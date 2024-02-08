import { writable } from 'svelte/store';

export const alertMsg = writable('');
export const warningAlert = writable(false);
export const successAlert = writable(false);

// Timeout function to hide alerts
let timeoutId;
function resetTimeout() {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		const variable = [warningAlert, successAlert];
		variable.forEach((index) => index.set(false));
	}, 2500);
}

// All alert funcitons go below
export function signUpAlert() {
	successAlert.set(true);
	alertMsg.set('Sign up successful!');
	resetTimeout();
}

export function postJobLogInAlert() {
	warningAlert.set(true);
	alertMsg.set('Please log in first!');
	resetTimeout();
}

export function logInErrorAlert() {
	warningAlert.set(true);
	alertMsg.set('Incorrect username or password.');
	resetTimeout();
}

export function logInSucAlert() {
	successAlert.set(true);
	alertMsg.set('Successfully logged in. Welcome back!');
	resetTimeout();
}

export function createJobAlert() {
	successAlert.set(true);
	alertMsg.set('Succefully created job!');
	resetTimeout();
}

export function createJobFailedAlert() {
	warningAlert.set(true);
	alertMsg.set('Wrong input!');
	resetTimeout();
}
