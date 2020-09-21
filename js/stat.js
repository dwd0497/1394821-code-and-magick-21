"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 20;
const TEXT_HEIGHT = 20;
const BAR_WIDTH = 40;
const SPACE_BETWEEN_COLUMNS = 50;
const MAX_BAR_HEIGHT = 130;

function renderRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function renderText(ctx, text, x, y) {
  ctx.fillText(text, x, y);
}

function getMaxTime(times) {
  let maxTime = times[0];
  for (let i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  return maxTime;
}

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, `rgba(0, 0, 0, 0.7)`);
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, `white`);

  ctx.fillStyle = `black`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  renderText(ctx, `Ура вы победили!`, CLOUD_X + GAP, CLOUD_Y + GAP);
  renderText(ctx, `Список результатов:`, CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);

  ctx.textBaseline = `alphabetic`;

  const maxTime = getMaxTime(times);

  const roundTimes = times.map((i) => {
    return (i.toFixed(0));
  });

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = `black`;
    renderText(
        ctx,
        `${names[i]}`,
        CLOUD_X + GAP + (SPACE_BETWEEN_COLUMNS + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP
    );
    renderText(
        ctx,
        `${roundTimes[i]}`,
        CLOUD_X + GAP + (SPACE_BETWEEN_COLUMNS + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP - (MAX_BAR_HEIGHT * times[i]) / maxTime
    );
    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(255, ${Math.random() * 100}%, 50%)`;
    }
    renderRect(
        ctx,
        CLOUD_X + GAP + (SPACE_BETWEEN_COLUMNS + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT,
        BAR_WIDTH,
        -(MAX_BAR_HEIGHT * times[i]) / maxTime);
  }
};
