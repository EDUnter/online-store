window.onload = () => {

  const sectionCards = document.querySelector("section.cards");
  const card = document.querySelector("div.card");

  let products = [];

  const populateCards = async () => {
    try {
      let res = await fetch('http://localhost:4000/products');

      if (res.status == 200) {
        let response = await res.json();
        products = response;

      }
    } catch (err) {
      console.log(err);
    }

    products.map(product => {
      const cardClone = card.cloneNode(true);
      cardClone.setAttribute("id", product.name);
      cardClone.querySelector("img").src = product.image;
      cardClone.querySelector(".title").innerHTML = product.name;
      cardClone.querySelector(".info > p.text--medium").innerHTML =
        product.description;
      sectionCards.appendChild(cardClone);

      const btnBuyProduct = document.getElementById(product.name);
      btnBuyProduct.addEventListener('click', e => {
        e.preventDefault();

        localStorage.setItem(product.name, 1)
      });
    });

    card.remove();
  }

  populateCards();
}