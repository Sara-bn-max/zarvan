import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from "../../contexts/auth-context";

export default function PrivateRoute({children,component,...rest }) {
  const { token } = useAuthState();
  const location = useLocation()
  return (
      <>
          {token             
          ? component
          :<Navigate to={'/'} state={{from : location}} />}
      </>
  )}