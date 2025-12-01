import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MovimentoModal } from "../../Components/MovimentoModal/MovimentoModal";
import styles from "./Estoque.module.css";

import { ArrowLeft } from 'lucide-react';

export function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // 🔹 Bubble Sort obrigatório
    function bubbleSort(list) {
        let arr = [...list];
        let n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j].nome.toLowerCase() > arr[j + 1].nome.toLowerCase()) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }

    // 🔹 Buscar produtos
    async function carregar() {
        const res = await axios.get("http://localhost:8000/api/produtos/");
        const ordenado = bubbleSort(res.data);
        setProdutos(ordenado);
    }

    useEffect(() => {
        carregar();
    }, []);

    function abrirModal(produto) {
        setProdutoSelecionado(produto);
        setModalOpen(true);
    }

    return (
        <div className={styles.container}>
            <h1>Gestão de Estoque</h1>

            <button className={styles.btnBack} onClick={() => window.location.href = "/home"}>
                    <ArrowLeft />
            </button>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Estoque Atual</th>
                        <th>Estoque Mínimo</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {produtos.length === 0 ? (
                        <tr>
                            <td colSpan="5" className={styles.empty}>
                                Nenhum produto encontrado.
                            </td>
                        </tr>
                    ) : (
                        produtos.map((p) => (
                            <tr key={p.produtoId}>
                                <td>{p.produtoId}</td>
                                <td>{p.nome}</td>
                                <td>{p.estoque_atual}</td>
                                <td>{p.estoque_minimo}</td>
                                <td>
                                    <button
                                        className={styles.btnMovimentar}
                                        onClick={() => abrirModal(p)}
                                    >
                                        Movimentar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {modalOpen && (
                <MovimentoModal
                    produto={produtoSelecionado}
                    fechar={() => setModalOpen(false)}
                    atualizar={carregar}
                />
            )}
        </div>
    );
}
