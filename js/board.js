// JSON 서버 주소
var BASE_URL = "http://localhost:3000/posts";
var COMMENTS_URL = "http://localhost:3000/comments";

// HTML 요소 선택자
var postFormElement = document.getElementById("post-form");
var postListElement = document.getElementById("post-list");
var formContainerElement = document.getElementById("form-container");
var newPostBtn = document.getElementById("new-post");
var cancelBtn = document.getElementById("cancel");
var formTitleElement = document.getElementById("form-title");

// 게시물 가져오기
fetchPosts();

// 폼 제출 이벤트 리스너
postFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  if (postFormElement.dataset.id) {
    updatePost(postFormElement.dataset.id);
  } else {
    createPost();
  }
});

// 새 게시물 추가 버튼 이벤트 리스너
newPostBtn.addEventListener("click", () => {
  formContainerElement.classList.remove("hidden");
});

// 취소 버튼 이벤트 리스너
cancelBtn.addEventListener("click", () => {
  formContainerElement.classList.add("hidden");
  document.getElementById("form-title").textContent = "질문하기";
});

// 게시물 가져오는 함수
async function fetchPosts() {
  const response = await fetch(BASE_URL);
  const posts = await response.json();
  for (const post of posts) {
    post.comments = await fetchComments(post.id);
  }
  displayPosts(posts);
}

// 게시물 출력하는 함수
function displayPosts(posts) {
  postListElement.innerHTML = "";
  posts.forEach((post, index) => {
    const postItem = `
      <div class="post-item" data-id="${post.id}">
        <h3>${index + 1}. ${post.title}</h3>
        <p>${post.content}</p>
        <button class="edit">수정</button>
        <button class="delete">삭제</button>
        <div class="comment-section">
          <form class="comment-form">
            <label for="comment">댓글 작성:</label>
            <input type="text" name="comment" class="comment-input" required />
            <button type="submit">작성</button>
          </form>
          <div class="comments">
            ${post.comments
              .map(
                (comment) =>
                  `<div class="comment" data-id="${comment.id}">
                     <p>${comment.text}</p>
                     <button class="edit-comment">수정</button>
                     <button class="delete-comment">삭제</button>
                   </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    postListElement.innerHTML += postItem;
  });

  setEditAndDeleteBtns();
  setCommentInputListeners();
  setEditAndDeleteCommentBtns();
}

// 새 게시물 추가하는 함수
async function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (response.ok) {
    fetchPosts();
    postFormElement.reset();
    formContainerElement.classList.add("hidden");
    document.getElementById("form-title").textContent = "질문하기";
  } else {
    alert("게시물 추가에 실패하였습니다.");
  }
}

// 게시물 수정 함수
async function updatePost(id) {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (response.ok) {
    fetchPosts();
    postFormElement.reset();
    delete postFormElement.dataset.id;
    formContainerElement.classList.add("hidden");
    document.getElementById("form-title").textContent = "질문하기";
  } else {
    alert("게시물 수정에 실패하였습니다.");
  }
}

// 게시물 수정 및 삭제 이벤트 설정
function setEditAndDeleteBtns() {
  const editBtns = document.querySelectorAll(".edit");
  const deleteBtns = document.querySelectorAll(".delete");

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      formContainerElement.classList.remove("hidden");  
      document.getElementById("form-title").textContent = "수정하기"; 
      const postId = e.target.parentElement.dataset.id;
      loadPost(postId);

        // 스크롤 추가
      formTitleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      const postId = e.target.parentElement.dataset.id;
      deletePost(postId);
    });
  });
}

// 게시물 불러오기
async function loadPost(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  const post = await response.json();

  document.getElementById("title").value = post.title;
  document.getElementById("content").value = post.content;
  postFormElement.dataset.id = post.id;
}

// 게시물 삭제
async function deletePost(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    fetchPosts();
  } else {
    alert("게시물 삭제에 실패하였습니다.");
  }
}

// 댓글 가져오기
async function fetchComments(postId) {
  const response = await fetch(`${COMMENTS_URL}?postId=${postId}`);
  const comments = await response.json();
  return comments;
}

// 댓글 입력 이벤트
function setCommentInputListeners() {
  const commentInputs = document.querySelectorAll(".comment-input");
  const commentForms = document.querySelectorAll(".comment-form");

  commentForms.forEach((commentForm, index) => {
    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const postId = commentForm.parentElement.parentElement.dataset.id;
      const commentText = commentInputs[index].value;

      const response = await fetch(COMMENTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: parseInt(postId), text: commentText }),
      });

      if (response.ok) {
        commentInputs[index].value = "";
        fetchPosts(); // refresh the comments
      } else {
        alert("댓글 입력에 실패하였습니다.");
      }
    });
  });
}

// 댓글 수정 및 삭제 버튼 이벤트 설정
function setEditAndDeleteCommentBtns() {
  const editCommentBtns = document.querySelectorAll(".edit-comment");
  const deleteCommentBtns = document.querySelectorAll(".delete-comment");

  editCommentBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const commentId = e.target.parentElement.dataset.id;
      const currentText = e.target.parentElement.querySelector("p").innerText;
      e.target.parentElement.innerHTML = `
          <input class="edit-comment-input" type="text" value="${currentText}" />
          <button onclick="updateComment(${commentId})">저장</button>
          <button onclick="cancelEditingComment(${commentId}, '${currentText}')">취소</button>
      `;
    });
  });

  deleteCommentBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const commentId = e.target.parentElement.dataset.id;
      deleteComment(commentId);
    });
  });
}

async function updateComment(commentId) {
  const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
  const updatedText = commentElement.querySelector('input').value;

  const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      text: updatedText,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  if (response.ok) {
    commentElement.innerHTML = `
        <p>${updatedText}</p>
        <button class="edit-comment">수정</button>
        <button class="delete-comment">삭제</button>
    `;
    setEditAndDeleteCommentBtns();
  } else {
    alert('댓글 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
}


async function deleteComment(commentId) {
  const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    fetchPosts();
  } else {
    alert("댓글 삭제에 실패하였습니다.");
  }
}

function cancelEditingComment(commentId, originalText) {
  const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
  commentElement.innerHTML = `
      <p>${originalText}</p>
      <button class="edit-comment">수정</button>
      <button class="delete-comment">삭제</button>
  `;
  setEditAndDeleteCommentBtns();
}
