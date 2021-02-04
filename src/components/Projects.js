import React, { useState } from 'react';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { SingleProject } from './SingleProject';

export const Projects = ({ activeValue = true }) => {
	const [active, setActive] = useState(activeValue);
	const { setSelectedProject } = useSelectedProjectValue();
	const { projects } = useProjectsValue();
	console.log(projects);

	return (
		projects &&
		projects.map((project) => (
			<li
				key={project.projectId}
				data-doc-id={project.docId}
				className={
					active === project.projectId
						? 'active sidebar__project'
						: 'sidebar__project'
				}
				onClick={() => {
					setActive(project.projectId);
					setSelectedProject(project.projectId);
					console.log('project clicked!');
				}}
			>
				<SingleProject project={project} />
			</li>
		))
	);
};
