// Use the data from data.js
let comments = data.comments;
const currentUser = data.currentUser;

let commentToDelete = null;

// DOM elements
const commentsContainer = document.getElementById('comments-container');
const newCommentText = document.getElementById('new-comment-text');
const sendCommentBtn = document.getElementById('send-comment');
const modalOverlay = document.getElementById('modal-overlay');
const cancelBtn = modalOverlay.querySelector('.cancel-btn');
const deleteBtn = modalOverlay.querySelector('.delete-btn');

// Initialize
function init() {
  renderComments();
  setupEventListeners();
}

// Render all comments
function renderComments() {
  commentsContainer.innerHTML = '';
  comments.forEach(comment => {
    const commentElement = createCommentElement(comment, false);
    commentsContainer.appendChild(commentElement);
  });
}

// Create comment container HTML element
function createCommentElement(comment, isReply) {
  const div = document.createElement('div');
  div.className = `comment-card ${isReply ? 'reply' : ''}`;
  div.dataset.id = comment.id;
  
  const isCurrentUser = comment.user.username === currentUser.username;
  
  // Use .png image from the image object
  const userImage = comment.user.image.png;
  
  div.innerHTML = `
    <div class="comment-header">
      <img src="${userImage}" alt="${comment.user.username}" class="avatar">
      <span class="username">${comment.user.username} ${isCurrentUser ? '<span class="you-tag">you</span>' : ''}</span>
      <span class="created-at">${comment.createdAt}</span>
    </div>
    
    <div class="voting">
      <button class="vote-btn increase">
        <img src="./images/icon-plus.svg" alt="Plus">
      </button>
      <span class="vote-count">${comment.score}</span>
      <button class="vote-btn decrease">
        <img src="./images/icon-minus.svg" alt="Minus">
      </button>
    </div>
    
    <div class="comment-content">
      <div class="comment-text">
        ${comment.replyingTo ? `<span class="replying-to">@${comment.replyingTo}</span> ` : ''}
        <span class="comment-content-text">${comment.content}</span>
      </div>
      
      <div class="comment-actions">
        ${isCurrentUser ? `
          <button class="action-btn delete-btn">
            <img src="./images/icon-delete.svg" alt="Delete"> Delete
          </button>
          <button class="action-btn edit-btn">
            <img src="./images/icon-edit.svg" alt="Edit"> Edit
          </button>
        ` : `
          <button class="action-btn reply-btn">
            <img src="./images/icon-reply.svg" alt="Reply"> Reply
          </button>
        `}
      </div>
      
      <div class="edit-form">
        <textarea class="edit-textarea">${comment.content}</textarea>
        <button class="update-btn">UPDATE</button>
      </div>
      
      <div class="reply-form">
        <img class="current-user-avatar" src="${currentUser.image.png}" alt="Your avatar">
        <textarea placeholder="Add a reply..." class="reply-textarea"></textarea>
        <button class="send-reply-btn">REPLY</button>
      </div>
    </div>
  `;
  
  // Add replies 
  if (comment.replies && comment.replies.length > 0) {
    const repliesContainer = document.createElement('div');
    repliesContainer.className = 'replies-container';
    comment.replies.forEach(reply => {
      
      if (!reply.replies) {
        reply.replies = [];
      }
      repliesContainer.appendChild(createCommentElement(reply, true));
    });
    div.appendChild(repliesContainer);
  }
  
  return div;
}

// Setup event listeners
function setupEventListeners() {
  sendCommentBtn.addEventListener('click', addNewComment);
  
  cancelBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    commentToDelete = null;
  });
  
  deleteBtn.addEventListener('click', () => {
    if (commentToDelete) {
      deleteCommentById(commentToDelete);
      renderComments();
      modalOverlay.style.display = 'none';
      commentToDelete = null;
    }
  });
  
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
      commentToDelete = null;
    }
  });
  
  commentsContainer.addEventListener('click', (e) => {
    const commentCard = e.target.closest('.comment-card');
    if (!commentCard) return;
    
    const commentId = parseInt(commentCard.dataset.id);
    
    if (e.target.closest('.increase')) {
      updateScore(commentId, 1);
    } else if (e.target.closest('.decrease')) {
      updateScore(commentId, -1);
    } else if (e.target.closest('.reply-btn')) {
      const replyForm = commentCard.querySelector('.reply-form');
      replyForm.classList.toggle('active');
      if (replyForm.classList.contains('active')) {
        replyForm.querySelector('.reply-textarea').focus();
      }
    } else if (e.target.closest('.delete-btn')) {
      commentToDelete = commentId;
      modalOverlay.style.display = 'flex';
    } else if (e.target.closest('.edit-btn')) {
      const editForm = commentCard.querySelector('.edit-form');
      const commentText = commentCard.querySelector('.comment-content-text');
      editForm.style.display = editForm.style.display === 'block' ? 'none' : 'block';
      commentText.style.display = editForm.style.display === 'block' ? 'none' : 'block';
    } else if (e.target.closest('.update-btn')) {
      const editForm = commentCard.querySelector('.edit-form');
      const textarea = editForm.querySelector('.edit-textarea');
      const content = textarea.value.trim();
      if (content) {
        updateCommentContent(commentId, content);
        renderComments();
      }
    } else if (e.target.closest('.send-reply-btn')) {
      const replyForm = commentCard.querySelector('.reply-form');
      const textarea = replyForm.querySelector('.reply-textarea');
      const content = textarea.value.trim();
      if (content) {
        addReply(commentId, content);
        renderComments();
      }
    }
  });
}

// Add new comment 
function addNewComment() {
  const content = newCommentText.value.trim();
  if (!content) return;
  
  const newComment = {
    id: Date.now(),
    content,
    createdAt: "Just now",
    score: 0,
    user: {
      image: currentUser.image,
      username: currentUser.username
    },
    replies: []
  };
  
  comments.push(newComment);
  renderComments();
  newCommentText.value = '';
}

// Update score
function updateScore(commentId, change) {
  const comment = findCommentById(commentId);
  if (comment) {
    comment.score += change;
    renderComments();
  }
}

// Find comment by ID
function findCommentById(id, commentArray = comments) {
  for (const comment of commentArray) {
    if (comment.id === id) return comment;
    if (comment.replies && comment.replies.length > 0) {
      const found = findCommentById(id, comment.replies);
      if (found) return found;
    }
  }
  return null;
}

// Delete comment
function deleteCommentById(id, commentArray = comments) {
  for (let i = 0; i < commentArray.length; i++) {
    if (commentArray[i].id === id) {
      commentArray.splice(i, 1);
      return true;
    }
    if (commentArray[i].replies && commentArray[i].replies.length > 0) {
      if (deleteCommentById(id, commentArray[i].replies)) return true;
    }
  }
  return false;
}

// Update comment content
function updateCommentContent(id, newContent) {
  const comment = findCommentById(id);
  if (comment) {
    comment.content = newContent;
  }
}

// Add reply 
function addReply(parentId, content) {
  const parentComment = findCommentById(parentId);
  if (parentComment) {
    const reply = {
      id: Date.now(),
      content,
      createdAt: "Just now",
      score: 0,
      replyingTo: parentComment.user.username,
      user: {
        image: currentUser.image,
        username: currentUser.username
      },
      replies: []
    };
    
    if (!parentComment.replies) {
      parentComment.replies = [];
    }
    
    parentComment.replies.push(reply);
  }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);