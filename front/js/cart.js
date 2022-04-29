const section = document.getElementById("cart__items");
const totelQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const errorMsg = document.getElementById("firstNameErrorMsg");

let checkPanier = JSON.parse(localStorage.getItem("panier"));

const afficherProduit = () => {
  if (checkPanier) {
    for (let produit of checkPanier) {
      console.log(produit);
      //recupération des element du DOM
      const newArticle = document.createElement("article");
      const divImg = document.createElement("div");
      const newImg = document.createElement("img");
      const divContent = document.createElement("div");
      const divContentDescription = document.createElement("div");
      const newH2 = document.createElement("h2");
      const newParaColor = document.createElement("p");
      const newParaPrice = document.createElement("p");
      const divContentSettings = document.createElement("div");
      const divContentSettingsQuantity = document.createElement("div");
      const newParaQuantity = document.createElement("p");
      const input = document.createElement("input");
      const divContentSettingsDelete = document.createElement("div");
      const newParaDelete = document.createElement("p");

      //assignation des attribut aux elements
      newArticle.classList.add("cart__item");
      newArticle.setAttribute("data-id", produit.id);
      newArticle.setAttribute("data-color", produit.color);

      divImg.classList.add("cart__item__img");

      newImg.setAttribute("src", produit.image);
      newImg.setAttribute("alt", produit.altTxt);

      divContent.classList.add("cart__item__content");
      divContentDescription.classList.add("cart__item__content__description");
      divContentSettings.classList.add("cart__item__content__settings");
      divContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
      );

      newH2.innerText = produit.name;
      newParaColor.innerText = produit.color;
      newParaPrice.innerText = produit.price + " euros";

      input.setAttribute("type", " number");
      input.classList.add("itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", produit.quantity);

      divContentSettingsDelete.classList.add(
        "cart__item__content__settings__delete"
      );

      newParaDelete.classList.add("deleteItem");

      //assignation des enfants aux elements
      section.appendChild(newArticle);
      newArticle.appendChild(divImg);
      divImg.appendChild(newImg);
      newArticle.appendChild(divContent);
      divContent.appendChild(divContentDescription);
      divContentDescription.appendChild(newH2);
      divContentDescription.appendChild(newParaColor);
      divContentDescription.appendChild(newParaPrice);
      divContent.appendChild(divContentSettings);
      divContentSettings.appendChild(divContentSettingsQuantity);
      divContentSettingsQuantity.appendChild(newParaQuantity);
      divContentSettingsQuantity.appendChild(input);
      divContentSettings.appendChild(divContentSettingsDelete);
      divContentSettingsDelete.appendChild(newParaDelete);
    }
  }
};

afficherProduit();
