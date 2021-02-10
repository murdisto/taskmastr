import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useProjects = () => {
	console.log('useProjects');
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
					console.log('setProjects called', allProjects);
					setProjects(allProjects);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // filling this dependency array was causing a memory leak as it was updating projects, then rerendering when it changed.
	// console.log('PROJECTS', projects);

	return { projects, setProjects };
};

export const useTasks = (selectedProject) => {
	console.log('useTasks called');
	const [tasks, setTasks] = useState([]);
	const [archivedTasks, setArchivedTasks] = useState([]);
	const { currentUser } = firebase.auth();

	useEffect(() => {
		let unsubscribe = firebase
			.firestore()
			.collection('tasks')
			.where('userId', '==', currentUser.uid);

		unsubscribe =
			selectedProject && !collatedTasksExist(selectedProject)
				? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
				: selectedProject === 'TODAY'
				? (unsubscribe = unsubscribe.where(
						'date',
						'==',
						moment().format('MM/DD/YYYY')
				  ))
				: selectedProject === 'INBOX' || selectedProject === 0
				? (unsubscribe = unsubscribe.where('date', '==', ''))
				: unsubscribe;

		unsubscribe = unsubscribe.onSnapshot((snapshot) => {
			const newTasks = snapshot.docs.map((task) => ({
				id: task.id,
				...task.data(),
			}));

			setTasks(
				selectedProject === 'THIS_WEEK'
					? newTasks.filter(
							(task) =>
								moment(task.date, 'MM-DD-YYYY').diff(moment(), 'days') <= 7 &&
								task.archived !== true
					  )
					: newTasks.filter((task) => task.archived !== true)
			);

			setArchivedTasks(newTasks.filter((task) => task.archived !== false));
		});

		return () => unsubscribe();
	}, [currentUser.uid, selectedProject]); // currentUser.uid must be included in the dependency arry

	return { tasks, archivedTasks };
};
