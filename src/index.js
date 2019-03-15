const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
const addToyName = document.getElementsByName('name')[0]
const addToyImage = document.getElementsByName('image')[0]

let addToy = false
const toyURL = "http://localhost:3000/toys"

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    addToyForm.addEventListener('submit', (ev) => {
      ev.preventDefault()
      fetch(toyURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": `${addToyName.value}`,
          "image": `${addToyImage.value}`,
          "likes": 0
        })
      })
      .then(results => results.json())
      .then(json => {
        newJson = [json]
        addNewToy(newJson)
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})

fetch(toyURL)
.then(result => result.json())
.then(json => {
  addNewToy(json)
})

function addNewToy(json) {
  for (toy of json) {
    const div = document.createElement('div')
    div.setAttribute("class", "card")
    const h2 = document.createElement('h2')
    h2.innerText = toy.name
    const img = document.createElement('img')
    img.setAttribute("class", "toy-avatar")
    img.setAttribute("src", toy.image)
    const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`
    p.setAttribute("likes", `${toy.likes}`)
    const button = document.createElement('button')
    button.setAttribute("class", "like-btn")
    button.setAttribute('id', `${toy.id}`)
    button.innerText = "Like <3"
    toyCollection.appendChild(div)
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    button.addEventListener("click", () => {
      fetch(toyURL + `/${button.getAttribute('id')}`, {
        method: "PATCH",
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({"likes": `${(parseInt(p.getAttribute("likes")) + 1)}`})
        })
        .then(results => results.json())
        .then(json => {
          p.innerText = `${json.likes} Likes`
          p.setAttribute("likes", `${json.likes}`)
      })

    })
  }
}
