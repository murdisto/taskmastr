import React from 'react';
import { BsMoon } from 'react-icons/bs';
import Taskmastr from '../../images/taskmastr';
import { firebase } from '../../firebase';

export const Header = () => {
	return (
		<header className='header'>
			<nav>
				<div className='logo'>
					<Taskmastr /> <p>TaskMastr</p>
				</div>
				<div className='settings'>
					<ul>
						<li className='settings__add'>
							<button
								onClick={() => {
									console.log('settings__add clicked');
								}}
								type='button'
							>
								+
							</button>
						</li>
						<li className='settings__darkmode'>
							<button type='button'>
								<BsMoon />
							</button>
						</li>
					</ul>
					<div className='settings__logout'>
						<button onClick={() => firebase.auth().signOut()} type='button'>
							Log out
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};
