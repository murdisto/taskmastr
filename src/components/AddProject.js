import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';

export const AddProject = ({ shouldShow = false }) => {
	const [show, setShow] = useState(shouldShow);
	const [projectName, setProjectName] = useState('');
	const { currentUser } = firebase.auth();
	const projectId = generatePushId();
	const { setProjects } = useProjectsValue();

	const addProject = () =>
		projectName &&
		firebase
			.firestore()
			.collection('projects')
			.add({
				projectId,
				name: projectName,
				userId: currentUser.uid,
			})
			.then(() => {
				setProjects([]);
				setProjectName('');
				setShow(false);
			});

	return (
		<div className='add-project'>
			{show && (
				<div className='add-project__input'>
					<input
						value={projectName}
						onChange={(event) => setProjectName(event.target.value)}
						className='add-project__name'
						type='text'
						placeholder='Project name'
					/>
					<div className='add-project__buttons'>
						<span
							className='add-project__cancel'
							onClick={() => setShow(false)}
						>
							Cancel
						</span>
						<button
							className='add-project__submit'
							type='button'
							onClick={() => addProject()}
						>
							Add Project
						</button>
					</div>
				</div>
			)}
			<div onClick={() => setShow(!show)}>
				<span className='add-project__plus'>+</span>
				<span className='add-project__text'>Add Project</span>
			</div>
		</div>
	);
};
