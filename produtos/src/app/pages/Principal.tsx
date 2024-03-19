import Profile from '../components/Profile';
import Graficos from '../components/Graficos';
import Produtos from '../components/Produtos';

const Principal = () => {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <Profile />
          </div>
          <div className="col-md-6">
            <Produtos />
          </div>
          <div className="col-md-3">
            <Graficos />
          </div>
        </div>
      </div>
    );
  };

export default Principal;