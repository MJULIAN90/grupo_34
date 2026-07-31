import { useState } from "react";
import { useAuth } from "../auth/authenticator";
import { useNavigate } from "react-router-dom";
import { getAuthErrorMessage } from "../auth/authErrors";

const Login = () => {
  const { signIn, singInWithGogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    }
  };

  const handleWithGoogle = async () => {
    try {
      await singInWithGogle();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    }
  };
  return (
    <>
      <section>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>login</button>
      </section>

      <section>
        <button onClick={handleWithGoogle}>Login con Google</button>
      </section>

      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};
export default Login;
