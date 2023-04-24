import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from "../../contexts/auth-context";
import BanksInfoPage from '../../pages/BanksInfoPage/BanksInfoPage';

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