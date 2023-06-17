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
        img.src = `../home/${item.image}`;

        div.addEventListener("click", () => {
          const modal = document.querySelector("#modal");
          modal.classList.add("show-modal");
          modal.dataset.memberId = item.id; // id 값을 추가

          const modalImg = document.querySelector("#img-modal");
          modalImg.innerHTML = "";
          const imgClone = img.cloneNode(true);
          modalImg.appendChild(imgClone);

          document.querySelector(
            "#name-modal"
          ).textContent = `이름 : ${item.name}`;
          document.querySelector(
            "#position-modal"
          ).textContent = `포지션 : ${item.position}`;
          document.querySelector(
            "#introduction-modal"
          ).textContent = `자기소개 : ${item.introduction}`;
        });
        div.appendChild(img);
        dataContainer.appendChild(div).classList.add("char-box");
      });
      // 모달 닫기버튼
      const closeButton = document.querySelector("#close");
      closeButton.addEventListener("click", () => {
        document.querySelector("#modal").classList.remove("show-modal");
      });
      // 모달 수정버튼
      const editButton = document.querySelector("#edit");
      editButton.addEventListener("click", edit);
      // 모달 삭제버튼
      const deleteButton = document.querySelector("#delete");
      deleteButton.addEventListener("click", delet);
      // 생성버튼
      const createButton = document.querySelector("#create-btn");
      createButton.addEventListener("click", createChar);
    })
    .catch((error) => console.error("Error:", error));
}

function edit() {
  const modalImg = document.querySelector("#img-modal img");
  const nameModal = document.querySelector("#name-modal");
  const positionModal = document.querySelector("#position-modal");
  const introductionModal = document.querySelector("#introduction-modal");

  // 이미지 파일 수정
  const newImageName = prompt(
    "이미지 선택 (안유진, 윈터, 지수, 카리나, 카즈하) 하나만"
  );
  if (newImageName) {
    const newImageSrc = `./css/${newImageName}.jpg`;
    modalImg.src = newImageSrc;
  }

  // 이름 수정
  const newName = prompt("새로운 이름을 입력하세요.");
  if (newName) {
    nameModal.textContent = `이름: ${newName}`;
  }

  // 포지션 수정
  const newPosition = prompt("새로운 포지션을 입력하세요.");
  if (newPosition) {
    positionModal.textContent = `포지션: ${newPosition}`;
  }

  // 자기소개 수정
  const newIntroduction = prompt("새로운 자기소개를 입력하세요.");
  if (newIntroduction) {
    introductionModal.textContent = `자기소개: ${newIntroduction}`;
  }

  // JSON 파일 수정
  const memberId = document.querySelector("#modal").dataset.memberId;
  const data = {
    image: modalImg.getAttribute("src"),
    name: newName || nameModal.textContent.split(": ")[1],
    position: newPosition || positionModal.textContent.split(": ")[1],
    introduction:
      newIntroduction || introductionModal.textContent.split(": ")[1],
  };

  fetch(`http://localhost:3000/members/${memberId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      alert("수정되었습니다.");
      printCharBox(); // 수정 후 목록 갱신
    })
    .catch((error) => console.error("Error:", error));
}
function delet() {
  const memberId = document.querySelector("#modal").dataset.memberId;

  // JSON 데이터를 서버에서 제거
  fetch(`http://localhost:3000/members/${memberId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      alert("삭제되었습니다.");
      printCharBox(); // 삭제 후 목록 갱신
    })
    .catch((error) => console.error("Error:", error));
}
function createChar() {
  const newImageName = prompt(
    "이미지 선택 (안유진, 윈터, 지수, 카리나, 카즈하) 하나만"
  );
  if (!newImageName) {
    return; // 이미지 선택이 취소되었을 경우 함수 종료
  }

  const newName = prompt("이름을 입력하세요.");
  if (!newName) {
    return; // 이름 입력이 취소되었을 경우 함수 종료
  }

  const newPosition = prompt("포지션을 입력하세요.");
  if (!newPosition) {
    return; // 포지션 입력이 취소되었을 경우 함수 종료
  }

  const newIntroduction = prompt("자기소개를 입력하세요.");
  if (!newIntroduction) {
    return; // 자기소개 입력이 취소되었을 경우 함수 종료
  }

  const data = {
    id: "", // 비어있는 id 값
    image: `./css/${newImageName}.jpg`,
    name: newName,
    position: newPosition,
    introduction: newIntroduction,
  };

  // 서버에 새로운 JSON 데이터 추가
  fetch("http://localhost:3000/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      alert("새로운 캐릭터가 추가되었습니다.");
      printCharBox(); // 목록 갱신
    })
    .catch((error) => console.error("Error:", error));
}
