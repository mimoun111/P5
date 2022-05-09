// fonction qui affiche la commande
const main = () => {
  const order = document.getElementById("orderId");
  //   affiche l'id
  order.innerText = localStorage.getItem("orderId");
  //   vide le localstorage
  localStorage.clear();
};
// execute la fonction
main();
