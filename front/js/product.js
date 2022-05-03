const select = document.getElementById("colors");
// dataProduct egal au données recuperer par l'url de fetch
let dataProduct = {};

// récupération de l'id du produit
let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");

// récupération des donnés
const apiFetch = () => {
  // va chercher la reponse que te donne cette url
  fetch(`http://localhost:3000/api/products/${idProduct}`)
    //  ensuite si les données  sont ok retourne les données en format javascript
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    // ensuite avec les donnée de la reponse
    .then(function (data) {
      dataProduct = data;
      // recupere les id  du html
      const itemImg = document.getElementsByClassName("item__img");
      const title = document.getElementById("title");
      const paragDescription = document.getElementById("description");
      const price = document.getElementById("price");
      // ajout de l'image et Alt
      const newItemImg = document.createElement("img");
      newItemImg.setAttribute("src", data.imageUrl);
      newItemImg.setAttribute("alt", data.altTxt);
      itemImg[0].appendChild(newItemImg);

      // ajout du prix;
      price.innerHTML = data.price;
      //ajout titre
      title.innerHTML = data.name;

      //ajout description
      paragDescription.innerHTML = data.description;

      //couleur
      for (color of data.colors) {
        const itemColor = document.createElement("option");
        itemColor.innerHTML = color;
        itemColor.setAttribute("value", color);
        select.appendChild(itemColor);
      }
    })
    //en cas error afficher une alerte
    .catch(function (err) {
      alert("Une erreur est survenue");
    });
};

// recuperation du bouton ajouter au panier
const button = document.getElementById("addToCart");
// ajout d'un evenement au click sur le bouton
button.addEventListener("click", function () {
  // recuperation de produit quantité
  const quantity = document.getElementById("quantity");
  // configuration du localStorage
  let panier = JSON.parse(localStorage.getItem("panier"));
  // configuration de la variable qui sera changer si une condition est rempli
  let productInCart = false;
  // si la quantité saisie est egal a 0 ou que la couleur selectionner n'est pas selectionner
  if (quantity.value == 0 || select.value == "") {
    alert("veuillez selectionner une couleur et une quantité");
    // si le panier n'est pas existant creer un tableau dans lequel tu ajoutera le produit
  } else if (!panier) {
    const produitTableau = [];
    const produit = {
      id: dataProduct._id,
      color: select.value,
      quantity: parseInt(quantity.value),
    };
    produitTableau.push(produit);
    localStorage.setItem("panier", JSON.stringify(produitTableau));
    alert("vous avez ajouter un produits au panier");
    // si le panier existe
  } else {
    // pour chaque produit de mon panier
    for (let produit of panier) {
      // si l'id du produit est egal a l'id du produit de l'api et que la couleur du produit est egal a couleur selectionner
      if (produit.id === dataProduct._id && produit.color === select.value) {
        // change le produit en true
        productInCart = true;
        // converti la valeur de chaine de caratere en number
        produit.quantity = parseInt(produit.quantity);
        // ajoute la quantité selectionner
        produit.quantity += parseInt(quantity.value);
        alert("vous avez ajouter un produits au panier");
      }
      break;
    }
    // si le produit n'est pas présent dans le panier creer un nouveau produit dans le panier
    if (productInCart === false) {
      const produit = {
        id: dataProduct._id,
        color: select.value,
        quantity: parseInt(quantity.value),
      };
      panier.push(produit);
      alert("vous avez ajouter un produits au panier");
    }
    localStorage.setItem("panier", JSON.stringify(panier));
  }
});

//execution de la fonction
apiFetch();
