import logo from "../assets/images/changeverve.svg";
import { NavLinksData } from "../data/NavlinksData";
import {NavLink, useLocation, Link, useNavigate} from "react-router-dom";
import { OtherData } from "../data/OtherData";
import { useState } from "react";
import Logout from "../assets/images/log-out.svg";
import {useDispatch} from "react-redux";
import {authActions} from "../_store/index";
import {toast, ToastContainer} from "react-toastify";


const SideBar = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()
    const [activeRoute, setActiveRoute] = useState(location.pathname);

  const handleActiveRoute = (route: string) => {
    setActiveRoute(route);
  };

  const isActive = (route: string) => {
    return activeRoute === route;
  }

    const handleSuccessToast = () => {
      toast.success("Successfully logged out...redirecting", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Auto-close the toast after 3 seconds
      });
    };

  return (
    <div className="flex flex-col h-screen justify-between w-[22%] bg-white shadow-lg rotate-0">
      <div className="h-[20%] w-full flex justify-center">
        <img src={logo} alt="" className=" w-[45%] " />
      </div>
      <div className="h-3/4 space-y-5 px-6 overflow-y-auto py-4 max-h-[500px] scrollbar-thin scrollbar-thumb-zinc-200">
        {NavLinksData.map(({ id, title, image, route }) => (
          <div>
            <ul>
              <li key={id}>
                <Link
                  className={`flex space-x-4 px-4 py-4 text-[14px]  ${
                    isActive(route)
                      ? "bg-primary-50 font-medium rounded-xl text-primary-500"
                      : ""
                  }`}
                  to={route}
                  onClick={() => handleActiveRoute(route)}
                >
                  <img src={image} alt="" />
                  <h1>{title}</h1>
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="h-1/4  flex flex-col justify-center space-y-6 border-t mx-6">
        {OtherData.map(({ id, title, image, route }) => (
          <NavLink
            to={route}
            key={id}
            className="flex space-x-4 px-4 text-[14px]"
          >
            <img src={image} alt="" />
            <h1>{title}</h1>
          </NavLink>
        ))}

          <div
              onClick={() => {
                  // handleSuccessToast()
                  setTimeout(() => {
                      navigate(0)
                  },2000)
                  dispatch(authActions.logout())


              }}
              className="flex space-x-4 px-4 text-[14px]">
              <img src={Logout} alt="" />
              <h1>{"Log out"}</h1>
          </div>
      </div>
    </div>
  );
};

export default SideBar;
