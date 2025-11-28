import { useState, useEffect } from "react";
import styles from "./ProdutoModal.module.css";
import axios from "axios";

export function ProdutoModal({ close, product, refresh }) {

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const [form, setForm] = useState({
        nome: product?.nome || "",
        categoria: product?.categoria || "",
        tensao: product?.tensao || "",
        dimensoes: product?.dimensoes || "",
        resolucao_tela: product?.resolucao_tela || "",
        capacidade_armazenamento: product?.capacidade_armazenamento || "",
        conectividade: product?.conectividade || "",
        fabricante: product?.fabricante || "",
        codigoInterno: product?.codigoInterno || "",
        estoque_minimo: product?.estoque_minimo || "",
        estoque_atual: product?.estoque_atual || ""
    });

    function updateField(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    // =============================
    // ✅ BUSCA CATEGORIAS DO BACKEND
    // =============================
    useEffect(() => {
        async function loadCategories() {
            try {
                const res = await axios.get("http://localhost:8000/api/produtos/categorias");
                setCategories(res.data); // ← backend precisa retornar [{value: "", label: ""}]
            } catch (err) {
                console.error("Erro ao carregar categorias", err);
            } finally {
                setLoadingCategories(false);
            }
        }

        loadCategories();
    }, []);

    // =============================
    // SALVAR
    // =============================
    async function save() {
        if (!form.nome.trim() || !form.categoria.trim()) {
            alert("Preencha pelo menos Nome e Categoria!");
            return;
        }

        try {
            if (product) {
                await axios.put(
                    `http://localhost:8000/api/produtos/${product.produtoId}`, 
                    form
                );
            } else {
                await axios.post("http://localhost:8000/api/produtos/", form);
            }

            refresh();
            close();

        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Erro ao salvar produto.");
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                
                <h2>{product ? "Editar Produto" : "Novo Produto"}</h2>

                <div className={styles.formGroup}>

                    <input name="nome" placeholder="Nome" className={styles.input} value={form.nome} onChange={updateField} />

                    {/* SELECT DE CATEGORIA */}
                    <div className={styles.selectWrapper}>
                        {loadingCategories ? (
                            <select className={styles.select} disabled>
                                <option>Carregando categorias...</option>
                            </select>
                        ) : (
                            <select name="categoria" className={styles.select} value={form.categoria} onChange={updateField} >
                                <option value="">Selecione a categoria</option>

                                {categories.map((c) => (
                                    <option key={c.value} value={c.value}>
                                        {c.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <input name="tensao" placeholder="Tensão" className={styles.input} value={form.tensao} onChange={updateField} />
                    <input name="dimensoes" placeholder="Dimensões" className={styles.input} value={form.dimensoes} onChange={updateField} />
                    <input name="resolucao_tela" placeholder="Resolução da Tela" className={styles.input} value={form.resolucao_tela} onChange={updateField} />
                    <input name="capacidade_armazenamento" placeholder="Capacidade de Armazenamento" className={styles.input} value={form.capacidade_armazenamento} onChange={updateField} />
                    <input name="conectividade" placeholder="Conectividade" className={styles.input} value={form.conectividade} onChange={updateField} />
                    <input name="fabricante" placeholder="Fabricante" className={styles.input} value={form.fabricante} onChange={updateField} />
                    <input name="codigoInterno" placeholder="Código Interno" className={styles.input} value={form.codigoInterno} onChange={updateField} />

                    <input type="number" name="estoque_minimo" placeholder="Estoque Mínimo" className={styles.input} value={form.estoque_minimo} onChange={updateField} />
                    <input type="number" name="estoque_atual" placeholder="Estoque Atual" className={styles.input} value={form.estoque_atual} onChange={updateField} />

                </div>

                <div className={styles.modalButtons}>
                    <button className={styles.btnPrimary} onClick={save}>
                        Salvar
                    </button>

                    <button className={styles.btnSecondary} onClick={close}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
