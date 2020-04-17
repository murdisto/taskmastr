import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { AuthProvider } from './Auth';

export const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
					<Route exact path='/' component={Dashboard} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
				</div>
			</Router>
		</AuthProvider>
	);
};
