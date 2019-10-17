'use strict';

(function () {

  var popupOpen = document.querySelector('.setup-open');
  var popupClose = window.popup.querySelector('.setup-close');
  var popupNameInput = document.querySelector('.setup-user-name');

  // ----Основные сценарии открытия, закрытия и перетаскивания диалогового окна----

  // Функция удаления обработчика закрытия попапа по нажатию на Esc
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE && (document.activeElement !== popupNameInput)) {
      closePopup();
    }
  };

  // Событие открытия попапа при клике
  popupOpen.addEventListener('click', function () {
    openPopup();
  });

  // Событие открытия попапа по нажатию на Enter при фокусе
  popupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  // Событие закрытия попапа при клике
  popupClose.addEventListener('click', function () {
    closePopup();
    window.popup.style = '';
  });

  // Событие закрытия попапа по нажатию на Enter при фокусе кнопки закрытия окна
  popupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // Событие при котором данные не отправляется, если форма ввода имени в фокусе при нажатии Enter
  popupNameInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      evt.preventDefault();
    }
  });

  // Функция открытия попапа
  var openPopup = function () {
    window.popup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия попапа
  var closePopup = function () {
    window.popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

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

  // ------------------------------------------------------------------------
  // Перетаскивание диалогового окна
  var dialogHandle = window.popup.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.popup.style.top = (window.popup.offsetTop - shift.y) + 'px';
      window.popup.style.left = (window.popup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (draggedEvt) {
          draggedEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
