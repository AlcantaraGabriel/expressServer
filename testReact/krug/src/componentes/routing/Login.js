import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';

const Private = () => {
	const auth = null;
	return auth ? <Outlet /> : <Navigate to="/login">
}
