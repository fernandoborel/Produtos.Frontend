import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Produtos from "./Produtos";

const Navbar = () => {
  const [autenticado, setAutenticado] = useState(false);

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAutenticado(true);
    } else {
      setAutenticado(false);
    }
  }, []);
  
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <strong>Produtos</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!autenticado && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white">
                    Acessar Conta
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-white">
                    Crie sua Conta
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link to="/principal" className="nav-link text-white">
                Página Principal
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/produtos" className="nav-link text-white">
                Produtos Disponíveis
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
