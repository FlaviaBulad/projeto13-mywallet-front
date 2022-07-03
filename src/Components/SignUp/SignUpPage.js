import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../Libs/Spinner";

import LogoComponent from "../Layout/Logo";

export default function SignUpPage() {
  //Main function,reders the sigh up page

  const signUpDataObject = {
    //creating sign up data oject
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState(signUpDataObject); //sign up data from forms
  const [isLoading, setIsLoading] = useState(false);

  function OnChange(e) {
    // forms OnChange function
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value }); //filling the sign up object with the forms data
  }

  function SignUpDataToAPI(e) {
    //sending all the data to api and redirectioning user to login page if successfull
    e.preventDefault();
    setIsLoading(true);
    const promise = axios.post("https://localhost:5000/sign-up", {
      ...signUpData,
    });
    promise.then(() => {
      setIsLoading(false);
      navigate("/");
    });
    promise.catch((err) => {
      setIsLoading(false);
      const errMessage = err.response.statusText;
      alert(`Post sign-up error: ${errMessage}`);
    });
  }

  function BuildingSignUpForms() {
    return (
      <>
        <LogoComponent />
        <Form onSubmit={SignUpDataToAPI}>
          <Input
            type="text"
            placeholder="nome"
            name="name"
            onChange={OnChange}
            value={signUpData.name}
            required
          />
          <Input
            type="email"
            placeholder="email"
            name="email"
            onChange={OnChange}
            value={signUpData.email}
            required
          />

          <Input
            type="password"
            placeholder="senha"
            name="password"
            onChange={OnChange}
            value={signUpData.password}
            required
          />
          <Input
            type="password"
            placeholder="Confirme a senha"
            name="password_confirmation"
            onChange={OnChange}
            value={signUpData.password_confirmation}
            required
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Spinner
                type="ThreeDots"
                color="#FFFFFF"
                height={50}
                width={50}
              />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </Form>

        <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
      </>
    );
  }

  const signUpForms = BuildingSignUpForms();

  return <Container>{signUpForms}</Container>;
}

//style
const Container = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0 25px;
`;

const Input = styled.input`
  width: 326px;
  height: 58px;
  margin-bottom: 6px;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  background-color: "#FFFFFF;";
  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #000000;
  }
`;

const Button = styled.button`
  width: 326px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background: #a328d6;

  font-style: normal;
  font-weight: 400;
  font-size: 20.976px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
`;

const StyledLink = styled(Link)`
  width: 227px;
  height: 18px;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-decoration: none;
  color: #ffffff;
`;
