document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 3358;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  let imagetag = document.querySelector("#image");
  let likeButton = document.querySelector("#like_button");
  let startLikes = document.querySelector("#likes");

  fetch(imageURL).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      imagetag.src = data.url;
      
      let imgTitle = document.querySelector("#name");
      let comments = document.querySelector("#comments");
      let startcomments = data.comments.forEach(comment => {
        comments.innerHTML += `<li>${comment.content}</li>`;
      });

      startLikes.innerText = data.like_count;
      imgTitle.innerText = data.name;
      debugger;
    });
  });


 likeButton.addEventListener("click", function(event){
  startLikes.innerText = parseInt(startLikes.innerText) +1
const datasub = {
  like_count: `${startLikes.innerText}` 
}
	fetch(likeURL, {
			method: 'PATCH',
			body: JSON.stringify(datasub),
			headers: {
			'Content-Type': 'application/json'
			}
			})
			.then(response => response.json()).then(data => {
			console.log('this is your data:', data);
		
			});

 })




});
