"use strict";

document.querySelector(`.setup`).classList.remove(`hidden`);
document.querySelector(`.setup-similar`).classList.remove(`hidden`);

const WIZARDS_NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARDS_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

function renderWizards() {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizard(i));
  }
  document.querySelector(`.setup-similar-list`).appendChild(fragment);
}

function createWizard(i) {
  let wizard = document.querySelector(`#similar-wizard-template`).content.querySelector(`div`).cloneNode(true);
  wizard.querySelector(`.setup-similar-label`).textContent = wizards[i].name;
  wizard.querySelector(`.wizard-coat`).style.fill = wizards[i].coatColor;
  wizard.querySelector(`.wizard-eyes`).style.fill = wizards[i].eyesColor;
  return wizard;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getWizardName() {
  return getRandomNumber(0, 10) > 5 ?
    `${WIZARDS_NAMES[getRandomNumber(0, 5)]} ${WIZARDS_SURNAMES[getRandomNumber(0, 5)]}` :
    `${WIZARDS_SURNAMES[getRandomNumber(0, 5)]} ${WIZARDS_NAMES[getRandomNumber(0, 5)]}`;
}

function getWizard() {
  return {
    name: getWizardName(),
    coatColor: COAT_COLORS[getRandomNumber(0, 5)],
    eyesColor: EYES_COLORS[getRandomNumber(0, 5)]
  };
}

function getWizards() {
  let wizardsArr = [];
  for (let i = 0; i < 4; i++) {
    wizardsArr.push(getWizard());
  }
  return wizardsArr;
}

let wizards = getWizards();

renderWizards();
