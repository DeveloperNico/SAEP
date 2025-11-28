import { useState, useEffect } from "react";
import styles from "./Produto.module.css";
import axios from "axios";
import { ProdutoModal } from "../../Components/ProdutoModal/ProdutoModal";

export function Produto() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    // 🔍 CORRIGIDO: busca por p.nome
    useEffect(() => {
        let result = products.filter((p) =>
            p.nome.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(result);
    }, [search, products]);

    async function fetchProducts() {
        const res = await axios.get("http://localhost:8000/api/produtos");
        const data = res.data;
        setProducts(data);
        setFiltered(data);
    }

    function openCreate() {
        setEditingProduct(null);
        setModalOpen(true);
    }

    function openEdit(item) {
        setEditingProduct(item);
        setModalOpen(true);
    }

    async function deleteProduct(id) {
        if (!confirm("Deseja realmente excluir?")) return;

        await axios.delete(`http://localhost:8000/api/produtos/${id}`);

        fetchProducts();
    }

    return (
        <div className={styles.container}>
            <h1>Cadastro de Produtos</h1>

            <button className={styles.btnBack} onClick={() => window.location.href = "/home"}>
                Voltar
            </button>

            <input
                type="text"
                placeholder="Buscar produto..."
                className={styles.searchBar}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button className={styles.btnPrimary} onClick={openCreate}>
                Novo Produto
            </button>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Fabricante</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered.length === 0 ? (
                        <tr>
                            <td className={styles.empty} colSpan="5">
                                Nenhum produto encontrado
                            </td>
                        </tr>
                    ) : (
                        filtered.map((p) => (
                            <tr key={p.produtoId}>   {/* 🔧 CORRIGIDO */}
                                <td>{p.produtoId}</td>
                                <td>{p.nome}</td>
                                <td>{p.categoria}</td>
                                <td>{p.fabricante}</td>

                                <td>
                                    <button
                                        className={styles.btnEdit}
                                        onClick={() => openEdit(p)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className={styles.btnDelete}
                                        onClick={() => deleteProduct(p.produtoId)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {modalOpen && (
                <ProdutoModal
                    close={() => setModalOpen(false)}
                    product={editingProduct}
                    refresh={fetchProducts}
                />
            )}
        </div>
    );
}