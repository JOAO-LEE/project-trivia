import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Olá Mundo!</h1>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Home</button>
        </Link>
      </>
    );
  }
}

export default Ranking;
