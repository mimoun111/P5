const section = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const errorMsg = document.getElementById("firstNameErrorMsg");
//stockage des  données dans localstorage nommé panier
let checkPanier = JSON.parse(localStorage.getItem("panier"));

// calcul du prix total et de la quantité total
const calculPrixTotal = () => {
  let prixTotal = 0;
  let totalProduit = 0;

  for (produit of checkPanier) {
    totalProduit += produit.quantity;
    prixTotal += produit.price * produit.quantity;
  }
  totalQuantity.innerText = totalProduit;
  totalPrice.innerText = prixTotal;
};

// ajout des element global du panier
const afficherProduit = () => {
  //tant qu'il y a un enfant dans l'objet section, on le supprime
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
  //si panier existant dans localstorage
  if (checkPanier) {
    //recuperation de l'index et de la valeur du tableau
    for (let [index, produit] of checkPanier.entries()) {
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
      // affichage des textes
      newH2.innerText = produit.name;
      newParaColor.innerText = produit.color;
      newParaPrice.innerText = produit.price + " euros";
      // création du bouton ajout de la quantité
      input.setAttribute("type", "number");
      input.classList.add("itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", produit.quantity);
      // création de la réaction au changement de la valeur
      input.addEventListener("change", (event) => {
        let targetValue = event.target.value;

        if (targetValue > 0) {
          produit.quantity = parseInt(targetValue);
          calculPrixTotal();
          localStorage.setItem("panier", JSON.stringify(checkPanier));
        } else {
          checkPanier.splice(index, 1);
          localStorage.setItem("panier", JSON.stringify(checkPanier));
          afficherProduit();
        }
      });

      divContentSettingsDelete.classList.add(
        "cart__item__content__settings__delete"
      );
      //affichage du bouton supprimer
      newParaDelete.classList.add("deleteItem");
      newParaDelete.innerText = "supprimer";
      //ajout d'une fontion qui supprime l'elemment du panier et du localstorage
      newParaDelete.addEventListener("click", () => {
        checkPanier.splice(index, 1);
        localStorage.setItem("panier", JSON.stringify(checkPanier));
        afficherProduit();
        calculPrixTotal();
      });

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

// exectution des fonction
afficherProduit();
calculPrixTotal();
