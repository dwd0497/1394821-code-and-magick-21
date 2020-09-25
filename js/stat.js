"use strict";

const User = {
  NAME: `Вы`,
  COLOR: `rgba(255, 0, 0, 1)`
};

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  BACKGROUND_COLOR: `white`,
  SHADOW_COLOR: `rgba(0, 0, 0, 0.7)`,
  TEXT: [`Ура вы победили!`, `Список результатов:`]
};

const Bar = {
  WIDTH: 40,
  MAX_HEIGHT: 110,
  SPACE_BETWEEN: 50,
};

const Font = {
  HEIGHT: 20,
  COLOR: `black`,
  FAMILY: `16px PT Mono`,
  BASELINE: `hanging`
};

const GAP = 20;

function getBarPositionX(i) {
  return Cloud.X + GAP * 2 + (Bar.SPACE_BETWEEN + Bar.WIDTH) * i;
}

function getBarPositionY() {
  return Cloud.Y + Cloud.HEIGHT - GAP - Font.HEIGHT;
}

function getBarHeight(time, maxTime) {
  return (Bar.MAX_HEIGHT * time) / maxTime;
}

function renderRect(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function renderText(ctx, text, x, y, color = `black`) {
  ctx.fillStyle = color;
  ctx.font = Font.FAMILY;
  ctx.textBaseline = Font.BASELINE;
  ctx.fillText(text, x, y);
}

function getMaxTime(times) {
  return Math.max(...times);
}

function renderCloud(ctx) {
  renderRect(ctx, Cloud.X + GAP, Cloud.Y + GAP, Cloud.WIDTH, Cloud.HEIGHT, Cloud.SHADOW_COLOR);
  renderRect(ctx, Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT, Cloud.BACKGROUND_COLOR);
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getBlueColor() {
  return `hsl(255, ${getRandomNumber(5, 255)}%, 50%)`;
}

function getColumnColor(name) {
  return name === User.NAME ? User.COLOR : getBlueColor();
}

function renderColumn(ctx, name, time, maxTime, i) {
  ctx.fillStyle = getColumnColor(name);
  renderRect(ctx, getBarPositionX(i), getBarPositionY(), Bar.WIDTH, -getBarHeight(time, maxTime));
}

function renderColumnLabels(ctx, name, time, maxTime, i) {
  renderText(ctx, name, getBarPositionX(i), getBarPositionY() + Font.HEIGHT);
  renderText(ctx, time, getBarPositionX(i), getBarPositionY() - GAP - getBarHeight(time, maxTime)
  );
}

function renderColumns(ctx, names, times) {
  const maxTime = getMaxTime(times);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const time = times[i].toFixed(0);
    renderColumn(ctx, name, time, maxTime, i);
    renderColumnLabels(ctx, name, time, maxTime, i);
  }
}

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx);

  renderText(ctx, Cloud.TEXT[0], Cloud.X + GAP, Cloud.Y + GAP);
  renderText(ctx, Cloud.TEXT[1], Cloud.X + GAP, Cloud.Y + GAP + Font.HEIGHT);

  renderColumns(ctx, names, times);
};
