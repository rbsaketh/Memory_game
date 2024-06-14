import React from 'react';

function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <div>Score: {score}</div>
      <div>Best Score: {bestScore}</div>
    </div>
  );
}

export default Scoreboard;
