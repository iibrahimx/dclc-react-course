import React from "react";
import plusIcon from "../assets/icon-plus.svg";
import minutIcon from "../assets/icon-minus.svg";

interface ScoreCounterProps {
  score: number;
  onUpvote: () => void;
  onDownvote: () => void;
  isVertical?: boolean;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({
  score,
  onUpvote,
  onDownvote,
  isVertical = false,
}) => {
  return (
    <div
      className={`flex ${
        isVertical ? "flex-col" : "flex-row md:flex-col"
      } items-center gap-3 bg-grey-50 rounded-lg px-3 py-1 md:py-3 md:px-2 w-fit`}
    >
      <button
        onClick={onUpvote}
        className="text-purple-200 hover:text-purple-600 font-bold text-lg transition-colors"
        aria-label="Upvote"
      >
        <img src={plusIcon} alt="Plus" className="w-3 h-3 cursor-pointer" />
      </button>
      <span className="font-bold text-purple-600">{score}</span>
      <button
        onClick={onDownvote}
        className="text-purple-200 hover:text-purple-600 font-bold text-lg transition-colors"
        aria-label="Downvote"
      >
        <img src={minutIcon} alt="Minus" className="w-3 h-1 cursor-pointer" />
      </button>
    </div>
  );
};

export default ScoreCounter;
