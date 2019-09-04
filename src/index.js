document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3357 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`




  let imageData = []

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(function (response) {
    return response.json()
  })
  .then(imgData => {
    image = imgData
    console.log(image)

    // add image to page
    // let source = document.getElementById("image").src
    // source.innerHTML = `<img src=${image.url}>`

  })


  // likes
  document.getElementById("like_button").addEventListener("click", function(){
    console.log("clicked")

    // get likes
    const likeSpan = document.querySelector("#likes")

    let numLikes = parseInt(likeSpan.innerText)

    // debugger
    numLikes++
    likeSpan.innerText = numLikes


    // post
     


  });

  // comments
  document.getElementById("comment_form").addEventListener("submit", e => {
    e.preventDefault()

    const content = e.target.comment.value

    const list = document.querySelector("#comments")
    list.insertAdjacentHTML("beforeend", `<li>${content}</li>`)
    

    // post
  })
  

})

