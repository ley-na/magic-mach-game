import './App.css';
import {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  {
    "src": "/img/1.png",
    matched: false
  },
  {
    "src": "/img/2.png",
    matched: false
  },
  {
    "src": "/img/3.png",
    matched: false
  },
  {
    "src": "/img/4.png",
    matched: false
  },
  {
    "src": "/img/5.png",
    matched: false
  },
  {
    "src": "/img/6.png",
    matched: false
  }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)


  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  }

  //handle a choice
  const handleChoice = (card) => {
    if (choiceOne && choiceOne.id !== card.id) {
      setChoiceTwo(card)
    } else {
      setChoiceOne(card)
    }
  }

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices & increase turn
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  //start auto new game
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <br/>
      <br/>
      <p><a className='credits' href='https://www.freepik.com/upklyak'>All vector by upklyak - www.freepik.com</a></p>
    </div>
  );
}

export default App