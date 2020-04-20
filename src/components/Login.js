import React, { useCallback, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { firebase } from '../firebase';
import { AuthContext } from '../Auth';

export const Login = ({ history }) => {
	// useCallback hook. returns memoized call back.
	// every value referenced inside callback should also appear in the dependencies array
	const handleLogin = useCallback(
		async (event) => {
			event.preventDefault(); // prevent page reload on submit
			const { email, password } = event.target.elements; // grab the email and password inputs
			try {
				await firebase
					.auth() // grab the input values and send them to firebase to create a new user
					.signInWithEmailAndPassword(email.value, password.value);
				history.push('/'); // then redirect to that user's dashboard
			} catch (error) {
				alert(error); // show an error if there is one
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext); // create new AuthCOntext and set CurrentUser

	if (currentUser) {
		// console.log(currentUser);

		return <Redirect to='/' />;
	}

	return (
		<div className='login'>
			<h2>Log In</h2>
			<form onSubmit={handleLogin}>
				<label htmlFor='email'>
					<input name='email' type='email' placeholder='Email' />
				</label>
				<label htmlFor='email'>
					<input name='password' type='password' placeholder='Password' />
				</label>
				<button type='submit'>Log in</button>
			</form>
			Don&apos;t have an account? <Link to='/signup'>Sign up!</Link>
		</div>
	);
};
