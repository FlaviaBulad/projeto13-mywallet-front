import styled from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Spinner from "../../Libs/Spinner";

export default function BalancePage() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get("http://localhost:5000/balance", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    promise.then(() => {
      setIsLoading(false);
    });
    promise.catch((err) => {
      setIsLoading(false);
      const errMessage = err.response.statusText;
      alert(`Erro ao pegar o balanço: ${errMessage}`);
    });
  }, []);
}
