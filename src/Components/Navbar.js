import React from "react";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top d-flex justify-content-between">
        <a id="logo" className="navbar-brand" href="/">
        Note Taking App
        </a>

            <button id="LogInButton" className="btn btn-outline-primary my-2 my-sm-0">
              Log in/Sign up
            </button>
      </nav>
    </>
  );
};
