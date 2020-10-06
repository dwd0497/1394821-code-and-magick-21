"use strict";

document.querySelector(`.setup`).classList.remove(`hidden`);
document.querySelector(`.setup-similar`).classList.remove(`hidden`);
let wizardsListElement = document.querySelector(`.setup-similar-list`);


const Wizards = {
  NAMES: [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`]
};

const wizardTemplateElement = document.querySelector(`#similar-wizard-template`).content.querySelector(`div`);

function renderWizards(wizards) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < wizards.length; i++) {
    const wizard = wizards[i];
    fragment.appendChild(createWizardElement(wizard));
  }

  wizardsListElement.appendChild(fragment);
}

function createWizardElement(wizard) {
  const wizardElement = wizardTemplateElement.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let getRandomElement = function (elements) {
  const randomIndex = getRandomNumber(0, elements.length - 1);
  return elements[randomIndex];
};

function isMedian(elementsOne, elementsTwo) {
  const oneLength = elementsOne.length;
  const twoLength = elementsTwo.length;
  const sum = oneLength + twoLength;
  const half = Math.round(sum / 2);

  return getRandomNumber(0, sum) > half;
}

function getWizardName() {
  const name = getRandomElement(Wizards.NAMES);
  const surname = getRandomElement(Wizards.SURNAMES);

  return isMedian(Wizards.NAMES, Wizards.SURNAMES) ? `${name} ${surname}` : `${surname} ${name}`;
}

function createRandomWizard() {
  return {
    name: getWizardName(),
    coatColor: getRandomElement(Wizards.COAT_COLORS),
    eyesColor: getRandomElement(Wizards.EYES_COLORS)
  };
}

function createRandomWizards() {
  const wizards = [];
  for (let i = 0; i < 4; i++) {
    wizards.push(createRandomWizard());
  }
  return wizards;
}

renderWizards(createRandomWizards());
