import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './images/home_logo.png';
import styles from './App.module.css';


const App = () => {

  const navigate = useNavigate();

  const goList = () => {
      navigate('/list');
  } 

  return (
    <div className={styles.App}>

      <header className={styles.header}>
        <h1>Paramount List</h1>
      </header>

      <section>
        <div className={styles.logoCnt}>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <div>
          <button className={styles.button} onClick={goList}>
            Start!
          </button>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>@sazouache Web Test</span>
      </footer>
    </div>
  );
}

export default App;
