import { useEffect, useState } from "react";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [pessoa, setPessoa] = useState<any>({});
  const [fotoUrl, setFotoUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const obterDados = async () => {
      const pessoaString = localStorage.getItem(config.userAuth);
      if (pessoaString) {
        const pessoa = JSON.parse(pessoaString);
        setPessoa(pessoa);
        console.log("Pessoa:", pessoa.idUsuario);
        
        // Obtendo a foto do usuário
        try {
          const response = await axios.get(`${config.apiUrl}/login/obter-usuario/${pessoa.idUsuario}`);
          const fotoBase64 = response.data.foto;
          const fotoUrl = `data:image/jpeg;base64,${fotoBase64}`;
          setFotoUrl(fotoUrl);
        } catch (error) {
          console.error("Erro ao obter foto do usuário:", error);
        }
      }
    };

    obterDados();
  }, []);

  // Função para logout do usuário
  const handleButtonClick = () => {
    if (confirm("Deseja realmente sair da sua conta?")) {
      localStorage.removeItem(config.userAuth);
      navigate("/");
    }
  };

  return (
    <div className="card">
      <div className="card-body text-center">
        <div className="mt-3">
          {fotoUrl && <img src={fotoUrl} alt="Foto do usuário" className="img-fluid" />}
          <br/><br/>
          <h4>{pessoa.nome}</h4>
        </div>
        <div className="mt-3 mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={handleButtonClick}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
