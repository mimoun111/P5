const itemImg = document.getElementsByClassName("item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const p = document.getElementById("description");
const select = document.getElementById("colors");
const button = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");
let dataProduct = {};

var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");

// récupération des donnés
const apiFetch = () => {
  fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      dataProduct = data;
      console.log(data);

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
      p.innerHTML = data.description;

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

button.addEventListener("click", function () {
  let checkPanier = JSON.parse(localStorage.getItem("panier"));
  let productInCart = false;

  if (quantity.value == 0 || select.value == "") {
    alert("veuillez selectionner une couleur et une quantité");
  } else if (!checkPanier) {
    const produitTableau = [];
    const produit = {
      id: dataProduct._id,
      color: select.value,
      quantity: parseInt(quantity.value),
      name: dataProduct.name,
      description: dataProduct.description,
      image: dataProduct.imageUrl,
      altTxt: dataProduct.altTxt,
      price: dataProduct.price,
    };
    produitTableau.push(produit);
    alert("vous avez ajouter un produits au panier");
    localStorage.setItem("panier", JSON.stringify(produitTableau));
  } else {
    for (let element of checkPanier) {
      if (element.id === dataProduct._id && element.color === select.value) {
        productInCart = true;
        element.quantity = parseInt(element.quantity);
        element.quantity += parseInt(quantity.value);
        alert("vous avez ajouter un produits au panier");
      }
    }
    if (productInCart === false) {
      const produit = {
        id: dataProduct._id,
        color: select.value,
        quantity: parseInt(quantity.value),
        name: dataProduct.name,
        description: dataProduct.description,
        image: dataProduct.imageUrl,
        altTxt: dataProduct.altTxt,
        price: dataProduct.price,
      };
      checkPanier.push(produit);
      alert("vous avez ajouter un produits au panier");
    }
    localStorage.setItem("panier", JSON.stringify(checkPanier));
  }
});

//execution de la fonction
apiFetch();
