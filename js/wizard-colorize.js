'use strict';

(function () {

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var wizardSetup = document.querySelector('.setup-wizard-appearance');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardCoatColor = wizardSetup.querySelector('input[name="coat-color"]');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardEyesColor = wizardSetup.querySelector('input[name="eyes-color"]');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballColor = fireball.querySelector('input[name="fireball-color"]');

  // Событие изменения цвета мантии волшебника при клике
  wizardCoat.addEventListener('click', function () {
    wizardCoatColor.value = getRandomArrayElement(COAT_COLORS);
    wizardCoat.style.fill = wizardCoatColor.value;
  });

  // Событие изменения цвета глаз волшебника при клике
  wizardEyes.addEventListener('click', function () {
    wizardEyesColor.value = getRandomArrayElement(EYE_COLORS);
    wizardEyes.style.fill = wizardEyesColor.value;
  });

  // Событие изменения цвета фаербола волшебника при клике
  fireball.addEventListener('click', function () {
    fireballColor.value = getRandomArrayElement(FIREBALL_COLORS);
    fireball.style.background = fireballColor.value;
  });
})();
