// 동적으로 JavaScript 파일을 로드하기 위한 함수 정의
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.id = 'dynamicScriptTag';
    document.body.appendChild(script);
  }
  
  function navigateTo(page) {
    const contentDiv = document.getElementById('htmlContent');
  
    // 기존에 동적으로 추가된 script 태그를 제거
    const oldScriptElement = document.getElementById('dynamicScriptTag');
    if (oldScriptElement) oldScriptElement.remove();
  
    fetch(`./pages/${page}.html`)
      .then((response) => {
        if (!response.ok) {
          contentDiv.innerHTML = '404: Page not found';
          throw new Error('Page not found');
        }
        return response.text();
      })
      .then((html) => {
        contentDiv.innerHTML = html;
  
        // JavaScript 파일을 로드하는 코드
        console.log('Loading script:', `js/${page}.js`);
        loadScript(`js/${page}.js`);

      })
      .catch((err) => console.error(err));
  }

// 기본 페이지 설정 (예: home)
navigateTo('board'); 
// live server의 자동 새로고침으로 db.json 파일이
// 수정될 때마다 메인 화면으로 돌아옴
