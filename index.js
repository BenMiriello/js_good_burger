// document.addEventListener("DOMContentLoaded", () => {
//   //Implement Your Code Here
// })

const URL_PREFIX = "http://localhost:3000/burgers"

const burgerMenu = document.querySelector("#burger-menu")
const orderList = document.querySelector("#order-list")
const customForm = document.querySelector("#custom-burger")

fetch(URL_PREFIX)
.then(r => r.json())
.then(putBurgersOnMenu)

function putBurgersOnMenu(burgers){
  burgers.forEach(putOneBurgerOnMenu);
}

function putOneBurgerOnMenu(burger){
  const newDiv = document.createElement("div")
    newDiv.className = "burger_title"
    newDiv.innerText = burger.name
    const newImg = document.createElement("img")
      newImg.src = burger.image
    const newP = document.createElement("p")
      newP.className = "burger_description"
      newP.innerText = burger.description
    const newButton = document.createElement("button")
      newButton.className = "button"
      newButton.innerText = "Add to Order"
  newDiv.append(newImg,newP,newButton)
  burgerMenu.append(newDiv)

  newButton.addEventListener("click", () => {
    const newLi = document.createElement("li")
      newLi.innerText = burger.name
    orderList.append(newLi)
  })
}

customForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let customBurger = {}
  customBurger["name"] = e.target["name"].value
  customBurger["description"] = e.target["description"].value
  customBurger["image"] = e.target["url"].value
  
  fetch(URL_PREFIX, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: customBurger.name,
      description: customBurger.description,
      image: customBurger.image
    })
  })
  .then(r => r.json())
  .then(putOneBurgerOnMenu)
  
})

