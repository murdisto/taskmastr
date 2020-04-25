import React from 'react';
import { BsMoon } from 'react-icons/bs';
import Taskmastr from '../../images/taskmastr';

export const Header = () => {
	return (
		<header className='header'>
			header rendering!
			<nav>
				<div className='logo'>
					<Taskmastr /> <p>TaskMastr</p>
				</div>
				<div className='settings'>
					<ul>
						<li>
							<button type='button'>
								{/* for darkmode later */}
								<BsMoon />
							</button>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
