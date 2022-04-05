import React from "react";
import "./navbar.scss";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Link,useNavigate } from "react-router-dom";
import { DarkModeContext} from "../../context/ColorContext"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Navbar() {
  const { dispatch} = useContext(DarkModeContext)
  const { dispatch1 } =useContext(AuthContext)
  const navigate = useNavigate()
  // console.log(dispatch1)
  const handleOut =()=>{
    dispatch1({ type: "LOGOUT" })
    navigate("/login")
  }
  return (
    <div className="navbar">
      <div className="right">
        <h2>
          <Link to={"/"} className="link_icon">ADMIN</Link>
        </h2>
      </div>
      <div className="left">
        <h3 className="left_mess">Hello, Admin</h3>
        <ChangeCircleIcon className="left_icon turn"  onClick={() => dispatch({ type: "TOGGLE" }) }></ChangeCircleIcon>
        <Link to={"/profile"}>
          <AccountBoxTwoToneIcon fontSize="medium" className="left_icon" color="success"/>
        </Link>
        <LogoutTwoToneIcon fontSize="medium" onClick={handleOut} className="left_icon" color="success"/>
        
      </div>
    </div>
  );
}

export default Navbar;
