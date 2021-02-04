import React from 'react';
import { Header } from './layout/Header';
import { Content } from './layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from '../context';
import { Tasks } from './Tasks';

import { firebase } from '../firebase';

export const Dashboard = () => {
	console.log(firebase.auth().currentUser);
	const { currentUser } = firebase.auth();

	return (
		<SelectedProjectProvider>
			<ProjectsProvider>
				<main>
					<Header />
					<Content />
					<div className='temp'>
						<h2>dashboard</h2>
						<h3> {currentUser.email} </h3>
						<h3> {currentUser.uid} </h3>
						<button onClick={() => firebase.auth().signOut()} type='button'>
							Log out
						</button>
						<Tasks />
					</div>
				</main>
			</ProjectsProvider>
		</SelectedProjectProvider>
	);
};
