import React from 'react';

export const SingleProject = ({ project }) => {
	return (
		<>
			<span className='sidebar__dot'>•</span>
			<span className='sidebar__project-name'>{project.name}</span>
		</>
	);
};
