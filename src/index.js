document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3355

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.querySelector("#image")
  const title = document.querySelector("#name")
  const likes = document.querySelector("#likes")
  const commentsList = document.querySelector("#comments")
  const likeButton = document.querySelector("#like_button")
  const commentField = document.querySelector("#comment_form")


  fetch(imageURL)
  .then(resp => resp.json())
  .then(data => {
    image.src = data.url
    title.innerText = data.name
    likes.innerText = data.like_count
    data.comments.forEach(comment => {
      commentsList.insertAdjacentHTML('beforeend', `<li>${comment.content}</li>`)
    })
  })

  likeButton.addEventListener('click', e =>{
    let numLikes = likes.innerHTML
    numLikes ++;
    likes.innerHTML = numLikes
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${imageId}`
      })
    })
  })

  commentField.addEventListener('submit', e =>{
    e.preventDefault()
    commentsList.insertAdjacentHTML('beforeend', `<li>${e.target.comment.value}</li>`)
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${imageId}`,
        content: e.target.comment.value
      })
    })

  })
})
