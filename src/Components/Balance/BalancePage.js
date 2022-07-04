import styled from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function BalancePage() {
  const { user } = useContext(UserContext);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function sessionDataToAPI() {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const response = await axios.get(
          "https://drivenmywalletback.herokuapp.com/balance",
          config
        );

        setTransactions(response.data);
      } catch (error) {
        alert(`Erro ao pegar o balanço: ${error}`);
      }
    }

    sessionDataToAPI();
  }, []);

  function showTransaction() {
    return (
      <>
        <Container>
          <WhiteBoard>
            <p>{transactions.date}</p>
            <p>{transactions.description}</p>
            <p>{transactions.value}</p>
          </WhiteBoard>
        </Container>
      </>
    );
  }

  const BuildShowTransaction = showTransaction();

  function buildTransactions() {
    if (transactions.length > 0) {
      return transactions.map((transaction, index) => {
        const { type, date, description, value } = transaction;
        return (
          <BuildShowTransaction
            key={index}
            type={type}
            date={date}
            description={description}
            value={value}
          />
        );
      });
    } else {
      return <p>Não há registros de entrada ou saída</p>;
    }
  }

  function buildBalance() {
    if (transactions.length > 0) {
      return transactions.reduce((previous, current) => {
        if (current.type === "income") {
          return previous + current.value;
        }

        return previous - current.value;
      }, 0);
    } else {
      return 0;
    }
  }

  const transacationsSection = buildTransactions();

  const balanceSection = buildBalance();
  return (
    <>
      <Container>
        <Title>Olá, {user.name}</Title>
        (logout image)
        <div>
          <div>{transacationsSection}</div>
          <div>Saldo: {balanceSection}</div>
        </div>
        <div>
          <Link to="/income">
            <button>Nova Entrada</button>
          </Link>
          <Link to="/expenses">
            <button>Nova Saída</button>
          </Link>
        </div>
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

const WhiteBoard = styled.div`
  width: 326px;
  height: 446px;
  background: #ffffff;
  border-radius: 5px;
`;
