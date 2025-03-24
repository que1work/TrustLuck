(function () {
    // Базова конфігурація, яку можна налаштувати через window.RaffleConfig
    const defaultConfig = {
        title: "Raffle Giveaway", // Назва розіграшу
        maxParticipants: 100, // Максимальна кількість учасників
        deadline: "", // Кінцева дата у форматі ISO (наприклад, 2025-03-30T18:00)
        apiKey: "", // API ключ для підключення до сервера
    };

    // Користувацька конфігурація, що передається через window.RaffleConfig
    const userConfig = window.RaffleConfig || {};
    const config = { ...defaultConfig, ...userConfig };

    // Перетворення строки deadline у дату
    let deadlineDate;
    if (config.deadline) {
        deadlineDate = new Date(config.deadline);
        if (isNaN(deadlineDate.getTime())) {
            console.error("Невірний формат дати у deadline.");
            deadlineDate = new Date(); // fallback на поточну дату
        }
    } else {
        deadlineDate = new Date();
    }

    // Створюємо модальне вікно
    function createModal() {
        const modalHTML = `
            <div id="raffle-modal" class="raffle-modal">
                <div class="raffle-content">
                    <h2>${config.title}</h2>
                    <p>Макс. учасників: ${config.maxParticipants}</p>
                    <p>Закінчення: ${deadlineDate.toLocaleString()}</p>
                    <button id="raffle-join">Прийняти участь</button>
                    <button id="raffle-close">Закрити</button>
                </div>
            </div>
            <style>
                .raffle-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; }
                .raffle-content { background: white; padding: 20px; border-radius: 10px; text-align: center; }
                #raffle-join, #raffle-close { margin-top: 10px; padding: 10px; cursor: pointer; }
            </style>
        `;
        document.body.insertAdjacentHTML("beforeend", modalHTML);

        // Обробник події для кнопки "Прийняти участь"
        document.getElementById("raffle-join").addEventListener("click", joinRaffle);

        // Обробник події для кнопки "Закрити"
        document.getElementById("raffle-close").addEventListener("click", () => {
            document.getElementById("raffle-modal").remove();
        });
    }

    // Функція для участі в розіграші
    function joinRaffle() {
        if (!config.apiKey) {
            alert("API ключ не вказано!");
            return;
        }
        fetch("https://example.com/api/join", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${config.apiKey}` },
            body: JSON.stringify({ raffle: config.title, participant: "user@example.com" })
        })
        .then(response => response.json())
        .then(data => alert(data.message || "Успішно зареєстровано!"))
        .catch(error => alert("Помилка: " + error.message));
    }

    // Глобальна функція для відкриття модального вікна
    window.openRaffleModal = createModal;
})();
