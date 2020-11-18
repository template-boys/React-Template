import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import pear from "./pear.png";

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">
          pear <img src={pear} width={25} />
        </h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
