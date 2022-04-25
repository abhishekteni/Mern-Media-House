import React from "react";
import styled from "styled-components";
import SignIn from "../../components/Login/SignIn";
import Navbar from "../../components/navbar/Navbar";

function SignInScreen() {
  const StyleImg = styled.div`
    background: url("https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    width: 50vw;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media Screen and (max-width: 800px) {
      display: none;
    }
  `;

  const StyleForm = styled.div`
    margin: auto;

    @media Screen and (max-width: 800px) {
      margin: 15vh auto auto auto;
    }
  `;
  return (
    <div className="signup__screen" style={{ display: "flex" }}>
      <StyleImg className="img">
        {/* <img src="https://images.pexels.com/photos/10846568/pexels-photo-10846568.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />{" "} */}
      </StyleImg>
      <StyleForm className="signup">
        <SignIn />
      </StyleForm>
    </div>
  );
}

export default SignInScreen;
