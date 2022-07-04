import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../../Libs/Spinner";

import UserContext from "../../contexts/UserContext";

export default function IncomePage() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);
  const navigator = useNavigate();

  async function IncomeDataToAPI(e) {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      description,
      type: "income",
      value: parseFloat(value),
    };

    const headers = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      await axios.post("http://localhost:5000/balance", body, headers);

      setIsLoading(false);
      alert("Registrado com sucesso!");
      navigator("/balance");
    } catch (error) {
      setIsLoading(false);
      alert(`Erro ao tentar registrar. ${error}`);
    }
  }

  return (
    <>
      <Container>
        <Title>Nova entrada</Title>
        <Form>
          <Input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button type="submit" onClick={IncomeDataToAPI} disabled={isLoading}>
            {isLoading ? (
              <Spinner
                type="ThreeDots"
                color="#FFFFFF"
                height={50}
                width={50}
              />
            ) : (
              "Salvar entrada"
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  position: absolute;
  width: 168px;
  height: 31px;
  left: 24px;
  top: 25px;

  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;

  color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
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
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;

  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;
