import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

interface IRootState {
  auth :{
    isAuthenticated : boolean
  },
}

const PrivateRoute: React.FC<Props> = ({component: RouteComponent, ...rest})=>{

  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  return (
    <Route 
      {...rest} 
      render={routeProps=>
        isAuthenticated ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to='/signup' />
        )
      }
    />
  );
}
export default PrivateRoute;