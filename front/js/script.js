// requete pour récupération des donnés
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
      parcourirTableau(data);
    })
    //en cas error afficher une alerte
    .catch(function (err) {
      alert("Une erreur est survenue");
    });
};

// parcourir data et affichage des produit
const parcourirTableau = (tableau) => {
  const items = document.getElementById("items");
  // pour chaque element du tableau
  for (let product of tableau) {
    //creation des element dans Dom
    const newA = document.createElement("a");
    const newArticle = document.createElement("article");
    const newImg = document.createElement("img");
    const newH3 = document.createElement("h3");
    const newP = document.createElement("p");
    //ajout des attributs
    newA.setAttribute("href", `./product.html?id=${product._id} `);
    newImg.setAttribute("src", product.imageUrl);
    newImg.setAttribute("alt", product.altTxt);
    newH3.innerText = product.name;
    newH3.classList.add("productName");
    newP.innerText = product.description;
    newP.classList.add("productDescription");
    //ajout des enfants
    items.appendChild(newA);
    newA.appendChild(newArticle);
    newArticle.appendChild(newImg);
    newArticle.appendChild(newH3);
    newArticle.appendChild(newP);
  }
};

//execution de la fonction
apiFetch();
