import styled from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Spinner from "../../Libs/Spinner";

export default function BalancePage() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    async function sessionDataToAPI() {
      setIsLoading(true);
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const response = await axios.get(
          "http://localhost:5000/balance",
          config
        );
        setIsLoading(false);
        setBalance(response.data);
      } catch (error) {
        setIsLoading(false);
        alert(`Erro ao pegar o balanço: ${error}`);
      }
    }

    sessionDataToAPI();
  }, []);
}
