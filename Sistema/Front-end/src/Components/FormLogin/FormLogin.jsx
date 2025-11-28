import styles from './FormLogin.module.css';
import axios from 'axios';
import { useState } from 'react';

export function FormLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
          const response = await axios.post('http://localhost:8000/api/login/', {
              username,
              password
          });

          // Armazenar o token no localStorage
          localStorage.setItem('token', response.data.access);
          localStorage.setItem('userName', username);
          
          // Redirecionar para a página protegida
          window.location.href = '/home';
        } catch (error) {
          setError('Usuário ou senha inválidos.');
      } finally {
        setLoading(false);
      }
  }
  
  return (
    <section className={styles.containerForm}>
      <img className={styles.backgroundImage} src="src/assets/Images/homem-feliz-camisa-azul-celular.jpeg" alt="Homem feliz com camisa azul usando celular" />

      <div className={styles.bigForm}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <img src="src/assets/Images/Login-amico.svg" alt="Ilustração de uma pessoa pequena segurando uma chave feliz usando computador" />
      </div>
    </section>
  );
}
