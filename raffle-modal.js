(function () {
    const defaultConfig = {
        title: "Raffle Giveaway",
        maxParticipants: 100,
        days: 1,
        hours: 0,
        minutes: 0,
        apiKey: "",
    };

    const userConfig = window.RaffleConfig || {};
    const config = { ...defaultConfig, ...userConfig };

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + config.days);
    deadline.setHours(deadline.getHours() + config.hours);
    deadline.setMinutes(deadline.getMinutes() + config.minutes);

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

        document.getElementById("raffle-join").addEventListener("click", joinRaffle);
        document.getElementById("raffle-close").addEventListener("click", () => {
            document.getElementById("raffle-modal").remove();
        });
    }

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

    document.addEventListener("DOMContentLoaded", () => {
        const button = document.createElement("button");
        button.innerText = "Прийняти участь";
        button.style.padding = "10px";
        button.style.cursor = "pointer";
        button.addEventListener("click", createModal);
        document.body.appendChild(button);
    });
})();
