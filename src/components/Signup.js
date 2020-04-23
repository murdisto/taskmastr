import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase';

export const Signup = ({ history }) => {
	// useCallback hook. returns memoized call back.
	// every value referenced inside callback should also appear in the dependencies array
	const handleSignup = useCallback(
		async (event) => {
			event.preventDefault(); // prevent page reload on submit
			const { email, password } = event.target.elements; // grab the email and password inputs
			try {
				const response = await firebase
					.auth() // grab the input values and send them to firebase to create a new user
					.createUserWithEmailAndPassword(email.value, password.value);
				console.log(response.user.email);
				console.log(response);
				console.log(email);

				firebase // create a user document in the database
					.firestore()
					.collection('users')
					.doc(email.value)
					.set({ email: response.user.email, uid: response.user.uid });

				history.push('/'); // then redirect to that user's dashboard
			} catch (error) {
				alert(error); // show an error if there is one
			}
		},
		[history]
	);

	return (
		<div className='signup'>
			<h2>Sign Up!</h2>
			<form onSubmit={handleSignup}>
				<label htmlFor='email'>
					<input name='email' type='email' placeholder='Email' />
				</label>
				<label htmlFor='email'>
					<input name='password' type='password' placeholder='Password' />
				</label>
				<button type='submit'>Sign Up</button>
			</form>
			Already have an account? <Link to='/login'>Log in</Link>
		</div>
	);
};
