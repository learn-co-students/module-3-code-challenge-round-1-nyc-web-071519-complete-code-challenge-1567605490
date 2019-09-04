console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

const imageId = 3363

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const pic = document.getElementById("image")
const name = document.getElementById("name")
const likes = document.getElementById("likes")
const comments = document.getElementById("comments")

fetch(imageURL)
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  myJson.comments.forEach(function(c){
    commentHTML += `<li>${c.content}<button data-action="delete">X</button></li>`
  })
  comments.innerHTML = commentHTML
});


fetch(imageURL)
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  console.log(JSON.stringify(myJson));
  //let data = myJson
  console.log(myJson)
  pic.src = myJson.url
  name.innerText = myJson.name
  likes.innerText = myJson.like_count
  
  let commentHTML = ""
  myJson.comments.forEach(function(c){
    commentHTML += `<li>${c.content}<button data-action="delete">X</button></li>`
  })
  comments.innerHTML = commentHTML
});

// ** LIKE FEATURE ** //

const likeButton = document.getElementById("like_button")
// FRONTEND
// likeButtom.addEventListener('click', (e) => {
//   let currentLikes = parseInt(likes.innerText)
//   likes.innerText = currentLikes + 1 
// })


// BACKEND
likeButton.addEventListener('click', (e) => {
  let currentLikes = parseInt(likes.innerText) + 1
  const data = {
    image_id: imageId,
    //like_count: currentLikes
  }

  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)      
  })
  
  likes.innerText = currentLikes
})

// ** COMMENT FEATURE ** //
const commentForm = document.getElementById("comment_form")

commentForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let comment = commentForm.comment.value
  const data = {
    image_id: imageId,
    content: comment
  }

  fetch(commentsURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)      
  })

  console.log("hi")
  // let commentHTML = `<li>${comment}</li>`
  comments.insertAdjacentHTML("beforeend", `<li>${comment}<button data-action="delete">X</button></li>`)
})

// // ** DELETE COMMENT FEATURE ** //
// document.addEventListener('click', (e) => {
//   if (e.target.dataset.action === "delete") {
//     let listItem = e.target.closest("li")
//     console.log(listItem.innerText.slice(0, -1))

//     fetch(imageURL)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       debugger
//       console.log(myJson.comments.find(function(c){
//         debuggerm
//         c.content === listItem.innerText.slice(0, -1)}))
//     })

  //   const data = {
  //     // image_id: imageId,
  //     // content: comment
  //   }
  //   listItem.remove()
  //   //find comment id

  //   fetch(commentsURL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify(data)      
  // })
  // }
  // let comment = commentForm.comment.value
  // const data = {
  //   image_id: imageId,
  //   content: comment
  // }

  // fetch(commentsURL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify(data)      
  // })

  // console.log("hi")
  // // let commentHTML = `<li>${comment}</li>`
  // comments.insertAdjacentHTML("beforeend", `<li>${comment}</li><button id="delete">X</button>`)
// }})