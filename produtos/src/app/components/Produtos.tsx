import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [selectedProduto, setSelectedProduto] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
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
            setProdutos(response.data);
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

    const openModal = (produto) => {
        setSelectedProduto(produto);
        setModalOpen(true);
        // Bloqueia o scroll da página ao abrir o modal
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProduto(null);
        setModalOpen(false);
        // Permite o scroll da página ao fechar o modal
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Produtos</h1>
            <div className="row">
                {produtos.map((produto) => (
                    <div className="col-md-4 mb-4" key={produto.idProduto}>
                        <div className="card">
                            <img
                                src={`data:image/jpeg;base64,${produto.foto}`}
                                className="card-img-top"
                                alt={produto.nome}
                                onClick={() => openModal(produto)}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <p className="card-text">Preço: R$ {produto.preco.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && (
                <div className="overlay">
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{selectedProduto.nome}</h5>
                                    <button type="button" className="close" onClick={closeModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <img
                                        src={`data:image/jpeg;base64,${selectedProduto.foto}`}
                                        className="img-fluid"
                                        alt={selectedProduto.nome}
                                    />
                                    <p>Preço: R$ {selectedProduto.preco.toFixed(2)}</p>
                                    <p>Descrição: {selectedProduto.descricao}</p>
                                    <p>Categoria: {selectedProduto.categoria}</p>
                                    <p>Quantidade: {selectedProduto.quantidade}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Produtos;
