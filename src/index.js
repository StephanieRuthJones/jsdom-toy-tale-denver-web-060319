
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('.toy-collection')
let toyName = document.querySelector('#toy-name')
let toyImage = document.querySelector('#toy-image')
const addToyButton = document.querySelector('#add-toy')
let addToy = false


// YOUR CODE HERE
fetch('http://localhost:3000/toys')
  .then(function (response) {
    return response.json();
  })
  .then(json => renderToys(json))

let data = {
  "name": `${toyName.innerHTML}`,
  "image": `${toyImage.innerHTML}`,
  "likes": 0
}

function postToy() {
  fetch('http://localhost:3000/toys', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

addToyButton.addEventListener('click', function () {
  event.preventDefault()
  console.log("clicked")
  fetch('http://localhost:3000/toys', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
})



function renderToys(json) {
  const toyCollection = document.querySelector('#toy-collection')
  json.forEach(toy => {

    const card = document.createElement('div')
    card.className = 'card'
    toyCollection.appendChild(card)

    const h2 = document.createElement('h2')
    h2.innerHTML = `<h2>${toy.name}</h2>`
    card.appendChild(h2)

    const image = document.createElement('img')
    image.src = `${toy.image}`
    image.className = 'toy-avatar'
    card.appendChild(image)

    const likes = document.createElement('p')
    likes.innerHTML = `${toy.likes}`
    card.appendChild(likes)

    const likeButton = document.createElement('button')
    likeButton.innerHTML = 'Like'
    likeButton.className = 'like-btn'
    likeButton.id = `${toy.id}`
    card.appendChild(likeButton)

    likeButton.addEventListener('click', function () {
      console.log("like button clicked")
      currentLikeCount = likes.innerHTML
      currentLikeCount++
      console.log("new currentlikecount", currentLikeCount)
      likeData = {
        "likes": `${currentLikeCount}`
      }
      console.log("like data", likeData)
      let id = event.target.id
      console.log("id", id)
      patchRequest(likeData, id)


    })
    ///attempt
    function patchRequest(data, id) {
      return fetch(`http://localhost:3000/toys/${id}`, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'PATCH', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
        .then(response => response.json())
    }

  })
}



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
