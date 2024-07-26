import "./styles.css";
import { useDispatch } from "react-redux";
import { appLogout } from "../../store/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(appLogout());
    };

    return (
        <div className="navbar-container">
            <div className="navbar-left-items">
                <h1 className="text">X-Cloud</h1>
            </div>
            <div className="navbar-right-items">
                <text onClick={handleLogout}>Logout</text>
            </div>
        </div>
    );
};

export default Navbar;
