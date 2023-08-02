import React from 'react';
import truncateEthAddress from 'truncate-eth-address';
import { computePowTokenRewards } from '../utils';

interface QuestLeaderboardProps {
  name: string;
  creator: string;
  minWorkoutDuration: number;
  minStakeAmount: number;
  maxQuestDuration: number;
  questDifficulty: number;
}

const QuestLeaderboard: React.FC<QuestLeaderboardProps> = ({
  name,
  creator,
  minWorkoutDuration,
  minStakeAmount,
  maxQuestDuration,
  questDifficulty,
}) => {
  const formattedWorkoutDuration = minWorkoutDuration / 60;
  const formattedStakeAmount = minStakeAmount / 1000000000000000000;
  const formattedQuestDuration = maxQuestDuration / 60;

  const renderDifficulty = () => {
    switch (questDifficulty) {
      case 1:
        return <span className="text-emerald-500">{questDifficulty} - easy</span>;
      case 2:
        return <span className="text-yellow-500">{questDifficulty} - medium</span>;
      default:
        return <span className="text-red-500">{questDifficulty} - hard</span>;
    }
  };

  return (
    <tr className="bg-gray-800 border-gray-800 hover:bg-gray-800/10">
      <th scope="row" className="px-6 py-6 font-bold text-white text-[20px]">
        {name}
      </th>
      <td className="px-6 py-4 text-[18px]">{formattedWorkoutDuration} Minutes</td>
      <td className="px-6 py-4 text-[18px]">{formattedStakeAmount} ETH</td>
      <td className="px-6 py-4 text-[18px]">{formattedQuestDuration} Minutes</td>
      <td className="px-6 py-4 text-[18px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-text font-bold">
        {computePowTokenRewards(minStakeAmount, minWorkoutDuration, questDifficulty)} POW
      </td>
      <td className="px-6 py-4 text-[18px]">
         {renderDifficulty()}
      </td>
      <td className="px-6 py-4 text-[14px]">{truncateEthAddress(creator)}</td>
    </tr>
  );
};

export default QuestLeaderboard;
