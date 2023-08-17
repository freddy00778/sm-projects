import * as React from 'react';
import {FC, ReactNode, useEffect} from 'react';
import {Navigate, useLocation, Location, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {authActions,userActions} from "../_store";

interface PrivateRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
}

//@ts-ignore
const PrivateRoute: FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
    const location: Location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //@ts-ignore
    const { user: authUser } = useSelector(state => state.auth);
    console.log("Auth user", authUser)

    useEffect(()=> {
        //@ts-ignore
        dispatch(userActions.getUser()).then((response)=> {
            console.log("auth response", response)
            if (response.type === "users/getUser/rejected"){
                dispatch(authActions.setLogout(true))
                localStorage.clear()
                navigate("/")
                return
            }

            return;
        })

        if (!authUser) {
            navigate("/")
            return
        }

    },[])

    return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
