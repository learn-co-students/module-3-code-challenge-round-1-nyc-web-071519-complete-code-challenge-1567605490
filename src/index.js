document.addEventListener("DOMContentLoaded", init);
const commentsContainer = document.getElementById("comments-container");
const formContainer = document.getElementById("comment_form");
const container = document.getElementById("container");

function init() {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");
  let imageId = 1; //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  //
  fetchImage();
  getComments();
  //
}

// EVENT LISTENER COMMENTS
container.addEventListener("submit", e => {
  e.preventDefault();
  let field = document.querySelector("form").children[0];
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.insertAdjacentHTML("beforeend", `<li>${field.value}</li>`);
  let comment = {
    image_id: e.target.id,
    content: field.value
  };
  debugger;

  fetch(`http://localhost:3000/images/${e.target.id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(res => getComments(res));
});

// EVENT LISTENER LIKES

// container.addEventListener("click", e => {
//   e.preventDefault();

//   let likesContainer = document.getElementById("likes");
//   let likes = likesContainer.innerText;
//   likes = parseInt(likes);
//   switch (e.target.dataset.action) {
//     case "like":
//       likes_count = likes_count += 1;
//       let image = {
//         image_id: e.target.id
//       };
//       fetch("http://localhost:3000/likes", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(image)
//       })
//         .then(res => res.json())
//         .then(res => res);
//       break;
//     default:
//       break;
//   }
// });

// HELPER FUNCTIONS
function fetchImage() {
  fetch("https://randopic.herokuapp.com/images/3361")
    .then(resp => resp.json())
    .then(data => {
      container.innerHTML = `
        <div id="image_card" class="card col-md-4">
          <img src=${data.url} id="image" data-id="${data.id}"/>
          <h4 id="name">${data.name}</h4>
          <span>Likes:
            <span id="likes">${data.like_count}</span>
          </span>
          <button id="like_button" data-action="like" >Like</button>
          <form id="comment_form" data-id=${data.id}>
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <div id="comments-container">
          <h5>Comments:</h5>
          
          </div>
            
        </div>
      `;
    });
}

function getComments() {
  fetch("https://randopic.herokuapp.com/images/3361")
    .then(resp => resp.json())
    .then(data => {
      data.comments.forEach(comment => {
        str = `
        <li id="comment-li" data-id=${comment.id}>${comment.content}</li>
        `;
        const commentsContainer = document.getElementById("comments-container");
        commentsContainer.insertAdjacentHTML("beforeend", str);
      });
    });
}
