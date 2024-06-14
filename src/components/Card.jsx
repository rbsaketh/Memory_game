import React from 'react';

function Card({ card, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={card.url} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
}

export default Card;
