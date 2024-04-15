import React,{ useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserCredentials";
import { app,auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = (props) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/SignIn`;
    navigate(path);
  };
  
  const userDetails = useContext(UserContext);
  console.log(userDetails);

  const logOutUser = ()=>{
    console.log('Log out called');
    signOut(auth).then((res)=> {
      console.log("Successfully logged out!");
      userDetails.setSignedIn(false);
      userDetails.setUser(null);
      userDetails.setEmail(null);
    })
  }
  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top d-flex justify-content-between">
        <a id="logo" className="navbar-brand" href="/">
          Note Taking App
        </a>

        {!userDetails.signedIn ? <button
          id="LogInButton"
          className="btn btn-outline-primary my-2 my-sm-0"
          onClick={routeChange}
        >
          Log in/Sign up
        </button> : 
         <button
          id="LogInButton"
          className="btn btn-outline-primary my-2 my-sm-0"
          onClick={logOutUser}
        >
          Log out
        </button>
        }
      </nav>
    </>
  );
};

export default Navbar;
