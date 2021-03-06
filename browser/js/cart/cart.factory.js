app.factory('CartFactory', function ($http) {
    return {
        getCart: function () {
            return $http.get('/api/orders/')
                .then(function (cart) {
                    //cart is returned with price and products
                    if (!cart || !cart.data) return null;
                    return cart.data;
                }).catch(console.error.bind(console));
        },
        createCart: function (data) {
            return $http.post('/api/orders/')
                .then(function (cart) {
                    if (!cart) return null;
                    return cart;
                }).catch(console.error.bind(console));
        },
        addItemToCart: function (itemId, price) {
            //TODO: find cart and add item to products and update price accordingly
            var product = {
                product: {
                    id: itemId,
                    price: price
                }
            }
            return $http.post('/api/orders/add', product)
                .then(function (cart) {
                    if (!cart) return null;
                    return cart;
                }).catch(console.error.bind(console));
        },
        deleteItemFromCart: function (itemId, price, quantity) {
            var payload = {
                    product: {
                        id: +itemId,
                        price: +price,
                        quantity: +quantity
                }
            }
            return $http.post('/api/orders/remove', payload)
                .then(function (success) {
                    if (!success) return null;
                    return success;
                }).catch(console.error.bind(console))
        },
        updateCart: function (products) {
            var payload = {
                products: products
            };
            return $http.put('/api/orders/', payload)
                .then(function (cart) {
                    return cart;
                }).catch(console.error.bind(console));
        },
        checkOut: function (products, shipping) {
            var payload = {
                products: products,
                shipping: shipping,
            }
            return $http.put('/api/orders/checkout', payload)
                .then(function (cart) {
                    return cart;
                }).catch(console.error.bind(console));
        },
        pastOrders: function(){
            return $http.get('/api/orders/pastOrders')
                .then(function(pastOrders){
                    return pastOrders;
                })
        },
        getCartById: function(id){
            return $http.get('/api/orders/' + id)
            .then(function(order){
                return order.data
            })
        },
        sendConfirmationEmail: function(email){
            return $http.post('/api/utils/sendemail/', email);
        }
    };
})