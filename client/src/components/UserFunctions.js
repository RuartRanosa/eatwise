import axios from 'axios'

export const register = newUser => {
    return axios
        .post('/register', {
            username: newUser.username,
            display_name: newUser.display_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            return true
        })
        .catch(err => {
            return false
        })
}

export const login = user => {
    return axios
        .post('/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return true
        })
        .catch(err => {
            return false
        })
}

export const addShop = shop => {
    return axios
    .post('/add-shop',{
        name: shop.restaurant_name,
        avgPrice: shop.average_price,
        type: shop.restaurant_type,
        location: shop.longitude +", " + shop.latitude,
        description: shop.description,
        menu: shop.menu_type,
        votes: shop.votes
    }).then(res => {
        return true
    })
    .catch(err => {
            return false
        })
}

export const rate = rate =>{
    return axios
    .post('/add-review', {
        userId: rate.userId,
        shopId: rate.shopId,
        comment: rate.comment,
        rating: rate.votes
    }).then(res => {
        return true
    })
    .catch(err => {
            console.log(err)
            return false
    })
}