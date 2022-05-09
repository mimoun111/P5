// fonction qui affiche la commande
const main = () => {
  const order = document.getElementById("orderId");
  let str = window.location.href;

  let url = new URL(str);

  let orderId = url.searchParams.get("orderId");

  order.innerText = orderId;

  //   vide le localstorage
  localStorage.clear();
};
// execute la fonction
main();
