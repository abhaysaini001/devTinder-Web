import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utilis/constants";
import { removeUser } from "../utilis/userSlice_temp";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () =>{
    try{
    await axios.post(BASE_URL + "/logout",{}, {withCredentials:true});
    dispatch(removeUser());
    return navigate("/login");

    }
    catch(err){
    console.error(err)
    }
  }

  return (
   <div className="navbar bg-base-300 shadow-sm px-4">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>

  {user && (
    <div className="flex items-center gap-4">
      {/* Welcome Text */}
      <span className="text-sm font-medium hidden sm:block">
        Welcome, <span className="text-primary">{user.firstName}</span>
      </span>

      {/* Avatar Dropdown */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full  ">
            <img alt="User" src={user.photoUrl} />
          </div>
        </div>

        {/* Dropdown Menu */}
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-xl w-52"
        >
          <li>
            <Link to="/profile" className="flex justify-between items-center">
              Profile <span className="badge badge-accent">New</span>
            </Link>
          </li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )}
</div>

  );
};

export default NavBar;
