import { useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react'
import { TApiCtx, ApiCtx } from "../api/ApiProvider";
//import { AuthCtx, TAuthCtx } from "../hoc/AuthProvider";

/*
export function RequireAuth({ children }: any) {
    const location = useLocation()
    const authCtx = useContext(AuthCtx) as TAuthCtx

    if (!authCtx.IsAuthorized) {
        return <Navigate to='/login' state={{ from: location }} />
    }
    return children
}*/