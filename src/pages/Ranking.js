import React from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

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
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Home</button>
        </Link>
        <main>
          {
            allPlayers !== null
          && (
            allPlayers.map((player, index) => (
              <div key={ index }>
                <img
                  src={ allPlayersImgs[index] }
                  alt="Logo do usuário"
                />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </div>
            ))
          )
          }
        </main>
      </>
    );
  }
}

export default Ranking;
