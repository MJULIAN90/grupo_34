import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/authenticator";
import { getAuthErrorMessage } from "../auth/authErrors";

const Register = () => {
  const { signUp, singInWithGogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      await signUp(email, password);
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
        <button onClick={handleRegister}>Registrarse</button>
      </section>

      <section>
        <button onClick={handleWithGoogle}>register con Google</button>
      </section>

      {errorMessage && (
        <section>
          <p>{errorMessage}</p>
        </section>
      )}
    </>
  );
};
export default Register;
