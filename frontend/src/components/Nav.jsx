import { Toaster } from "react-hot-toast";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/userSlice";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user.id);

  useEffect(() => {
    if(!user){
      const userData = JSON.parse(window.localStorage.getItem("loggedInUser"));
      if (userData?.email) {
        dispatch(setUser(userData));
        navigate("/listings");
      }
      console.log(user);
    }
  }, []);

  const handleLogout = ()=>{
    
  }

  return (
    <>
      <header className="sm:px-16 px-8 py-8 sticky top-0 bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 z-20 w-full">
        <nav className="flex justify-between items-center max-container">
          <NavLink to="/">
            <h1 className="text-2xl font-bold">OnlineMarket</h1>
          </NavLink>
          <ul className="flex-1 flex justify-end items-center gap-16 max-lg:hidden">
            {navLinks.map((navLink) => (
              <li className="" key={navLink.label}>
                <NavLink
                  className={({ isActive }) =>
                    `font-montserrat font-medium leading-normal text-lg text-slate-gray hover:border-b-2 hover:border-slate-800 ${
                      isActive ? `border-b-2 border-slate-800` : ``
                    }`
                  }
                  to={navLink.href}
                >
                  {navLink.label}
                </NavLink>
              </li>
            ))}
            {!user && (
              <>
                <li className="" key={"navLinkSignin"}>
                  <NavLink
                    className={({ isActive }) =>
                      `font-montserrat font-medium leading-normal text-lg text-slate-gray hover:border-b-2 hover:border-slate-800 ${
                        isActive ? `border-b-2 border-slate-800` : ``
                      }`
                    }
                    to={"/login"}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="" key={"navLinkSignup"}>
                  <NavLink
                    className={({ isActive }) =>
                      `font-montserrat font-medium leading-normal text-lg text-slate-gray hover:border-b-2 hover:border-slate-800 ${
                        isActive ? `border-b-2 border-slate-800` : ``
                      }`
                    }
                    to={"/signup"}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li className="" key={"navLinkSignout"}>
                <button
                  className={`font-montserrat font-medium leading-normal text-lg text-slate-gray hover:border-b-2 hover:border-slate-800 z-10}`
                  }
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            )}
          </ul>
          <div
            className="hidden max-lg:block"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <img src={hamburger} alt="Menu" height={25} width={25} />
            <div
              className={`${
                isMobileMenuOpen
                  ? `flex opacity-100 transition-opacity duration-1000`
                  : `hidden opacity-0`
              } w-full absolute bg-white top-0 mt-16 left-0 p-4`}
            >
              <ul className="w-full flex flex-col justify-center items-center gap-8">
                {navLinks.map((navLink) => (
                  <li className="" key={"mobile_" + navLink.label}>
                    <NavLink
                      className={({ isActive }) =>
                        `font-montserrat leading-normal text-lg text-slate-gray ${
                          isActive ? `border-b-2 border-slate-800` : ``
                        }`
                      }
                      to={navLink.href}
                    >
                      {navLink.label}
                    </NavLink>
                  </li>
                ))}
                {!user && (
                  <>
                    <li className="" key={"mobile_navLinkSignin"}>
                      <NavLink
                        className={({ isActive }) =>
                          `font-montserrat leading-normal text-lg text-slate-gray ${
                            isActive ? `border-b-2 border-slate-800` : ``
                          }`
                        }
                        to={"/login"}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="" key={"mobile_navLinkSignup"}>
                      <NavLink
                        className={({ isActive }) =>
                          `font-montserrat leading-normal text-lg text-slate-gray ${
                            isActive ? `border-b-2 border-slate-800` : ``
                          }`
                        }
                        to={"/signup"}
                      >
                        Signup
                      </NavLink>
                    </li>
                  </>
                )}
                {user && (
                  <li className="" key={"mobile_navLinkSignout"}>
                    <button
                      className={({ isActive }) =>
                        `font-montserrat leading-normal text-lg text-slate-gray ${
                          isActive ? `border-b-2 border-slate-800` : ``
                        }`
                      }
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div>
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default Nav;
