document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".video-card");
  const dialog = document.getElementById("video-dialog");
  const dialogVideo = document.getElementById("dialog-video");
  const closeButton = document.querySelector(".dialog-close");

  document.getElementById("year").textContent = new Date().getFullYear();

  cards.forEach((card) => {
    const button = card.querySelector(".video-open");
    const video = card.querySelector(".reel");
    const source = video.querySelector("source");

    // Jeśli pliku jeszcze nie ma, przeglądarka pokaże placeholder zamiast pustego okna.
    video.addEventListener("loadedmetadata", () => button.classList.add("has-video"));
    video.addEventListener("canplay", () => button.classList.add("has-video"));
    video.addEventListener("error", () => button.classList.remove("has-video"));

    button.addEventListener("click", () => {
      if (!source || !source.getAttribute("src")) return;
      dialogVideo.src = source.getAttribute("src");
      dialogVideo.load();
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
        dialogVideo.play().catch(() => {});
      } else {
        window.open(source.getAttribute("src"), "_blank", "noopener");
      }
    });
  });

  function closeDialog() {
    dialogVideo.pause();
    dialogVideo.removeAttribute("src");
    dialogVideo.load();
    if (dialog.open) dialog.close();
  }

  closeButton.addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", () => {
    dialogVideo.pause();
    dialogVideo.removeAttribute("src");
    dialogVideo.load();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) closeDialog();
  });
});
