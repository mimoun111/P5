let checkPanier = JSON.parse(localStorage.getItem("panier"));

const afficherProduit = () => {
  if (checkPanier) {
    console.log(checkPanier);
  }
};

afficherProduit();
