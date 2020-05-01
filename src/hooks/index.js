import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export const useProjects = () => {
	const { currentUser } = firebase.auth();
	const [projects, setProjects] = useState([]);

	// console.log('CURRENT USER', currentUser.uid);

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
	// console.log('PROJECTS', projects);

	return { projects, setProjects };
};
