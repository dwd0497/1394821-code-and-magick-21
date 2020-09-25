"use strict";

const LEFT_SPEED = 5;
const RIGHT_SPEED = 2;
const WIZARD_PROPORTION = 1.337;
const HEIGHT_DEVIDER = 3;

window.fireballSize = 22;
window.wizardWidth = 70;
window.wizardSpeed = 3;

function getFireballSpeed(rightWind) {
  return rightWind ? RIGHT_SPEED : LEFT_SPEED;
}

function getWizardHeight() {
  return window.wizardWidth * WIZARD_PROPORTION;
}

function getWizardX(positionX) {
  return (positionX - window.wizardWidth) / 2;
}

function getWizardY(positionY) {
  return positionY / HEIGHT_DEVIDER;
}

window.getFireballSpeed = getFireballSpeed;
window.getWizardHeight = getWizardHeight;
window.getWizardX = getWizardX;
window.getWizardY = getWizardY;
