// // 모달창 띄우기
// for (let i = 0; i < 5; i++) {
//   document
//     .querySelectorAll(".char-box")
//     [i].addEventListener("click", function () {
//       document.querySelector(".black-bg").classList.add("show-modal");
//     });
// }
// 생성버튼
document.querySelector("#create-btn").addEventListener("click", function () {
  const div = document.createElement("div");
  const newTag = document.querySelector("#char-container").appendChild(div);
  newTag.classList.add("char-box");
});
// // 닫기버튼
// document.querySelector(".close-btn").addEventListener("click", function () {
//   document.querySelector(".black-bg").classList.remove("show-modal");
// });
printCharBox();
function printCharBox() {
  // json안에 있는 데이터 값만큼 출력 (div삭제후 다시 추가)
  const dataContainer = document.getElementById("char-container");
  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }
  fetch("http://localhost:3000/members")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const div = document.createElement("div");

        const img = document.createElement("img");
        img.src = `./${item.image}`;
        div.appendChild(img);

        dataContainer.appendChild(div).classList.add("char-box");
      });
    })
    .catch((error) => console.error("Error:", error));
}
