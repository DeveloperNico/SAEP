import styles from "./MovimentoModal.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export function MovimentoModal({ produto, fechar, atualizar }) {
    const [tipo, setTipo] = useState("entrada");
    const [quantidade, setQuantidade] = useState(0);
    const [data, setData] = useState("");

    async function salvar() {
        const qtd = Number(quantidade);
        let novoEstoque =
            tipo === "entrada"
                ? produto.estoqueAtual + qtd
                : produto.estoqueAtual - qtd;

        // 7.1.4 - ALERTA DE ESTOQUE MÍNIMO
        if (tipo === "saida" && novoEstoque < produto.estoqueMinimo) {
            await Swal.fire({
                title: "Atenção!",
                text: "O estoque ficará abaixo do mínimo configurado!",
                icon: "warning",
            });
        }

        const user = JSON.parse(localStorage.getItem("user"));

        // Enviar movimentação para o backend
        try {
            await axios.post("http://localhost:8000/api/movimentacoes/", {
                produto: produto.produtoId,
                tipo_movimentacao: tipo,
                quantidade: qtd,
                data_hora: `${data}T00:00:00`,
                usuario: user.id,
            });
            
            Swal.fire("Sucesso!", "Movimentação registrada.", "success");
    
            atualizar();
            fechar();
        } catch (err) {
            console.log("ERRO BACKEND:", err.response.data);
            Swal.fire("Erro!", "Falha ao registrar movimentação.", "error");
        }

    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Movimentar Estoque</h2>

                <p><strong>Produto:</strong> {produto.nome}</p>

                <label>Tipo de movimentação:</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                </select>

                <label>Quantidade:</label>
                <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />

                <label>Data da movimentação:</label>
                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />

                <div className={styles.actions}>
                    <button onClick={fechar}>Cancelar</button>
                    <button onClick={salvar}>Salvar</button>
                </div>
            </div>
        </div>
    );
}
