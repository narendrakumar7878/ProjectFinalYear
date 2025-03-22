import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'


export default function LandingPage() {

  const router = useNavigate();
  return (
    <div className="LandingPageConatainer">
      <nav>
        <div className="navHeader">
          <h2>Apna Video Call</h2>
        </div>
        <div className="navlist">
          <p onClick={() => {
            router("/aljk12");
          }}>Join As Guest</p>
          <p onClick={() => {
            router("/auth");
          }}>Register</p>
          <div onClick={() => {
            router("/auth");
          }} role="button">
            <p>Log In</p>
          </div>
          <div onClick={() => {
            router("/About");
          }} role="button">
            <p>About</p>
          </div>
        </div>
      </nav>

      <div className="LandingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#ff9839" }}>Connect</span> With Your Love
            Ones
          </h1>
          <p>Cover a Distance by apna video call </p>
          <div role='button'>
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
}
