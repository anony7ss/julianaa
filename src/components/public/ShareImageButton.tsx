"use client";

import { Download } from "lucide-react";

export function ShareImageButton({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  function downloadCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.fillStyle = "#fffdfb";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#8f1727";
    context.fillRect(0, 0, 18, canvas.height);
    context.fillStyle = "#fbebed";
    context.fillRect(790, 0, 410, canvas.height);

    context.fillStyle = "#8f1727";
    context.font = "700 26px Arial, sans-serif";
    context.fillText(category.toUpperCase(), 80, 104);

    context.fillStyle = "#171315";
    context.font = "700 68px Georgia, serif";
    drawWrappedText(context, title, 80, 190, 720, 76, 5);

    context.fillStyle = "#443a3d";
    context.font = "400 28px Arial, sans-serif";
    context.fillText("Juu News", 80, 550);
    context.fillText("Noticias do nosso amor", 80, 586);

    context.fillStyle = "#8f1727";
    context.beginPath();
    context.arc(995, 260, 108, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#ffffff";
    context.font = "700 42px Georgia, serif";
    context.fillText("Juu", 943, 250);
    context.fillText("News", 928, 304);

    const link = document.createElement("a");
    link.download = "juu-news-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <button
      type="button"
      onClick={downloadCard}
      className="public-button focus-ring h-10 px-3"
    >
      <Download className="h-4 w-4" />
      Card da noticia
    </button>
  );
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const words = text.split(" ");
  let line = "";
  let lines = 0;

  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    const width = context.measureText(testLine).width;
    const lastWord = index === words.length - 1;

    if (width > maxWidth && line) {
      context.fillText(lines === maxLines - 1 ? `${line}...` : line, x, y + lines * lineHeight);
      line = word;
      lines += 1;
      return;
    }

    line = testLine;

    if (lastWord && lines < maxLines) {
      context.fillText(line, x, y + lines * lineHeight);
    }
  });
}
