import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import "../styles/AuthPage.css";

const AuthPage = ({ initialMethod }) => {
  const [method, setMethod] = useState(initialMethod);

  useEffect(() => {
    setMethod(initialMethod);
  }, [initialMethod]);

  const route = method === "login" ? "/api/token/" : "/api/user/register/";

  return (
    <div className="auth-page">
      <AuthForm route={route} method={method} />
    </div>
  );
};

export default AuthPage;
