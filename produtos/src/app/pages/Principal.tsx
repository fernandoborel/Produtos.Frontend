import Profile from '../components/Profile';
import Graficos from '../components/Graficos';

const Principal = () => {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <Profile />
          </div>
          <div className="col-md-6">
            <Graficos />
          </div>
          <div className="col-md-3">
            
          </div>
        </div>
      </div>
    );
  };

export default Principal;