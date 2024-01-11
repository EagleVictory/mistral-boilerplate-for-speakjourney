"use client";
import React from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Logo from "../../assets/images/speack.png";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#FDF0E6" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span>
              <Image src={Logo} alt="Picture of the author"></Image>
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto  mb-lg-0">
              {/* <logoutBtn /> */}
              {/* <button onClick={() => signOut()}>logout</button> */}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  href="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  href="/about"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  href="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
