"use strict";

const fireballSize = 22;

function getFireballSpeed(rightWind) {
    return rightWind ? 2 : 5;
}

const wizardWidth = 70;

function getWizardHeight() {
    return wizardWidth * 1.337;
}

var wizardSpeed = 3;

function getWizardX(positionX) {
    return positionX / 2 - wizardWidth / 2;
}

function getWizardY(positionY) {
    return positionY / 3;
}
