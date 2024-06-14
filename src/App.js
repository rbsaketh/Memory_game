import React, { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import Card from './components/Card';
import './App.css';

class Pokemon {
  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.caught = false;
  }
}

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const pokemonArray = [];
    const api = "https://pokeapi.co/api/v2/pokemon/";
    while (pokemonArray.length < 15) {
      const id = Math.ceil(Math.random() * 151);
      try {
        const response = await fetch(api + id);
        if (!response.ok) {
          throw new Error("API request failed");
        }

        const pokemonData = await response.json();
        let pokemonName = pokemonData.species.name;
        let pokemonImageUrl = pokemonData.sprites.front_default;

        if (!pokemonArray.some(pokemon => pokemon.name === pokemonName)) {
          pokemonArray.push(new Pokemon(pokemonName, pokemonImageUrl));
        }
      } catch (error) {
        console.log(error);
      }
    }
    setCards(pokemonArray);
    shuffleCards(pokemonArray);
  };

  const shuffleCards = (cardsToShuffle) => {
    const shuffledCards = [...cardsToShuffle].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const handleCardClick = (name) => {
    if (clickedCards.includes(name)) {
      // Card is already clicked, reset score and clicked cards
      setScore(0);
      setClickedCards([]);
    } else {
      // Add card to clickedCards array
      const newClickedCards = [...clickedCards, name];
      setClickedCards(newClickedCards);

      // Update score
      const newScore = score + 1;
      setScore(newScore);

      // Update best score
      if (newScore > bestScore) {
        setBestScore(newScore);
      }

      // Check if all cards have been matched
      if (newClickedCards.length === cards.length) {
        alert('You matched all cards! Starting a new game.');
        setScore(0);
        setClickedCards([]);
        fetchCards(); // Fetch new cards for a new game
      }
    }

    // Shuffle cards after every click
    shuffleCards(cards);
  };

  return (
    <div className="App">
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="card-container">
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={() => handleCardClick(card.name)} />
        ))}
      </div>
    </div>
  );
}

export default App;
