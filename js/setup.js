"use strict";

document.querySelector(`.setup`).classList.remove(`hidden`);
document.querySelector(`.setup-similar`).classList.remove(`hidden`);

const WIZARDS_NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARDS_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

function renderWizards() {
  const similarWizardsList = document.querySelector(`.setup-similar-list`);
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardDOM(i));
  }
  similarWizardsList.appendChild(fragment);
}

function createWizardDOM(i) {
  let template = document.querySelector(`#similar-wizard-template`).content.querySelector(`div`);
  let wizardDOM = template.cloneNode(true);
  wizardDOM.children[1].textContent = wizards[i].name;
  wizardDOM.children[0].children[0].children[0].children[0].style.fill = wizards[i].coatColor;
  wizardDOM.children[0].children[0].children[0].children[2].style.fill = wizards[i].eyesColor;
  return wizardDOM;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getWizardName() {
  return `${WIZARDS_NAMES[getRandomNumber(0, 5)]} ${WIZARDS_SURNAMES[getRandomNumber(0, 5)]}`;
}

function buildWizard() {
  return {
    name: getWizardName(),
    coatColor: COAT_COLORS[getRandomNumber(0, 5)],
    eyesColor: EYES_COLORS[getRandomNumber(0, 5)]
  };
}

function buildWizards() {
  let wizardsArr = [];
  for (let i = 0; i < 4; i++) {
    wizardsArr.push(buildWizard());
  }
  return wizardsArr;
}

let wizards = buildWizards();

renderWizards();
