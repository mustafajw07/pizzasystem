let addToCart = document.querySelectorAll('#add-to-cart')
let alertmessage = document.querySelector('#success-alert')

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        alert ("item added to cart");
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
    })
})

if(alertmessage){
    setTimeout(() => {
        alertmessage.remove()
    },1000)
}