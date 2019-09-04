document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3362 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });


fetch(`https://randopic.herokuapp.com/images/${imageId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'imageId' : 3362
    })
      .then(resp => resp.json())
})

// $(".like_button button").on("click", function() {
//   var $count = $(this).parent().find('.count');
//   $count.html($count.html() * 1 + 1);
// });

// <div class="like_button">
//   <button>Like</button>
//   <span class="count">0</span>
// </div>
})

