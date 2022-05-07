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

// Admin 
function initAdmin() {
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = [];
    let markup;

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p>${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            const time = new Date(order.createdAt).toLocaleString();
            return `
                <tr>
                <td class="border px-4 py-2 text-green">
                    <p>${ order._id }</p>
                    <div>${ renderItems(order.items) }</div>
                </td>
                <td class="border px-4 py-2">${ order.customerId.name }</td>
                <td class="border px-4 py-2">${ order.address }</td>
                <td class="border px-4 py-2">${ order.phone }</td>
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-50">
                        <form action="/admin/order/status" method="POST">
                            <input type="hidden" name="orderId" value="${ order._id }">
                            <select name="status" onchange="this.form.submit()"
                                    ${ order.status === 'order_placed' ? 'selected' : '' }>
                                    Placed</option>
                                <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed</option>
                                <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                                    Prepared</option>
                                <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                                    Delivered
                                </option>
                                <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                                    Completed
                                </option>
                            </select>
                        </form>
                    </div>
                </td>
                <td class="border px-2 py-1">
                    ${time}
                </td>
            </tr>
        `
        }).join('')
    }
}

initAdmin();