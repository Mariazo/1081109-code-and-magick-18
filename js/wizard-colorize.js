'use strict';

(function () {

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardSetup = document.querySelector('.setup-wizard-appearance');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardCoatColor = wizardSetup.querySelector('input[name="coat-color"]');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardEyesColor = wizardSetup.querySelector('input[name="eyes-color"]');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballColor = fireball.querySelector('input[name="fireball-color"]');

  // Событие изменения цвета мантии волшебника при клике
  wizardCoat.addEventListener('click', function () {
    wizardCoatColor.value = window.setup.getRandomElement(window.WIZARD_COATS);
    wizardCoat.style.fill = wizardCoatColor.value;
  });

  // Событие изменения цвета глаз волшебника при клике
  wizardEyes.addEventListener('click', function () {
    wizardEyesColor.value = window.setup.getRandomElement(window.WIZARD_EYES);
    wizardEyes.style.fill = wizardEyesColor.value;
  });

  // Событие изменения цвета фаербола волшебника при клике
  fireball.addEventListener('click', function () {
    fireballColor.value = window.setup.getRandomElement(FIREBALL_COLORS);
    fireball.style.background = fireballColor.value;
  });
})();
