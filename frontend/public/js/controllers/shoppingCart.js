window.onload = () => {

    const form = document.getElementById('form');

    form.innerHTML = `<img src="../images/shopping-cart.svg">
        <h2 class="title">Shopping Cart</h2>`

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {

            form.innerHTML += `
            <div class="input-div one">
					<div class="i">
						<i class="fas fa-tag"></i>
						<h5></h5>
					</div>
					<div class="div">
						<input type="text" id="nameInput" class="input" value="${key}" disabled>
					</div>
				</div>
            <div class="input-div pass">
					<div class="i">
						<i class="fas fa-hashtag"></i>
					</div>
					<div class="div">
						<h5></h5>
						<input type="number" id="${key}QuantityInput" value="${localStorage[key]}" class="input">
					</div>
				</div></br>`

        }
    }

    form.innerHTML += `<a href="./index.html">Go Back?</a>
    <input type="submit" id="btnBuy" class="btn" value="Checkout">
    <input type="submit" id="btnCancel" class="btn" value="Cancel">`;

    const inputRazer = document.getElementById('logitechQuantityInput');
    const inputSteelseries = document.getElementById('logitechQuantityInput');
    const inputLogitech = document.getElementById('logitechQuantityInput');

    const btnCheckout = document.getElementById('btnBuy');

    btnCheckout.addEventListener('click', e => {
        e.preventDefault();

        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                switch (key) {
                    case 'razer':
                        localStorage.setItem(key, inputRazer.value);
                    case 'logitech':
                        localStorage.setItem(key, inputLogitech.value);
                    case 'steelseries':
                        localStorage.setItem(key, inputSteelseries.value);
                }

            }
        }

        checkout();
    });

    const checkout = async () => {
        let products = [];
        try {
            let res = await fetch('http://localhost:4000/products');

            if (res.status == 200) {
                let response = await res.json();
                products = response;

            }
        } catch (err) {
            console.log(err);
        }

        let data = [];
        products.forEach(element => {
            switch (element.name) {
                case 'razer':
                    const quantityProd = Number.parseInt(element.quantity) - Number.parseInt(localStorage.getItem('razer'));
                    const soldProd = Number.parseInt(element.sold) + Number.parseInt(localStorage.getItem('razer'));
                    data.push({
                        id: element.id,
                        name: element.name,
                        image: element.image,
                        description: element.description,
                        quantity: quantityProd,
                        sold: soldProd
                    });
                    break;

                case 'logitech':
                    if (element.quantity >= localStorage.getItem('logitech')) {
                        const quantityProd = Number.parseInt(element.quantity) - Number.parseInt(localStorage.getItem('logitech'));
                        const soldProd = Number.parseInt(element.sold) + Number.parseInt(localStorage.getItem('logitech'));
                        data.push({
                            id: element.id,
                            name: element.name,
                            image: element.image,
                            description: element.description,
                            quantity: quantityProd,
                            sold: soldProd
                        });
                        break;
                    } else console.log('hello'); 
                case 'steelseries':
                    if (element.quantity >= localStorage.getItem('steelseries')) {
                        const quantityProd = Number.parseInt(element.quantity) - Number.parseInt(localStorage.getItem('steelseries'));
                        const soldProd = Number.parseInt(element.sold) + Number.parseInt(localStorage.getItem('steelseries'));
                        data.push({
                            id: element.id,
                            name: element.name,
                            image: element.image,
                            description: element.description,
                            quantity: quantityProd,
                            sold: soldProd
                        });
                        break;
                    } else console.log('hello');
            }

        });

        data.forEach(element => {
            putProduct(element);
        }); 

    }

    const putProduct = async (element) => {
        try {
            console.log(element)
            let res = await fetch(`http://localhost:4000/products/${element.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': ' application/json'
                },
                body: JSON.stringify(element)
            });

            if (res.status == 200) {
                let response = await res.json();
                
                location.href = "http://localhost:5500/frontend/public/views/index.html";
            }

        } catch (err) {
            console.log(err);
        }
    }
}