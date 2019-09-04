document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta') //magenta was a bold choice

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
      commentsList.insertAdjacentHTML('beforeend', `<li data-id=${comment.id}>${comment.content} <button data-comment-id=${comment.id}>delete</button></li>`)
      //for deleting
      let button = commentsList.querySelector(`button[data-comment-id ="${comment.id}"]`)
      button.addEventListener('click', e =>{
        fetch(`https://randopic.herokuapp.com/comments/${comment.id}`,{
          method: 'DELETE'
        })
        .then(button.parentElement.remove())
      })
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
    let tempId = `${e.target.comment.value}`; // needed for deleting before refresh
    let respId = null // needed for deleting before refresh
    e.preventDefault()
    commentsList.insertAdjacentHTML('beforeend', `<li>${e.target.comment.value} <button data-temp-id='${tempId}'>delete</button></li>`)
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
    .then(resp => resp.json())
    .then(data => {
      respId = data.id
      e.target.comment.value = ''
    }).then(() =>{
      // for deleting before refresh
      let button = commentsList.querySelector(`button[data-temp-id="${tempId}"]`)
      button.addEventListener('click', event =>{
        fetch(`https://randopic.herokuapp.com/comments/${respId}`,{
          method: 'DELETE'
        })
        .then(button.parentElement.remove())
      })
    })
  })
})
