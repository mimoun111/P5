// fonction qui affiche la commande
const main = () => {
  const idNode = document.getElementById("orderId");
  //   affiche l'id
  idNode.innerText = localStorage.getItem("orderId");
  //   vide le localstorage
  localStorage.clear();
};
// execute la fonction
main();
