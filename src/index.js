document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3356 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  


  // GET 'https://randopic.herokuapp.com/images/:id'




  fetch(imageURL, {method: "GET"})
    .then(resp => resp.json())
    .then(console.log("check that im here"))



//LIKE BUTTON

  let count = 0;
  let button = document.getElementById("like_button")
  let display = document.getElementById("likes")
    button.onclick = function(){
      count++
      display.innerHTML = count
      
      //SAVE TO THE BACKEND  (I FOLLOWED THE INSTRUCTIONS EXACTLY BUT WON'T WORK!!!!!!!!)
      fetch(likeURL, {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        likes: count
        })
      }) 
      .then(response => response.json())
    }


// ADD COMMENT CONTENT
  const list = document.getElementById('comments');
  const addForm = document.forms['comment_form'];

  addForm.addEventListener('submit', function(e){
    e.preventDefault();
  
    // create elements
    const value = addForm.querySelector('input[type="text"]').value;
    const li = document.createElement('li');
    const content = document.createElement('span');
  
    // add text content
    content.textContent = value;
    
    // add classes
    content.classList.add('name');
  
    // append to DOM
    li.appendChild(content);
    list.appendChild(li);
  

    //save to the Backend (I FOLLOWED THE INSTRUCTIONS EXACTLY BUT WON'T WORK!!!!!!!!)
    fetch(`https://randopic.herokuapp.com/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${image.id}`,
        content: `${e.target.content.value}`,
      })
    })
      .then(resp => resp.json())
  });




})


