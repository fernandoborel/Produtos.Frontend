import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import config from "../config/config";

const Login = () =>{
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
      e.preventDefault();
      setErro([]);
  
      axios.post(`${config.apiUrl}/auth/autenticar`, {
        login,
        senha
      }).then((response) => {
        console.log(response.data);
    
        const { accessToken, model } = response.data;
    
        // Salvar o token e os dados do usuário no LocalStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem(config.userAuth, JSON.stringify(model));
    
        // Redirecionar para a página do perfil
        navigate('/principal');
      }).catch((error) => {
          console.log(error.response.data.errors);
          setErro(error.response.data.errors);
      });
    
  };
  

    return (
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <h2>Acessar Conta</h2>
                  <p>Entre com suas credenciais de acesso.</p>
                </div>
    
    
                <div className="text-danger">
                  {erro.map((item: string) => (
                    <div>{item}</div>
                  ))}
                </div>
    
    
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Login</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite seu login"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Digite sua senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Entrar
                    </button>
                  </div>
                  <div className="mb-3 d-grid">
                    <Link to="/register" className="btn btn-light">
                      Não possui conta? <strong>Crie aqui!</strong>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Login;