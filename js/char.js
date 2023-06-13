for (let i = 0; i < 5; i++) {
  document
    .querySelectorAll(".char-box")
    [i].addEventListener("click", function () {
      document.querySelector(".black-bg").classList.add("show-modal");
    });
}

document.querySelector(".close-btn").addEventListener("click", function () {
  document.querySelector(".black-bg").classList.remove("show-modal");
});
