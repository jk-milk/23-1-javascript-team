// JSON 서버 주소
const BASE_URL = "http://localhost:3000/posts";
const COMMENTS_URL = "http://localhost:3000/comments";

// HTML 요소 선택자
const postFormElement = document.getElementById("post-form");
const postListElement = document.getElementById("post-list");
const formContainerElement = document.getElementById("form-container");
const newPostBtn = document.getElementById("new-post");
const cancelBtn = document.getElementById("cancel");

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
                     <button class="edit-comment" onclick="displayEditCommentUI(${comment.id})">수정</button>
                     <button class="delete-comment" onclick="deleteComment(${comment.id})">삭제</button>
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
  setUpdateCommentBtn();
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
      const postId = e.target.parentElement.dataset.id;
      loadPost(postId);
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
    editBtn.addEventListener("click", (e) => {
      const commentId = e.target.parentElement.parentElement.dataset.id;
      loadComment(commentId);
    });
  });

  deleteCommentBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      const commentId = e.target.parentElement.parentElement.dataset.id;
      deleteComment(commentId);
    });
  });
}

// 댓글 수정 버튼 이벤트 리스너
function setUpdateCommentBtn() {
  const updateCommentBtn = document.getElementById("update-comment");

  updateCommentBtn.addEventListener("click", () => {
    const commentId = updateCommentBtn.dataset.id;
    updateComment(commentId);
  });
}

//댓글 불러오기, 수정 및 삭제 함수
async function loadComment(commentId) {
  const response = await fetch(`${COMMENTS_URL}/${commentId}`);
  const comment = await response.json();

  // 댓글 수정 UI 및 로직 (필요에 따라 코드를 수정하십시오)
  displayEditCommentUI(commentId);
}

async function updateComment(commentId) {
  // 댓글 수정 입력창에서 가져온 정보
  const newText = document.querySelector(`.comment[data-id="${commentId}"] .edit-comment-input`).value;

  try {
    const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    });

    if (!response.ok) {
      throw new Error("댓글 수정 실패");
    }

    fetchPosts();
  } catch (error) {
    console.error(error);
    alert("댓글 수정 실패");
  }
}

async function deleteComment(commentId) {
    const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
    commentElement.remove();

    try {
      const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("댓글 삭제 실패");
      }

      fetchPosts(); // refresh the comments
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
}

// 댓글 수정 UI 생성 및 출력하는 함수
function displayEditCommentUI(commentId) {
  const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
  const commentText = commentElement.querySelector("p").innerText;

  const editCommentForm = document.createElement("div");
  editCommentForm.className = "edit-comment-form";
  editCommentForm.innerHTML = `
    <input class="edit-comment-input" type="text" value="${commentText}" />
    <button onclick="submitEditedComment(${commentId})">저장</button>
    <button onclick="cancelEditingComment(${commentId})">취소</button>
  `;

  commentElement.appendChild(editCommentForm);
}

function submitEditedComment(commentId) {
  updateComment(commentId)
  cancelEditingComment(commentId);
}

function cancelEditingComment(commentId) {
  const editCommentForm = document.querySelector(`.comment[data-id="${commentId}"] .edit-comment-form`);
  editCommentForm.remove();
}