import React, { useEffect, useRef } from 'react';
import { createQuestImage } from '../metadata';
import { createCanvas } from 'canvas';

const QuestImage = ({ name, creator, minStakeAmount, difficulty, maxQuestDuration, minWorkoutDuration }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Call your createQuestImage function here and pass the context and other necessary parameters
    createQuestImage(context, name, creator, minStakeAmount, difficulty, maxQuestDuration, minWorkoutDuration);
  }, [name, creator, minStakeAmount, difficulty, maxQuestDuration, minWorkoutDuration]);

  return (
    <canvas ref={canvasRef} width={627} height={627} />
  );
};

export default QuestImage;
