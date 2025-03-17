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
      dialog.innerHTML = `
        <div class="dialog-widget ${config.theme}">
          <h2>${config.title}</h2>
          <a href="${config.link}" class="dialog-button">${config.buttonText}</a>
        </div>
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

      // Добавляем в документ
      document.head.appendChild(styles);
      document.body.appendChild(dialog);
    } else {
      // 4️⃣ Если ничего не найдено – создаём iframe
      const iframe = document.createElement("iframe");
      iframe.src = "https://example.com/dialog-widget.html";
      iframe.width = "400";
      iframe.height = "300";
      iframe.style.position = "fixed";
      iframe.style.bottom = "20px";
      iframe.style.right = "20px";
      iframe.style.border = "none";

      document.body.appendChild(iframe);
    }
  }

  // Экспортируем функцию для использования снаружи
  window.showDialogWidget = createDialog;
})();
