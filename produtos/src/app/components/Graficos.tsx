import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import config from '../config/config';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const response = await axios.get(`${config.apiUrl}/produtos/obter-produtos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categorias:', error);
    }
  };

  const getTokenFromLocalStorage = () => {
    const userDataString = localStorage.getItem(config.userAuth);
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData.accessToken;
    }
    return null;
  };
  

  // Processar os dados para extrair as categorias
  const categoriasLabels = categorias.map(produto => produto.categoria);

  // Processar os dados de ativos/inativos
  const activeLabels = categorias.map(produto => produto.ativo === 1 ? 'Ativo' : 'Inativo');

  // Contar o número de ocorrências de cada categoria
  const categoriasCount = categoriasLabels.reduce((acc, categoria) => {
    acc[categoria] = (acc[categoria] || 0) + 1;
    return acc;
  }, {});

  // Contar o número de ocorrências de ativos/inativos
  const activeCount = activeLabels.reduce((acc, ativo) => {
    acc[ativo] = (acc[ativo] || 0) + 1;
    return acc;
  }, {});

  // Formatar os dados para o gráfico de pizza
  const data = {
    labels: Object.keys(categoriasCount),
    datasets: [{
      data: Object.values(categoriasCount),
      backgroundColor: [
        'red',
        'blue',
        'green',
        'yellow',
        'purple',
        'orange',
        'pink',
        'brown',
      ],
    }],
  };

  const active = {
    labels: Object.keys(activeCount),
    datasets: [{
      data: Object.values(activeCount),
      backgroundColor: [
        'gray',
        'black',
      ],
    }],
  }

  return (
    <div className='row'>
      <div className='mb-4'>
        <h2>Produtos Cadastrados no sistema: {categorias.length}</h2>
      </div>
      <hr/>
      <br/>
      <div className='col-md-6'>
        <h2>Categorias</h2>
        <Pie data={data} />
      </div>
      <div className='col-md-6'>
        <h2>Ativos / Inativos</h2>
        <Pie data={active} />
      </div>
    </div>
  );
};

export default Categorias;
