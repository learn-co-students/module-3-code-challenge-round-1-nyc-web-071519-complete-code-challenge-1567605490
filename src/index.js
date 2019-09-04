document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3360 //Enter the id from the fetched image here

  const imageURL = `http://randopic.herokuapp.com/images/3360`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.querySelector('#image_card')
  const container = document.querySelector(".container")

  function loadImage(url) {
    const image = new Image(200, 200);
    image.addEventListener("load",
      () => container.prepend(image)
    );

    image.addEventListener("error", () => {
      const errMsg = document.createElement("output");
      errMsg.value = `Error loading image at ${url}`;
      container.append(errMsg);
    });

    image.crossOrigin = "anonymous";
    image.alt = "";
    image.src = url;
  }

  loadImage(imageURL);


  fetch('http://randopic.herokuapp.com/images/3360')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      imageCard.insertAdjacentHTML('beforebegin', `<img src='http://randopic.herokuapp.com/images/3360' id="image" data-id=""/>
                             <h4 id="name">Info Hash</h4>`)

                                                             
    })


})
