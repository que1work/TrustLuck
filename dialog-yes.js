(function() {
  // Функция для создания модального окна
  function createModal(drawTitle) {
    // Создание контейнера для модального окна
    const modalOverlay = document.createElement('div');
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalOverlay.style.zIndex = '9999';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';

    const modal = document.createElement('div');
    modal.style.backgroundColor = '#fff';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    modal.style.maxWidth = '400px';
    modal.style.width = '100%';

    // Заголовок розыгрыша
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = drawTitle || "Розыгрыш";
    modalTitle.style.textAlign = 'center';

    // Поле для ввода email
    const emailInputLabel = document.createElement('label');
    emailInputLabel.textContent = 'Введите ваш email:';
    emailInputLabel.style.display = 'block';
    emailInputLabel.style.marginBottom = '8px';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Ваш email';
    emailInput.style.width = '100%';
    emailInput.style.padding = '8px';
    emailInput.style.marginBottom = '15px';
    emailInput.style.borderRadius = '4px';
    emailInput.style.border = '1px solid #ddd';

    // Кнопка отправки
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Принять участие';
    submitButton.style.backgroundColor = '#4CAF50';
    submitButton.style.color = 'white';
    submitButton.style.border = 'none';
    submitButton.style.padding = '10px 20px';
    submitButton.style.borderRadius = '4px';
    submitButton.style.cursor = 'pointer';

    // Кнопка закрытия
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '8px 16px';
    closeButton.style.borderRadius = '4px';
    closeButton.style.marginTop = '10px';
    closeButton.style.cursor = 'pointer';

    // Функция для отображения сообщения, если пользователь уже принял участие
    function showParticipationMessage() {
      modal.innerHTML = ''; // Очистить все элементы в модальном окне
      const message = document.createElement('h2');
      message.textContent = 'Вы успешно приняли участие!';
      message.style.textAlign = 'center';
      modal.appendChild(message);
      modal.appendChild(closeButton); // Кнопка "Закрыть" остаётся
    }

    // Проверка, если пользователь уже принял участие
    if (localStorage.getItem('participated')) {
      showParticipationMessage();
      document.body.appendChild(modalOverlay);
      return; // Если уже участвует, показываем только сообщение
    }

    submitButton.addEventListener('click', function() {
      if (emailInput.value) {
        // Сохраняем, что пользователь принял участие
        localStorage.setItem('participated', 'true');
        showParticipationMessage();
        modalOverlay.remove(); // Закрыть окно после участия
      } else {
        alert('Пожалуйста, введите ваш email.');
      }
    });

    closeButton.addEventListener('click', function() {
      modalOverlay.remove(); // Закрыть окно
    });

    // Добавление всех элементов в модальное окно
    modal.appendChild(modalTitle);
    modal.appendChild(emailInputLabel);
    modal.appendChild(emailInput);
    modal.appendChild(submitButton);
    modal.appendChild(closeButton);
    modalOverlay.appendChild(modal);

    // Добавление модального окна в body
    document.body.appendChild(modalOverlay);
  }

  // Функция для привязки модального окна к кнопке "Узнать"
  function attachModalToButton(buttonSelector, drawTitle) {
    const button = document.querySelector(buttonSelector);
    if (button) {
      button.addEventListener('click', function() {
        createModal(drawTitle);
      });
    }
  }

  // Экспортируем функцию, чтобы использовать в других проектах
  window.attachModalToButton = attachModalToButton;

})();
