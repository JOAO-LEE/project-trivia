import React from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import styles from './Ranking.module.css';
import Home from '../imgs/home.png';

class Ranking extends React.Component {
  state = {
    allPlayers: [],
    allPlayersImgs: [],
  }

  componentDidMount() {
    const response = localStorage.getItem('allPlayers');
    const allPlayers = JSON.parse(response);
    this.setState({ allPlayers: allPlayers.sort((a, b) => b.score - a.score) },
      this.fetchGravatar);
  }

  fetchGravatar = async () => {
    const { allPlayers } = this.state;
    allPlayers.forEach((player) => {
      const hash = md5(player.gravatarEmail).toString();

      fetch(`https://www.gravatar.com/avatar/${hash}`)
        .then((response) => (this.setState((prevState) => ({
          ...prevState,
          allPlayersImgs: [...prevState.allPlayersImgs, response.url],
        }))));
    });
  }

  render() {
    const { allPlayers, allPlayersImgs } = this.state;
    return (
      <div className={ styles.rankingPage }>
        <div className={ styles.ranking }>
          <Link to="/">
            {/* <button data-testid="btn-go-home" type="button">Home</button> */}
            <img
              src={ Home }
              alt="configurações"
              className={ styles.home }
              data-testid="btn-go-home"
            />
          </Link>
          <h1 data-testid="ranking-title">Ranking</h1>
          <main className={ styles.rankingMain }>
            {
              allPlayers !== null
            && (
              allPlayers.map((player, index) => (
                <div key={ index } className={ styles.rankingBox }>
                  <img
                    src={ allPlayersImgs[index] }
                    alt="Logo do usuário"
                    className={ styles.rankingImg }
                  />
                  <p data-testid={ `player-name-${index}` }>{player.name}</p>
                  <p data-testid={ `player-score-${index}` }>{player.score}</p>
                </div>
              ))
            )
            }
          </main>
        </div>
      </div>
    );
  }
}

export default Ranking;
