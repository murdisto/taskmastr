import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	// grab the currentUser value from context
	const { currentUser } = useContext(AuthContext);
	console.log(rest);

	return (
		<Route
			{...rest} // spread the ...rest of the props in.
			render={(routeProps) =>
				currentUser ? (
					<RouteComponent {...routeProps} /> // display the RouteComponent that is passed in if there is a currentUser
				) : (
					<Redirect to='/login' /> // redirect to login if there isn't a currentUser
				)
			}
		/>
	);
};
