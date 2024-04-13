import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/SignIn`;
    navigate(path);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top d-flex justify-content-between">
        <a id="logo" className="navbar-brand" href="/">
          Note Taking App
        </a>

        <button
          id="LogInButton"
          className="btn btn-outline-primary my-2 my-sm-0"
          onClick={routeChange}
        >
          Log in/Sign up
        </button>
      </nav>
    </>
  );
};

export default Navbar;
