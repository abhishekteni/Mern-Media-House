import React from "react";
import SignUp from "../../components/Login/SignUp";
import styled from "styled-components";

function SignUpScreen() {
  const StyleImg = styled.div`
    background: url("https://images.pexels.com/photos/3459979/pexels-photo-3459979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    width: 50vw;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

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
      <StyleImg className="img"></StyleImg>
      <StyleForm className="signup">
        <SignUp />
      </StyleForm>
    </div>
  );
}

export default SignUpScreen;
