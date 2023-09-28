import React, { useState } from "react";
import EmojiCard from "../EmojiCard/index";
import NavBar from "../NavBar";
import WinOrLoseCard from "../WinOrLoseCard/index";
import "./index.css";

const EmojiGame = (props) => {
  const [clickedEmojisList, setClickedEmojisList] = useState([]);
  const [isGameInProgress, setIsGameInProgress] = useState(true);
  const [topScore, setTopScore] = useState(
    parseInt(localStorage.getItem("totalscore"))
      ? parseInt(localStorage.getItem("totalscore"))
      : 0
  );

  const resetGame = () => {
    setClickedEmojisList([]);
    setIsGameInProgress(true);
  };

  const finishGameAndSetTopScore = (currentScore) => {
    if (currentScore > topScore) {
      localStorage.setItem("totalscore",currentScore)
      setTopScore(currentScore);
    }
    setIsGameInProgress(false);
  };

  const clickEmoji = (id) => {
    const isEmojiClicked = clickedEmojisList.includes(id);
    const clickedEmojisLength = clickedEmojisList.length;
    const { emojisList } = props;

    if (isEmojiClicked) {
      finishGameAndSetTopScore(clickedEmojisLength);
    } else {
      if (clickedEmojisLength === emojisList.length - 1) {
        localStorage.setItem("totalscore",12)
        finishGameAndSetTopScore(emojisList.length);
      }
      setClickedEmojisList([...clickedEmojisList, id]);
    }
  };

  const getShuffledEmojisList = () => {
    const { emojisList } = props;
    return emojisList.sort(() => Math.random() - 0.5);
  };

  const renderEmojisList = () => {
    const shuffledEmojisList = getShuffledEmojisList();

    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map((eachEmoji) => (
          <EmojiCard
            key={eachEmoji.id}
            emojiDetails={eachEmoji}
            clickEmoji={clickEmoji}
          />
        ))}
      </ul>
    );
  };

  const renderScoreCard = () => {
    const { emojisList } = props;
    const isWon = clickedEmojisList.length === emojisList.length;

    return (
      <WinOrLoseCard
        isWon={isWon}
        score={clickedEmojisList.length}
        onClickPlayAgain={resetGame}
      />
    );
  };

  return (
    <div className="main-container">
      <NavBar
        topScore={topScore}
        isGameInProgress={isGameInProgress}
        currentScore={clickedEmojisList.length}
      />
      <div className="emoji-body-container">
        {isGameInProgress ? renderEmojisList() : renderScoreCard()}
      </div>
    </div>
  );
};

export default EmojiGame;
