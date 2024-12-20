const urlInput = document.getElementById("url");
const generateBtn = document.getElementById("btn-generate");

/**
 * Function to validate the URL
 *
 * @param {*} url
 * @returns url format
 */
function isValidURL(url) {
  const regex =
    /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return regex.test(url);
}

/**
 * Event to generate QR and redirect
 */
generateBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();

  if (url === "" || !isValidURL(url)) {
    alert("Please enter a valid URL.");
    return;
  }

  localStorage.setItem("qrUrl", url);

  window.location.href = "qrcode.html";
});
