
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('.toy-collection')
let addToy = false

// YOUR CODE HERE
fetch('http://localhost:3000/toys')
  .then(function (response) {
    return response.json();
  })
  .then(json => renderToys(json))


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

    const button = document.createElement('button')
    button.innerHTML = 'Like'
    button.className = 'like-btn'
    card.appendChild(button)

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
