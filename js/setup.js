'use strict';

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var popup = document.querySelector('.setup');
var popupOpen = document.querySelector('.setup-open');
var popupClose = popup.querySelector('.setup-close');
var popupNameInput = document.querySelector('.setup-user-name');

var wizardSetup = document.querySelector('.setup-wizard-appearance');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardCoatColor = wizardSetup.querySelector('input[name="coat-color"]');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardEyesColor = wizardSetup.querySelector('input[name="eyes-color"]');
var fireball = document.querySelector('.setup-fireball-wrap');
var fireballColor = fireball.querySelector('input[name="fireball-color"]');

var listOfWizards = document.querySelector('.setup-similar-list');

// Получение случайного элемента массива
var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Создание случайного мага
var createRandomMage = function (firstNames, secondNames, coatColors, eyeColors) {
  return {
    name: getRandomArrayElement(firstNames) +
      ' ' +
      getRandomArrayElement(secondNames),
    coatColor: getRandomArrayElement(coatColors),
    eyesColor: getRandomArrayElement(eyeColors)
  };
};

// Создание армии (цикл создания рандомного набора магов)
var createArmy = function (strength) {
  var army = [];

  for (var i = 0; i < strength; i++) {
    army.push(createRandomMage(FIRST_NAMES, SECOND_NAMES, COAT_COLORS, EYE_COLORS));
  }

  return army;
};

var army = createArmy(WIZARD_COUNT);

// Визуализация магов
var renderWizard = function (wizard) {
  var wizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('div');

  var randomWizard = wizardTemplate.cloneNode(true);

  randomWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  randomWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  randomWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return randomWizard;
};

// Визуализация армии магов
var renderArmy = function () {
  var fragment = document.createDocumentFragment();

  army.forEach(function (item) {
    fragment.appendChild(renderWizard(item));
  });
  return listOfWizards.appendChild(fragment);
};

renderArmy();

// Функция удаления обработчика закрытия попапа по нажатию на Esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && (document.activeElement !== popupNameInput)) {
    closePopup();
  }
};

// Функция открытия попапа
var openPopup = function () {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия попапа
var closePopup = function () {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Событие открытия попапа при клике
popupOpen.addEventListener('click', function () {
  openPopup();
});

// Событие открытия попапа по нажатию на Enter при фокусе
popupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Событие закрытия попапа при клике
popupClose.addEventListener('click', function () {
  closePopup();
});

// Событие закрытия попапа по нажатию на Enter при фокусе кнопки закрытия окна
popupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Событие при котором данные не отправляется, если форма ввода имени в фокусе при нажатии Enter
popupNameInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
  }
});

// Валидация формы ввода имени
popupNameInput.addEventListener('invalid', function () {
  if (popupNameInput.validity.tooShort) {
    popupNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (popupNameInput.validity.tooLong) {
    popupNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (popupNameInput.validity.valueMissing) {
    popupNameInput.setCustomValidity('Обязательное поле');
  } else {
    popupNameInput.setCustomValidity('');
  }
});

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

// Удаление класса
function showElement(selector) {
  document.querySelector(selector).classList.remove('hidden');
}
showElement('.setup');
showElement('.setup-similar');
