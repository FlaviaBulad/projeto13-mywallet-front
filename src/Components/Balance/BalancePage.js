import { Link } from "react-router-dom";

export default function BalancePage() {
  return (
    <>
      <h1>Balance page</h1>
      <Link to="/income">Income</Link>
      <Link to="/expenses">Expenses</Link>
    </>
  );
}
