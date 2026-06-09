let storedCode = sessionStorage.getItem("pendingCode");

// Если кода нет — вернуть на регистрацию
if (!storedCode) {
  window.location.href = "../reg/reg.html";
}

let verifyCode = (event) => {
  event.preventDefault();

  let input = document.getElementById("verifyInput").value.trim();
  let secondInput = document.getElementById("in").value.trim();

  let errorEl = document.getElementById("errorMsg");

  // Проверяем:
  // 1. verifyInput совпадает с storedCode
  // 2. verifyInput совпадает со вторым input
  if (input === storedCode && input === secondInput) {

    // Удаляем код после успешной проверки
    sessionStorage.removeItem("pendingCode");

    // Переход
    window.location.href = "../dashboard/dashboard.html";

  } else {

    errorEl.textContent =
      "Invalid code. Please check your Telegram and try again.";

    document.getElementById("verifyInput").value = "";
    document.getElementById("verifyInput").focus();
  }
};