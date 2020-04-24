import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export const Dashboard = () => {
	console.log(firebase.auth().currentUser);
	const { currentUser } = firebase.auth();

	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firebase
			.firestore()
			.collection('projects')
			.where('userId', '==', currentUser.uid)
			.orderBy('projectId')
			.get()
			.then((snapshot) => {
				const allProjects = snapshot.docs.map((project) => ({
					...project.data(),
					docId: project.id,
				}));

				if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
					setProjects(allProjects);
				}
			});
	}, [projects, currentUser.uid]); // rerun useEffect if projects or currentUser.uid changes
	console.log(projects);

	return (
		<div>
			<h2>dashboard</h2>
			<h3> {currentUser.email} </h3>
			<h3> {currentUser.uid} </h3>
			<h3> {projects} </h3>
			<button onClick={() => firebase.auth().signOut()} type='button'>
				Log out
			</button>
		</div>
	);
};
