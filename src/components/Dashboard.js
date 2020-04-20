import React from 'react';
import { firebase } from '../firebase';

export const Dashboard = () => {
	return (
		<div>
			<h2>dashboard</h2>
			<button onClick={() => firebase.auth().signOut()} type='button'>
				Log out
			</button>
		</div>
	);
};
