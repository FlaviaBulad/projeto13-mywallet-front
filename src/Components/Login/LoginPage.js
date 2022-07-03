import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Spinner from "../../Libs/Spinner";
import LogoComponent from "../Layout/Logo";

export default function LoginPage() {
  const loginDataObject = {
    //creating login data oject
    email: "",
    password: "",
  };

  //   const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken } = useContext(UserContext); //contextAPI
  const [loginData, setLoginData] = useState(loginDataObject);

  function OnChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function LoginDataToAPI(e) {
    e.preventDefault();
    setIsLoading(true);

    const promise = axios.post("http://localhost:5000/login", { ...loginData });
    promise.then((response) => {
      setIsLoading(false);
      setToken(response.data.token);
      //   navigate("/balance");
    });

    promise.catch((err) => {
      setIsLoading(false);
      const errMessage = err.response.statusText;
      alert(`Post login error: ${errMessage}`);
    });
  }

  function BuildingLoginForms() {
    return (
      <>
        <LogoComponent />
        <Form onSubmit={LoginDataToAPI}>
          <Input
            type="email"
            placeholder="email"
            name="email"
            onChange={OnChange}
            value={loginData.email}
            required
          />

          <Input
            type="password"
            placeholder="senha"
            name="password"
            onChange={OnChange}
            value={loginData.password}
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
              "Entrar"
            )}
          </Button>
        </Form>
        <StyledLink to="/sign-up/">Primeira vez? Cadastre-se!</StyledLink>
      </>
    );
  }

  const loginForms = BuildingLoginForms();

  return <Container>{loginForms}</Container>;
}

//style
const Container = styled.div`
  margin-top: 251px;
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

  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

const StyledLink = styled(Link)`
  width: 191px;
  height: 18px;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-decoration: none;
  color: #ffffff;
`;
