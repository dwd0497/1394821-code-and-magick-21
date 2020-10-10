"use strict";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const Wizards = {
  NAMES: [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`],
  FIREBALLS_COLORS: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
};

const wizardsListElement = document.querySelector(`.setup-similar-list`);
const setupOpenBtn = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupCloseBtn = setup.querySelector(`.setup-close`);
const userNameInput = setup.querySelector(`.setup-user-name`);
const wizardTemplateElement = document.querySelector(`#similar-wizard-template`).content.querySelector(`div`);
const wizardCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
const coatColorInput = setup.querySelector(`input[name=coat-color`);
const wizardEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
const eyesColorInput = setup.querySelector(`input[name=eyes-color`);
const wizardFireball = setup.querySelector(`.setup-fireball-wrap`);
const fireballColorInput = setup.querySelector(`input[name=fireball-color`);

document.querySelector(`.setup-similar`).classList.remove(`hidden`);

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

const getRandomElement = function (elements) {
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

// Задание 4-ого модуля

setupOpenBtn.addEventListener(`click`, function () {
  openPopup();
});

setupCloseBtn.addEventListener(`click`, function () {
  closePopup();
});

function openPopup() {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
  wizardCoat.addEventListener(`click`, onCoatClick);
  userNameInput.addEventListener(`input`, userNameInputValidity);
  wizardEyes.addEventListener(`click`, onEyesClick);
  wizardFireball.addEventListener(`click`, onFireballClick);
}

function closePopup() {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  wizardCoat.removeEventListener(`click`, onCoatClick);
  userNameInput.removeEventListener(`input`, userNameInputValidity);
  wizardEyes.removeEventListener(`click`, onEyesClick);
  wizardFireball.removeEventListener(`click`, onFireballClick);
}

function onPopupEscPress(evt) {
  if (evt.key === `Escape` && document.querySelector(`.setup-user-name`) !== document.activeElement) {
    closePopup();
  }
}

function userNameInputValidity() {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Слишком короткое имя, добавьте еще ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Слишком длинное имя, удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
}

function onCoatClick() {
  const newCoatColor = getRandomElement(Wizards.COAT_COLORS);
  wizardCoat.style.fill = newCoatColor;
  coatColorInput.value = newCoatColor;
}

function onEyesClick() {
  const newEyesColor = getRandomElement(Wizards.EYES_COLORS);
  wizardEyes.style.fill = newEyesColor;
  eyesColorInput.value = newEyesColor;
}

function onFireballClick() {
  const newFireballColor = getRandomElement(Wizards.FIREBALLS_COLORS);
  wizardFireball.style.backgroundColor = newFireballColor;
  fireballColorInput.value = newFireballColor;
}
