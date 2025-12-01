import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Icones importados do Lucide-React
import { Package } from "lucide-react";
import { Smartphone } from "lucide-react";
import { LogOut } from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // não logado → volta pro login
      return;
    }

    const storedUser = localStorage.getItem("userName");
    if (storedUser) setUserName(storedUser);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  }

  return (
    <div className={styles.container}>
        <button className={styles.buttonLogoutTop} onClick={handleLogout}>
          <LogOut className={styles.iconLogout} />
          <span className={styles.logoutText}>Sair</span>
        </button>

        <h2 className={styles.title}>Olá, seja bem-vindo {userName}! 👋</h2>
        <p className={styles.subtitle}>Escolha uma das opções abaixo:</p>

        <div className={styles.buttons}>
          <button className={`${styles.buttonPrimary} ${styles.tooltipButton}`} data-tooltip="Gerenciamento de Produto" onClick={() => navigate("/produtos")} >
            <Smartphone className={styles.iconButton}/>
          </button>

          <button className={`${styles.buttonPrimary} ${styles.tooltipButton}`} data-tooltip="Gerenciamento de Estoque" onClick={() => navigate("/estoque")} >
            <Package className={styles.iconButton}/>
          </button>

        </div>
    </div>
  );
}
