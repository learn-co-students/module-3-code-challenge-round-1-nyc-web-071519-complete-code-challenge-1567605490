document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3359 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const commentForm = document.querySelector("#comment_form");

  const likeButton = document.querySelector("#like_button")

  function renderImage() {
    return fetch(imageURL)
    .then(response => response.json())
    .then(json => {
      console.log(JSON.stringify(json));
    })
    .catch(error => console.error(error))
  }
  image = renderImage();
  
  // document.querySelector("#name").innerText = image.name;
  // document.querySelector("#likes").innerText = image.like_count;
  // document.querySelector("#comments").innerText = image.comments;
  // debugger

  likeButton.addEventListener('click', function(event) {
    event.preventDefault()
    
    likes = document.querySelector("#likes")
    numLikes = parseInt(likes.innerText)
    numLikes++
    likes.innerText = numLikes
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(likes),
    }).then(response => response.json())
    .catch(error => console.error(error))
  })

  commentForm.addEventListener('submit', function(event) {
    event.preventDefault()

    commentList = document.querySelector("#comments")
    commentInput = document.querySelector("#comment_input")
    comment = document.createElement("li")
    commentContent = commentInput.value
    comment.innerText = commentContent
    commentList.appendChild(comment)
    commentInput.value = ""
    // debugger
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment),
    }).then(response => response.json())
    .catch(error => console.error(error))
  })
})
