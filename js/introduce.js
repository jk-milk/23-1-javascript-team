var tripButton = document.querySelector("#trip-button");
var studyButton = document.querySelector("#study-button");
var closeButton = document.querySelectorAll(".close-button");
var modal = document.querySelector(".modal");
var tripContent = document.querySelector("#trip-content");
var studyContent = document.querySelector("#study-content");
var tripData = null;
var studyData = null;

async function getContent() {
  tripData = { title: "환상적인 후쿠오카 여행의 매력", subTitle: `후쿠오카는 일본의 동쪽에 위치한 매력적인 도시로, 그 독특한 문화와 풍부한 관광 명소로 유명합니다. 다음은 후쿠오카 여행의 핵심적인 매력을 소개합니다.

  1. 맛있는 음식 천국: 후쿠오카는 일본의 대표적인 음식 문화인 라멘과 모츠나베(돼지고기 전골)로 유명합니다. 후쿠오카 라멘은 진한 국물과 탄탄한 면발이 특징이며, 모츠나베는 풍부한 맛과 향이 일품입니다. 시장이나 레스토랑에서 이 맛있는 음식들을 즐길 수 있습니다.
  
  2. 역사와 문화의 보고: 후쿠오카에는 역사적인 유산이 풍부하며, 후쿠오카 성과 오호리 공원은 꼭 방문해야 할 곳입니다. 후쿠오카 성은 17세기에 건립된 성으로, 아름다운 전망과 함께 역사적인 이야기를 만나볼 수 있습니다. 오호리 공원은 차분한 분위기와 함께 산책이나 피크닉을 즐길 수 있는 좋은 장소입니다.
  
  3. 도심의 활기와 쇼핑: 후쿠오카의 도심은 활기차고 현대적인 분위기를 느낄 수 있습니다. 텐진 지구는 유명한 상점과 레스토랑이 밀집된 지역으로, 다양한 쇼핑과 먹거리를 즐길 수 있습니다. 또한, 캐널 시티 하카타는 강을 따라 위치한 대형 쇼핑몰로 유명하며, 패션 브랜드부터 전통적인 공예품까지 다양한 상품을 구경할 수 있습니다.
  
  4. 아름다운 자연 경치: 후쿠오카 주변에는 아름다운 자연 경치도 풍부합니다. 나가사키 해변은 탁 트인 바다와 깨끗한 모래사장으로 유명하며, 여름에는 수영과 해변에서 즐길 수 있는 다양한 활동이 있습니다. 또한, 후쿠오카 주변에는 다케노우치 고지도 일대와 유네센 마운트 사보 등 자연 경치가 뛰어난 장소가 있습니다. 이곳에서는 하이킹이나 트레킹을 통해 풍경을 감상할 수 있으며, 신선한 공기와 평화로운 분위기를 느낄 수 있습니다.
  
  5. 흥미로운 축제와 이벤트: 후쿠오카는 다양한 축제와 이벤트로 유명합니다. 가장 유명한 축제인 후쿠오카 양궁 축제는 전통적인 일본 양궁 경기와 함께 풍선 놀이 등 다양한 이벤트가 펼쳐집니다. 또한, 마차리야 축제는 후쿠오카의 문화와 예술을 경험할 수 있는 재미있는 행사입니다.
  
  후쿠오카는 다채로운 매력을 지닌 도시로, 맛있는 음식, 역사와 문화, 도심의 활기, 아름다운 자연 경치, 그리고 다양한 축제와 이벤트를 경험할 수 있습니다. 후쿠오카를 방문하면 다양한 즐거움과 추억을 만들 수 있을 것입니다.
  ` }; // 여기에 실제 API 요청을 입력해야 함
  studyData = { title: "후쿠오카 현지학기제: 현장에서의 학습과 문화 교류 경험", subTitle: `후쿠오카 현지학기제는 학생들에게 후쿠오카 지역에서의 현장 학습과 문화 교류 경험을 제공하는 프로그램입니다. 다음은 후쿠오카 현지학기제의 주요 내용을 간결하게 설명합니다.

  1. 현장 학습: 후쿠오카 현지학기제는 학생들이 현장에서 직접 학습을 할 수 있는 기회를 제공합니다. 예를 들어, 학생들은 현지 기업이나 조직을 방문하여 실무 관련 지식을 습득하고, 실제 문제 해결에 도전하며 실무 능력을 향상시킬 수 있습니다.
  
  2. 문화 교류: 후쿠오카 현지학기제는 학생들에게 일본 문화와의 교류를 위한 다양한 활동을 제공합니다. 학생들은 일본어 실력 향상을 위한 언어 수업을 받을 수 있습니다.
  
  3. 지역 탐방: 후쿠오카 현지학기제는 학생들이 후쿠오카의 다양한 관광 명소를 방문하고 지역의 역사와 문화를 배울 수 있는 탐방 프로그램도 제공합니다. 후쿠오카의 역사적인 유적지나 아름다운 자연 경관 등을 학생들은 직접 체험하며 지식과 감동을 얻을 수 있습니다.
  
  후쿠오카 현지학기제는 학생들에게 이론적인 지식뿐만 아니라 실제 현장에서의 경험을 통해 문제 해결 능력, 협업 능력, 문화 이해력 등을 향상시킬 수 있는 기회를 제공합니다. 이를 통해 학생들은 진로 선택에 도움을 받을 뿐만 아니라 국제적인 시각과 네트워크를 형성할 수 있습니다.
  
  후쿠오카 현지학기제는 학문적인 학습과 문화 교류의 결합으로 학생들의 교육적 성장과 국제적 역량 강화에 기여하는 프로그램입니다.
  ` }; // 여기에 실제 API 요청을 입력해야 함
}

async function updateModalContent() {
  if (tripData && studyData) {
    tripContent.querySelector("h2").textContent = tripData.title;
    tripContent.querySelector("h3").textContent = tripData.subTitle;
    studyContent.querySelector("h2").textContent = studyData.title;
    studyContent.querySelector("h3").textContent = studyData.subTitle;
  }
}

function showModal(type) {
  modal.style.display = 'block';
  if (type === 'trip') {
    tripContent.style.display = 'block';
    studyContent.style.display = 'none';
  } else {
    tripContent.style.display = 'none';
    studyContent.style.display = 'block';
  }
}

function hideModal() {
  modal.style.display = 'none';
}

async function saveData(type, title, subTitle) {
  if (type === 'trip') {
    tripData.title = title;
    tripData.subTitle = subTitle;
  } else {
    studyData.title = title;
    studyData.subTitle = subTitle;
  }
}

async function deleteData(type) {
  if (type === 'trip') {
    tripData.title = '';
    tripData.subTitle = '';
  } else {
    studyData.title = '';
    studyData.subTitle = '';
  }
}

function bindEventListeners() {
  tripButton.addEventListener("click", () => {
    showModal("trip");
  });

  studyButton.addEventListener("click", () => {
    showModal("study");
  });

  closeButton.forEach(button => {
    button.addEventListener("click", () => {
      hideModal();
    });
  });

  tripContent.querySelector(".edit-button").addEventListener("click", () => {
    processEdit("trip");
  });

  tripContent.querySelector(".delete-button").addEventListener("click", () => {
    processDelete("trip");
  });

  studyContent.querySelector(".edit-button").addEventListener("click", () => {
    processEdit("study");
  });

  studyContent.querySelector(".delete-button").addEventListener("click", () => {
    processDelete("study");
  });
}

async function processEdit(type) {
  const data = type === "trip" ? tripData : studyData;
  const title = prompt("제목을 입력하세요:", data.title);
  const subTitle = prompt("내용을 입력하세요:", data.subTitle);
  await saveData(type, title, subTitle);
  await updateModalContent();
}

async function processDelete(type) {
  if (confirm("정말 삭제하시겠습니까?")) {
    await deleteData(type);
    await updateModalContent();
  }
}

(async function () {
  await getContent();
  await updateModalContent();
  bindEventListeners();
})();
