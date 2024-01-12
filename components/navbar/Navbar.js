import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/speack.png";
// import { signOut } from "next-auth/react";
import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg bg-white ${classes.navbar1}`}>
      <div className="container-fluid mx-5 d-flex justify-content-between">
        <Link
          href="/"
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <Image className="img-fluid logo" src={Logo} alt="" />
        </Link>

        <div className={classes.nav1}>
          <ul className="d-flex">
            <li className="d-none d-sm-block mt-3">
              <Link className="" href="/about">
                About
              </Link>
              <Link className="mx-sm-2 mx-md-5" href="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
