import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [boardArr, setBoardArr] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [winner, setWinner] = useState('');

  const WINCONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const checkWinner = () => {
    for (const combination of WINCONDITION) {
      const [a, b, c] = combination;
      if (
        boardArr[a] !== '' &&
        boardArr[a] === boardArr[b] &&
        boardArr[a] === boardArr[c]
      ) {
        return boardArr[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const checkDraw = () => {
      return boardArr.every((cell) => cell !== '');
    };

    const winner = checkWinner();
    if (winner) {
      setWinner(winner);
    } else if (checkDraw()) {
      setWinner('draw');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardArr]);
  const onclick = (i) => {
    const updatedBoardArr = [...boardArr];
    const newValue = currentPlayer ? 'X' : 'O';

    if (!boardArr[i] && !winner) {
      updatedBoardArr[i] = newValue;
      setBoardArr(updatedBoardArr);
      setCurrentPlayer(!currentPlayer);
    }
  };

  const resetGame = () => {
    setBoardArr(Array(9).fill(''));
    setWinner('');
  };

  return (
    <>
      {winner ? <div className='title'>Winner {winner}</div> : null}

      <div className='board'>
        {boardArr.map((e, i) => (
          <div onClick={() => onclick(i)} key={i} className='item'>
            {e}
          </div>
        ))}
      </div>
      {winner ? (
        <button onClick={() => resetGame()} className='reset'>
          Play again
        </button>
      ) : null}
    </>
  );
}

export default App;
