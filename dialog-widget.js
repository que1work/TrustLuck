(function () {
  function getConfig() {
    // 1️⃣ Пробуем получить настройки из JS (если они есть)
    if (window.DialogWidgetConfig) {
      return window.DialogWidgetConfig;
    }

    // 2️⃣ Если нет JS, ищем настройки в HTML (data-атрибуты)
    const widget = document.getElementById("dialog-widget");
    if (widget) {
      return {
        title: widget.getAttribute("data-title") || "Розыгрыш",
        link: widget.getAttribute("data-link") || "#",
        buttonText: widget.getAttribute("data-button") || "Подробнее",
        theme: widget.getAttribute("data-theme") || "light",
      };
    }

    // 3️⃣ Если ничего не найдено – загружаем через iframe
    return null;
  }

  const config = getConfig();

  // Функция для создания диалога
  function createDialog() {
    if (config) {
      const dialog = document.createElement("div");
      dialog.classList.add("dialog-widget", config.theme);

      dialog.innerHTML = `
        <h2>${config.title}</h2>
        <a href="${config.link}" class="dialog-button">${config.buttonText}</a>
      `;

      // Стили
      const styles = document.createElement("style");
      styles.innerHTML = `
        .dialog-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .dialog-widget.dark { background: #333; color: white; }
        .dialog-button {
          display: block;
          margin-top: 10px;
          padding: 8px;
          background: blue;
          color: white;
          text-align: center;
          border-radius: 5px;
          text-decoration: none;
        }
      `;

      // Добавляем стили в head
      document.head.appendChild(styles);

      // Помещаем диалог в объект window
      window.dialogWidget = dialog;
    }
  }

  // Экспортируем функцию для отображения диалога
  window.showDialogWidget = function () {
    if (window.dialogWidget) {
      document.body.appendChild(window.dialogWidget); // Показываем диалог
    }
  };

  // Сразу создаем диалог, но не показываем его
  createDialog();

})();
