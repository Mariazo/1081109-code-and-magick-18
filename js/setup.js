'use strict';

(function () {

  var WIZARD_NAMES = [
    'Иван',
    'Хуан',
    'Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'];
  var WIZARD_COATS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  window.WIZARD_COATS = WIZARD_COATS;
  var WIZARD_EYES = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  window.WIZARD_EYES = WIZARD_EYES;
  var WIZARDS_COUNT = 4;

  var popup = document.querySelector('.setup');
  window.popup = popup;


  var similarListElement = popup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var wizards = [];

  // Функция, возвращающая случайный элемемент массива
  window.setup = {
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };

  // Цикл создания случайного волшебника и добавления его в массив
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards.push({
      name: window.setup.getRandomElement(WIZARD_NAMES) + ' ' + window.setup.getRandomElement(WIZARD_SURNAMES),
      coatColor: window.setup.getRandomElement(WIZARD_COATS),
      eyesColor: window.setup.getRandomElement(WIZARD_EYES)
    });
  }

  // Генерация шаблона волшебника
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }
  similarListElement.appendChild(fragment);

  popup.querySelector('.setup-similar').classList.remove('hidden');
})();
