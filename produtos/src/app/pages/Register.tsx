import { useState } from "react";
import config from "../config/config";

const Register = () => {
    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setMensagem("");

        const requestData = {
            nome: nome,
            login: login,
            senha: senha,
        };

        try {
            const response = await fetch(`${config.apiUrl}/login/cadastrar`, {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMensagem("Usuário cadastrado com sucesso");
                setNome("");
                setLogin("");
                setSenha("");
            } else {
                setMensagem("Erro ao cadastrar usuário");
            }

        } catch (error) {
            setMensagem("Erro ao cadastrar usuário");
        }

    }

    return (
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <h2>Criar conta de acesso</h2>
                  <p>Preencha os campos abaixo:</p>
                </div>
                <div className="mb-2 text-center">
                  <strong>{mensagem}</strong>
                </div>
    
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label>Informe seu nome:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label>Informe seu login:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label>Informe sua senha:</label>
                    <input
                      type="password"
                      className="form-control"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Realizar Cadastro
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Register;