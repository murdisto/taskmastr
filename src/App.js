import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { AuthProvider } from './Auth';
import { PrivateRoute } from './PrivateRoute';

export const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
					<Switch>
						<PrivateRoute exact path='/' component={Dashboard} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/signup' component={Signup} />
						<Route render={() => <Redirect to='/' />} />
						{/* previous line catches all unnamed routes */}
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
};
