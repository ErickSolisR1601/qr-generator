const qrCodeContainer = document.getElementById("qrcode");
const downloadBtn = document.getElementById("btn-download");
const shareBtn = document.getElementById("btn-share");

const url = localStorage.getItem("qrUrl");

if (!url) {
  alert("No QR code to generate. Redirecting to home...");
  window.location.href = "index.html";
} else {
  /**
   * Generate QR Code
   */
  const qrCode = new QRCode(qrCodeContainer, {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  /**
   * Download the QR Code
   */
  downloadBtn.addEventListener("click", () => {
    const qrImage = qrCodeContainer.querySelector("img");
    const link = document.createElement("a");
    link.href = qrImage.src;
    link.download = "qrcode.png";
    link.click();
  });

  /**
   * Share QR Code (copy to clipboard)
   */
  shareBtn.addEventListener("click", async () => {
    try {
      const qrImage = qrCodeContainer.querySelector("img");
      const response = await fetch(qrImage.src);
      const blob = await response.blob();

      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);

      alert("QR Code copied to clipboard!");
    } catch (error) {
      console.error("Error copying QR Code to clipboard:", error);
      alert("Failed to copy QR Code to clipboard.");
    }
  });
}
