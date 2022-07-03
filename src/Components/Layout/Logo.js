import styled from "styled-components";

export default function LogoComponent() {
  return <Logo>MyWallet</Logo>;
}

const Logo = styled.div`
  position: absolute;
  width: 147px;
  height: 50px;
  top: 210px;
  font-family: "Saira Stencil One";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;

  color: #ffffff;
`;
