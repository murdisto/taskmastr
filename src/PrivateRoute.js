import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	// grab the currentUser value from context
	const { currentUser } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(routeProps) =>
				currentUser ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};
