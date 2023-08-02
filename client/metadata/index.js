const { createCanvas } = require("canvas");
const fs = require("fs");

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    var lines = 0;

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
            lines++;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    lines++;

    // Return the number of lines and the final y-coordinate
    return { lines, y };
}

export const createQuestImage = (
    name, 
    creator, 
    minStakeAmount, 
    difficulty, 
    maxQuestDuration, 
    minWorkoutDuration
) => {
    // Dimensions for the square canvas
    const size = 627;
  
    // Instantiate the canvas object
    const canvas = createCanvas(size, size);
    const context = canvas.getContext("2d");
  
    // Set the background color to a futuristic gradient
    const gradientBg = context.createLinearGradient(0, 0, size, size);
    gradientBg.addColorStop(0, "#040926");
    gradientBg.addColorStop(1, "#0a0224");
    context.fillStyle = gradientBg;
    context.fillRect(0, 0, size, size);
  
    // Render a gradient frame around the canvas
    const frameThickness = 10;
    const frameGradient = context.createLinearGradient(0, 0, size, 0);
    frameGradient.addColorStop(0, "rgb(236, 72, 153)");
    frameGradient.addColorStop(0.5, "rgb(239, 68, 68)");
    frameGradient.addColorStop(1, "rgb(234, 179, 8)");
    context.fillStyle = frameGradient;
    context.fillRect(0, 0, size, frameThickness); // Top frame
    context.fillRect(0, size - frameThickness, size, frameThickness); // Bottom frame
    context.fillRect(0, frameThickness, frameThickness, size - frameThickness * 2); // Left frame
    context.fillRect(size - frameThickness, frameThickness, frameThickness, size - frameThickness * 2); // Right frame
  
    // Create a gradient for the "Quest" text
    const textGradient = context.createLinearGradient(0, 0, size, 0);
    textGradient.addColorStop(0, "rgb(236, 72, 153)");
    textGradient.addColorStop(0.5, "rgb(239, 68, 68)");
    textGradient.addColorStop(1, "rgb(234, 179, 8)");
  
    // Set the style of the text and render it to the canvas
    context.font = "bold 40pt 'Inter'";
    context.textAlign = "center";
    context.fillStyle = textGradient;
    const wrapResult = wrapText(context, name, size / 2, 250, size - 20, 50);
  
    // Set the style for the proof text
    context.font = "bold 20pt 'Inter'";
    context.textAlign = "left";
    context.fillStyle = "#fff";
    context.fillText(`Proof of Workout Protocol`, 20, 40);
  
    // Display additional quest information
    // Start at y-coordinate obtained from wrapping quest name, with a buffer of 70px
    let infoY = wrapResult.y + 70;
    context.font = "bold 16pt 'Inter'";
    context.textAlign = "left";
    context.fillStyle = "#fff";
    context.fillText(`Creator: ${creator}`, 20, infoY);
    context.fillText(`Quest Difficulty: ${difficulty} mins`, 20, infoY + 80);
    context.fillText(`Min Stake Amount: ${minStakeAmount} ETH`, 20, infoY + 120);
    context.fillText(`Max Quest Duration: ${maxQuestDuration} mins`, 20, infoY + 80);
    context.fillText(`Min Workout Duration: ${minWorkoutDuration} mins`, 20, infoY + 80);
  };

  