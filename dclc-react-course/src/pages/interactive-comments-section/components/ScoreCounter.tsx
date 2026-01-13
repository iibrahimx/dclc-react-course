type Props = {
  score: number;
};

const ScoreCounter = ({ score }: Props) => {
  return (
    <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-lg">
      <button className="text-purple-600 font-bold cursor-pointer">+</button>
      <span className="font-medium">{score}</span>
      <button className="text-purple-600 font-bold cursor-pointer">−</button>
    </div>
  );
};

export default ScoreCounter;
