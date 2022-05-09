// récupération des id dans le DOM
const section = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const order = document.getElementById("order");

// récupération des error msg
const errorMsgFirstName = document.getElementById("firstNameErrorMsg");
const errorMsgLastName = document.getElementById("lastNameErrorMsg");
const errorMsgAdresse = document.getElementById("addressErrorMsg");
const errorMsgCity = document.getElementById("cityErrorMsg");
const errorMsgEmail = document.getElementById("emailErrorMsg");

// récuupération des champs de saisie
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAdresse = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

// variable boolean pour la validaton des champs saisie par l'utilisateur
let prenom = false;
let nom = false;
let adresse = true;
let ville = false;
let email = false;

//stockage des  données dans localstorage nommé panier
let localStoragePanier = JSON.parse(localStorage.getItem("panier"));
let apiTableau = [];

// recuperation dynamique des valeur du produit de l'api
const recuperationValeurProduit = (id) => {
  return apiTableau.find((element) => element._id === id);
};
// calcul du prix total et de la quantité total
const calculPrixTotal = () => {
  let prixTotal = 0;
  let totalProduit = 0;
  // si panier existe
  if (localStoragePanier) {
    // pour chaque produit du panier
    for (produit of localStoragePanier) {
      if (produit.quantity <= 99) {
        // ajoute la quantité de produit au total de produit
        totalProduit += produit.quantity;
        // multiplie le prix du produit  par la quantité
        prixTotal +=
          recuperationValeurProduit(produit.id).price * produit.quantity;
      }
    }
    // achicher le resultat
    totalQuantity.innerText = totalProduit;
    totalPrice.innerText = prixTotal;
  }
};
// requete api
const apiFetch = () => {
  //lien pour requete à l'API
  fetch("http://localhost:3000/api/products/")
    //convertisseur de json en javascript
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    //recuperation des donné
    .then(function (data) {
      apiTableau = data;
      afficherProduit();
      calculPrixTotal();
    })
    //en cas error afficher une alerte
    .catch(function (err) {
      alert("Une erreur est survenue api");
    });
};

// ajout des element global du panier
const afficherProduit = () => {
  //tant qu'il y a un enfant dans l'objet section, on le supprime
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
  //si le  panier est existant dans localstorage
  if (localStoragePanier) {
    //recuperation de l'index et de la valeur du tableau
    for (let [index, produit] of localStoragePanier.entries()) {
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

      newImg.setAttribute(
        "src",
        recuperationValeurProduit(produit.id).imageUrl
      );
      newImg.setAttribute("alt", recuperationValeurProduit(produit.id).altTxt);

      divContent.classList.add("cart__item__content");
      divContentDescription.classList.add("cart__item__content__description");
      divContentSettings.classList.add("cart__item__content__settings");
      divContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
      );
      // affichage des textes
      newH2.innerText = recuperationValeurProduit(produit.id).name;
      newParaColor.innerText = produit.color;
      newParaPrice.innerText =
        recuperationValeurProduit(produit.id).price + " euros";
      // création du bouton ajout de la quantité
      input.setAttribute("type", "number");
      input.classList.add("itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "99");
      input.setAttribute("value", produit.quantity);

      // création de la réaction au changement de la valeur
      input.addEventListener("change", (event) => {
        let targetValue = event.target.value;
        // si la valeur est entre 0 et 100
        if (targetValue > 0 && targetValue < 100) {
          // recalcul le prixtotal et met a jour le local storage
          produit.quantity = parseInt(targetValue);
          calculPrixTotal();
          localStorage.setItem("panier", JSON.stringify(localStoragePanier));
          // sinon si la quantité est supérieurou egale a 100
        } else if (targetValue >= 100) {
          // change la valeur sur 99 et alert l'utilisateur
          input.value = 99;
          produit.quantity = 99;
          localStorage.setItem("panier", JSON.stringify(localStoragePanier));
          calculPrixTotal();
          alert("veuillez a choisir une quantité inferieur a 100 ");
          // sinon suprime le produit
        } else {
          localStoragePanier.splice(index, 1);
          localStorage.setItem("panier", JSON.stringify(localStoragePanier));
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
        localStoragePanier.splice(index, 1);
        localStorage.setItem("panier", JSON.stringify(localStoragePanier));
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
apiFetch();

// creation des fonction permettant de verifier les valeur saisie par l'utilisateur
const verificationFirstName = () => {
  // si la valeur saisie par l'utilisateur est valable par rapport a la fonction validateFirstName converti la variable en true
  if (validateFirstName(inputFirstName.value) == true) {
    errorMsgFirstName.innerText = "";
    prenom = true;
    // sinon converti la variable en false et affiche error msg
  } else {
    prenom = false;
    errorMsgFirstName.innerText = "il y a une erreur dans la saisie du prénom";
  }
};

const verificationLastName = () => {
  if (validateFirstName(inputLastName.value) == true) {
    errorMsgLastName.innerText = "";
    nom = true;
  } else {
    nom = false;
    errorMsgLastName.innerText = "il y a une erreur dans la saisie du nom";
  }
};

const verificationAdress = () => {
  if (adresse == true) {
    errorMsgAdresse.innerText = "";
    adresse = true;
  } else {
    adresse = false;
    errorMsgAdresse.innerText = "il y a une erreur dans la saisie l'adress";
  }
};

const verificationCity = () => {
  if (validateCity(inputCity.value) == true) {
    errorMsgCity.innerText = "";
    ville = true;
  } else {
    ville = false;
    errorMsgCity.innerText = "il y a une erreur dans la saisie de la Ville";
  }
};
const verificationEmail = () => {
  if (validateEmail(inputEmail.value) == true) {
    errorMsgEmail.innerText = "";
    email = true;
  } else {
    email = false;
    errorMsgEmail.innerText =
      "il y a une erreur dans la saisie de l'addresse Email";
  }
};
// fonction qui valide une saisie grace a regex
function validateFirstName(name) {
  var re = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  return re.test(name);
}
function validateCity(city) {
  var re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  return re.test(city);
}
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// vérification de la présence d'article dans le panier
let panierRempli = false;
const presencePanier = () => {
  if (localStoragePanier.length > 0) {
    panierRempli = true;
  } else {
    panierRempli = false;
    if (window.confirm(`Veuillez ajouter un produit`)) {
      window.location.href = "index.html";
    }
  }
};

//fonction au click sur commander
order.addEventListener("click", function (event) {
  presencePanier();
  // ne raffraichie pas la page
  event.preventDefault();
  //execution des verification au click sur le bouton commande
  verificationFirstName();
  verificationLastName();
  verificationAdress();
  verificationCity();
  verificationEmail();
  // si toute les variable sont true creer un objet avec les donnees saisie par l'utilisateur
  if (prenom && nom && adresse && ville && email && panierRempli) {
    let donneeUtilisateur = {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAdresse.value,
      city: inputCity.value,
      email: inputEmail.value,
    };
    const tableauPanier = JSON.parse(localStorage.getItem("panier"));

    //fonction qui place l'id dans le tableau pour la requête
    const bodyProducts = () => {
      // creation d'un tableau qui stockera l'id du produit
      let idProduct = [];
      // pour chaque produit du panier
      for (let produit of tableauPanier) {
        // ajoute au tableau l'id
        idProduct.push(produit.id);
      }
      // bodyProducts = a tout les id des produit
      return idProduct;
    };

    //creation de l'objet qui contiendra les information de la commande
    let body = {
      contact: donneeUtilisateur,
      products: bodyProducts(),
    };
    // requete envoie a l'API
    const apiFetch2 = () => {
      //lien pour requete à l'API de commande
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // converti le l'objet javascript en objet JSON
        body: JSON.stringify(body),
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })

        //recuperation des données
        .then(function (data) {
          localStorage.setItem("orderId", data.orderId);

          document.location.href = "confirmation.html";
        })

        //en cas error afficher une alerte
        .catch(function (err) {
          alert("Probleme avec l'API");
        });
    };
    apiFetch2();
  }
});
