const Profile = () => {
    //função para logout do usuário
  const handleButtonClick = () => {
    if (confirm("Deseja realmente sair da sua conta?")) {
      //apagar os dados gravados na local storage
      //localStorage.removeItem(config.userAuth);
      //navegar de volta para o raiz do projeto
      //navigate("/");
    }
  };

  //bloco para renderizar o conteudo HTML
  //exibido pelo componente no navegador
  return (
    <div className="card">
      <div className="card-body text-center">
        {/* <img src={config.imgUrl + pessoa.foto} className="img-fluid" /> */}
        <div className="mt-3">
          <h4>João da Silva</h4>
          <p>joão.ex@exemplo.com</p>
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