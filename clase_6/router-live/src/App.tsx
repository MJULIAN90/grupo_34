import { useState, type JSX } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function UserProfile(): JSX.Element {
  // useParams lee los valores dinámicos definidos en el path con :
  const { username } = useParams<{ username: string }>();
  return <h2>Perfil de: {username}</h2>;
}

function Home(): JSX.Element {
  // Cuando usamos este hook?
  const navigate = useNavigate();

  const handleGoToAbout = (): void => {
    // Navegación desde código, sin que el usuario haga clic en un Link
    navigate("/about");
  };

  return (
    <div>
      <h2>Inicio — Página pública</h2>
      <button onClick={handleGoToAbout}>Ir a Acerca de</button>
    </div>
  );
}

function About(): JSX.Element {
  return <h2>Acerca de</h2>;
}

function Contact(): JSX.Element {
  return <h2>Contacto</h2>;
}

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <Routes>
      <Route
        element={
          <Layout
            isAuthenticated={isAuthenticated}
            onToggleAuth={() => setIsAuthenticated((prev) => !prev)}
          />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:username" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
