(function () {
    // Базова конфігурація, яку можна налаштувати через window.RaffleConfig
    const defaultConfig = {
        title: "Raffle Giveaway", // Назва розіграшу
        maxParticipants: 100, // Максимальна кількість учасників
        days: 1, // Кількість днів до завершення
        hours: 0, // Кількість годин до завершення
        minutes: 0, // Кількість хвилин до завершення
        apiKey: "", // API ключ для підключення до сервера
    };

    // Користувацька конфігурація, що передається через window.RaffleConfig
    const userConfig = window.RaffleConfig || {};
    const config = { ...defaultConfig, ...userConfig };

    // Обчислюємо кінцеву дату лише один раз
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + config.days);
    deadline.setHours(deadline.getHours() + config.hours);
    deadline.setMinutes(deadline.getMinutes() + config.minutes);

    // Створюємо модальне вікно
    function createModal() {
        const modalHTML = `
            <div id="raffle-modal" class="raffle-modal">
                <div class="raffle-content">
                    <h2>${config.title}</h2>
                    <p>Макс. учасників: ${config.maxParticipants}</p>
                    <p>Закінчення: ${deadline.toLocaleString()}</p>
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

    // Залишаємо лише функцію для відкриття модального вікна через вже наявну кнопку
    window.openRaffleModal = createModal; // Оголошуємо глобальну функцію для відкриття
})();
