import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Content } from './layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from '../context';

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
					<h2>dashboard</h2>
					<h3> {currentUser.email} </h3>
					<h3> {currentUser.uid} </h3>
					<button onClick={() => firebase.auth().signOut()} type='button'>
						Log out
					</button>
				</main>
			</ProjectsProvider>
		</SelectedProjectProvider>
	);
};
