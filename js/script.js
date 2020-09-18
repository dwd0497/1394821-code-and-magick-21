"use strict";

const LEFT_SPEED = 5;
const RIGHT_SPEED = 2;
const WIZARD_PROPORTION = 1.337;
const HEIGHT_DEVIDER = 3;

const fireballSize = 22;
const wizardWidth = 70;

window.wizardSpeed = 3;

function getFireballSpeed(rightWind) {
  return rightWind ? RIGHT_SPEED : LEFT_SPEED;
}

function getWizardHeight() {
  return wizardWidth * WIZARD_PROPORTION;
}

function getWizardX(positionX) {
  return (positionX - wizardWidth) / 2;
}

function getWizardY(positionY) {
  return positionY / HEIGHT_DEVIDER;
}
