let itemsInStock = [];
let shopList = [];

const containerItems = document.querySelector(".container");
const ul = document.querySelector("ul");
fetch("./data.json")
  .then((data) => data.json())
  .then((obj) => obj.data)
  .then((data) => {
    itemsInStock = data.filter((item) => item.stock == true);
    itemsInStock.map((item) => {
      // CREATING DOM CARD FOR EVERY ITEM

      const cart = document.createElement("div");
      cart.classList.add("cart");

      const title = document.createElement("h2");
      title.textContent = item.title;

      const img = new Image();
      img.src = item.image;
      img.alt = item.title;

      const price = document.createElement("div");
      price.textContent = item.price;

      const decrementBtn = document.createElement("span");
      decrementBtn.classList.add("decrement");
      decrementBtn.textContent = "-";

      let counter = 1;

      const counterDOMElement = document.createElement("span");
      counterDOMElement.textContent = counter;

      const incrementBtn = document.createElement("span");
      incrementBtn.classList.add("increment");
      incrementBtn.textContent = "+";

      const addBtn = document.createElement("button");
      addBtn.textContent = "Add";

      // GIVING FUNCTIONALITY TO DECREMENT & INCREMENT BUTTONS

      decrementBtn.addEventListener("click", () => {
        if (counter) {
          counter -= 1;
        }
        counterDOMElement.textContent = counter;
      });

      incrementBtn.addEventListener("click", () => {
        counter += 1;
        counterDOMElement.textContent = counter;
      });

      // GIVE ADD-BUTTON FUNCTIONALITY

      addBtn.addEventListener("click", () => {
        console.log(item.title, counter);
        const li = document.createElement("li");
        li.textContent = `${item.title} x ${counter}`;

        const shopListItem = {
          id: item.id,
          title: item.title,
          count: counter,
        };

        // MAKING LOGIC FOR SHOPLIST (GONE WRONG)

        if (shopList.length < 1) {
          shopList.push(shopListItem);
        } else {
          shopList.map((listedItem) => {
            if (listedItem.id === shopListItem.id) {
              listedItem.count = shopListItem.count;
              return;
            } else {
              shopList.push(shopListItem);
            }
          });
        }

        console.log(shopList);
        ul.append(li);
      });

      cart.append(
        title,
        img,
        price,
        decrementBtn,
        counterDOMElement,
        incrementBtn,
        addBtn
      );

      containerItems.appendChild(cart);
    });
  });
