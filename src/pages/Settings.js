import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Setings.module.css';
import Voltar from '../imgs/voltar.png';

class Settings extends React.Component {
  render() {
    return (
      <form className={ styles.configPage }>
        <div className={ styles.configBox }>
          <div className={ styles.configTitle }>
            <Link to="/" data-testid="btn-settings">
              <img src={ Voltar } alt="voltar" className={ styles.configImg } />
            </Link>
            <h1 data-testid="settings-title" className={ styles.h1 }>Configurações</h1>
          </div>
          <label htmlFor="categories" className={ styles.configLabel }>
            <h3 className={ styles.h3 }>Categorias</h3>
            <select name="categories" className={ styles.select }>
              <option value="valor1" selected>Animes</option>
              <option value="valor2">Comidas</option>
              <option value="valor3">Todos os assuntos</option>
            </select>
          </label>
          <label htmlFor="dificult" className={ styles.configLabel }>
            <h3 className={ styles.h3 }>Dificuldade</h3>
            <select name="dificult" className={ styles.select }>
              <option value="facil" selected>Fácil</option>
              <option value="medio">Médio</option>
              <option value="dificil">Difícil</option>
            </select>
          </label>
          <label htmlFor="type" className={ styles.configLabel }>
            <h3 className={ styles.h3 }>Tipo</h3>
            <select name="type" className={ styles.select }>
              <option value="valor1" selected>Tipo A</option>
              <option value="valor2">Valor 2</option>
              <option value="valor3">Valor 3</option>
            </select>
          </label>
        </div>
      </form>
    );
  }
}

export default Settings;
