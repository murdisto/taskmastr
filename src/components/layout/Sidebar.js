import React, { useState } from 'react';
import {
	BsChevronDown,
	BsChevronUp,
	BsInbox,
	BsCalendarFill,
	BsCalendar,
} from 'react-icons/bs';
import { AddProject } from '../AddProject';
import { useSelectedProjectValue } from '../../context';
import { Projects } from '../Projects';

export const Sidebar = () => {
	const { setSelectedProject } = useSelectedProjectValue();
	const [active, setActive] = useState('inbox');
	const [showProjects, setShowProjects] = useState(true);

	return (
		<div className='sidebar'>
			<ul className='sidebar__list'>
				<li className={active === 'inbox' ? 'active' : undefined}>
					<div
						onClick={() => {
							setActive('inbox');
							setSelectedProject('INBOX');
						}}
					>
						<span>
							<BsInbox />
						</span>
						<span> Inbox </span>
					</div>
				</li>
				<li className={active === 'today' ? 'active' : undefined}>
					<div
						onClick={() => {
							setActive('today');
							setSelectedProject('TODAY');
						}}
					>
						<span>
							<BsCalendar />
						</span>
						<span> Today </span>
					</div>
				</li>
				<li className={active === 'week' ? 'active' : undefined}>
					<div
						onClick={() => {
							setActive('week');
							setSelectedProject('THIS_WEEK');
						}}
					>
						<span>
							<BsCalendarFill />
						</span>
						<span> This Week </span>
					</div>
				</li>
			</ul>

			<div
				className='sidebar__middle'
				onClick={() => setShowProjects(!showProjects)} // this expands and contracts the projects.
			>
				<span>{showProjects ? <BsChevronUp /> : <BsChevronDown />}</span>
				<h2>Projects</h2>
			</div>
			<ul className='sidebar__projects'>{showProjects && <Projects />}</ul>
			{showProjects && <AddProject />}
		</div>
	);
};
