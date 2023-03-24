import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const notify = (name, value) => toast.success(`Đã thêm ${value} ${name} vào giỏ hàng`, {
    position: "bottom-right",
    pauseOnHover: false,
});
const notifyError = () => toast.error("Có lỗi xảy ra !", {
    pauseOnHover: false,
});
const notifyWarn = (value, valueLeft) => toast.warn(`Bạn đã thêm ${value} sản phẩm này! Số lượng còn lại có thể thêm: ${valueLeft}`, {
    pauseOnHover: false,
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        productslist: [],
        cartEmpty: true,
        stockAvailable: {
            isAvailable: true,
            productID: 0,
        },
        stockAvailablePeek: false,
        cartPosition: {},
        addedProduct: {
            id: 0,
            amountAdded: 0,
        },
        shoppingCart: [],
        showModal: false,
        currentUserId: '',
        cart: [],
        cartType: 1,
    },
    reducers: {
        //actions
        addItemNoStock: (state, action) => {
            // check current user

            let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            let currenUser = undefined
            if (currentShoppingCart?.length > 0) {
                currenUser = currentShoppingCart.find((user) => {
                    return user.cusId === action.payload.cusId
                })
            }
            // console.log('currenUser', currenUser)
            // (basic) check upplicate product by id and status isCook
            let added = state.productslist.find((product) => {
                return product.id === action.payload.id && product.isCook === action.payload.isCook
            })

            // (with CustomerId) check upplicate product by id and status isCook
            let addedWithCusId = undefined
            if (currenUser !== undefined) {
                addedWithCusId = currenUser.cart.find((item) => {
                    return item.id === action.payload.id && item.isCook === action.payload.isCook
                })
            }

            // console.log('addedWithCusId', addedWithCusId)

            // [
            //     {
            //         cusId: '1',
            //         cart: [{

            //         }]
            //     },
            //     {
            //         cusId: '2',
            //         cart: [{

            //         }]
            //     },
            // ]

            // undefind: first time 
            notify(action.payload.orderName, 1)
            let cart = []
            if (currenUser === undefined) {
                state.productslist = [...state.productslist,
                {
                    cusId: action.payload.cusId,
                    cart: [...cart, {
                        id: action.payload.id,
                        orderName: action.payload.orderName,
                        img: action.payload.img,
                        price: action.payload.price,
                        amount: 1,
                        isCook: action.payload.isCook,
                        cusId: action.payload.cusId,
                        orderDetails: action.payload.orderDetails,
                    }]
                }]
                localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
            } else {
                // if (currenUser)
                if (addedWithCusId === undefined) {
                    let currentUserPosition = currentShoppingCart.indexOf(currenUser)
                    // console.log('currentUserPosition', currentUserPosition)
                    state.productslist.map((pro) => {
                        if (pro.cusId === currenUser.cusId) {
                            state.productslist.splice(currentUserPosition, 1)
                            state.productslist.splice(currentUserPosition, 0, {
                                cusId: currenUser.cusId,
                                cart: [...currenUser.cart, {
                                    id: action.payload.id,
                                    orderName: action.payload.orderName,
                                    img: action.payload.img,
                                    price: action.payload.price,
                                    amount: 1,
                                    isCook: action.payload.isCook,
                                    cusId: action.payload.cusId,
                                    orderDetails: action.payload.orderDetails,
                                }]
                            })
                        }
                    })
                    localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
                } else {
                    let newAmount = 0
                    let addedPosition = currenUser.cart.indexOf(addedWithCusId)
                    // console.log(addedPosition)
                    currenUser.cart.map((pro, index) => {
                        if (pro.id === addedWithCusId.id && pro.isCook === addedWithCusId.isCook) {
                            newAmount = pro.amount + 1
                            currenUser.cart.splice(addedPosition, 1)
                            currenUser.cart.splice(addedPosition, 0, {
                                id: action.payload.id,
                                orderName: action.payload.orderName,
                                img: action.payload.img,
                                price: action.payload.price,
                                amount: newAmount,
                                isCook: action.payload.isCook,
                                cusId: action.payload.cusId,
                                orderDetails: action.payload.orderDetails,
                            })
                        }
                    })
                    // console.log(state.productslist)
                    let currentUserPosition = currentShoppingCart.indexOf(currenUser)
                    // console.log('currentPors', currentUserPosition)
                    state.productslist.map((pro) => {
                        if (pro.cusId === currenUser.cusId) {
                            state.productslist.splice(currentUserPosition, 1)
                            state.productslist.splice(currentUserPosition, 0, {
                                cusId: currenUser.cusId,
                                cart: currenUser.cart
                            })
                        }
                    })
                    localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
                }
            }

            // Basic add to cart logic

            // if (added === undefined) {
            //     state.productslist = [...state.productslist, {
            //         id: action.payload.id,
            //         orderName: action.payload.orderName,
            //         img: action.payload.img,
            //         price: action.payload.price,
            //         amount: 1,
            //         isCook: action.payload.isCook,
            //         cusId: action.payload.cusId,
            //         orderDetails: action.payload.orderDetails,
            //     }]
            //     localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
            // } else {
            //     let newAmount = 0
            //     let addedPosition = state.productslist.indexOf(added)
            //     state.productslist.map((pro, index) => {
            //         if (pro.id === added.id && pro.isCook === added.isCook) {
            //             newAmount = pro.amount + 1
            //             state.productslist.splice(addedPosition, 1)
            //             state.productslist.splice(addedPosition, 0, {
            //                 id: action.payload.id,
            //                 orderName: action.payload.orderName,
            //                 img: action.payload.img,
            //                 price: action.payload.price,
            //                 amount: newAmount,
            //                 isCook: action.payload.isCook,
            //                 cusId: action.payload.cusId,
            //                 orderDetails: action.payload.orderDetails,
            //             })
            //         }
            //     })
            //     localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
            // }

        },
        addItemWithStock: (state, action) => {
            let added = state.productslist.find((product) => {
                return product.id === action.payload.id
            })

            let addedAmount = 0
            let checkValidAmount = true
            if (action.payload.id === state.addedProduct.id) {
                addedAmount = state.addedProduct.amountAdded
                if (action.payload.inputValue + addedAmount > action.payload.stock) {
                    checkValidAmount = false
                } else {
                    checkValidAmount = true
                }
            }

            if (checkValidAmount) {
                if (action.payload.inputValue >= 1) {
                    state.cartEmpty = false
                    notify(action.payload.name, action.payload.inputValue)
                    if (added === undefined) {
                        state.productslist = [...state.productslist, {
                            id: action.payload.id,
                            name: action.payload.name,
                            ImgSrc: action.payload?.thumbImg,
                            price: action.payload.price,
                            amount: action.payload.inputValue,
                            maxAmount: action.payload.stock,
                            categoryName: action.payload.categoryName
                        }]
                        localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
                    } else {
                        let newAmount = 0
                        let addedPosition = state.productslist.indexOf(added)
                        state.productslist.map((pro, index) => {
                            if (pro.id === added.id) {
                                newAmount = pro.amount + action.payload.inputValue
                                state.productslist.splice(addedPosition, 1)
                                state.productslist.splice(addedPosition, 0, {
                                    id: action.payload.id,
                                    name: action.payload.name,
                                    ImgSrc: action.payload?.thumbImg,
                                    price: action.payload.price,
                                    amount: newAmount,
                                    maxAmount: action.payload.stock,
                                    categoryName: action.payload.categoryName
                                })
                            }
                        })
                        localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
                    }
                } else {
                    notifyError()
                }
            } else {
                notifyWarn(parseInt(addedAmount), action.payload.stock - parseInt(addedAmount))
                state.stockAvailablePeek = true
            }
        },
        deleteItem: (state, action) => {
            // basic remove item from cart based on input value

            // let newAmount = 0
            // let added = state.productslist.find((product) => {
            //     return product.id === action.payload.id && product.isCook === action.payload.isCook
            // })
            // let addedPosition = state.productslist.indexOf(added)
            // state.productslist.map((pro, index) => {
            //     if (pro.id === added.id && pro.isCook === added.isCook) {
            //         if (pro.amount > 1) {
            //             newAmount = pro.amount - 1
            //             state.productslist.splice(addedPosition, 1)
            //             state.productslist.splice(addedPosition, 0, {
            //                 id: pro.id,
            //                 orderName: pro.orderName,
            //                 img: pro.img,
            //                 price: pro.price,
            //                 amount: newAmount,
            //                 isCook: pro.isCook,
            //                 cusId: pro.cusId,
            //                 orderDetails: pro.orderDetails,
            //             })
            //             localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
            //         }
            //     }
            // })

            // (in specific user cart) remove item from cart based on input value

            //check current user
            let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            let currenUser = undefined
            if (currentShoppingCart?.length > 0) {
                currenUser = currentShoppingCart.find((user) => {
                    return user.cusId === action.payload.cusId
                })
            }

            let addedWithCusId = undefined
            if (currenUser !== undefined) {
                addedWithCusId = currenUser.cart.find((item) => {
                    return item.id === action.payload.id && item.isCook === action.payload.isCook
                })
            }

            let newAmount = 0
            let addedPosition = currenUser.cart.indexOf(addedWithCusId)
            // console.log(addedPosition)
            currenUser.cart.map((pro, index) => {
                if (pro.id === addedWithCusId.id && pro.isCook === addedWithCusId.isCook) {
                    newAmount = pro.amount - 1
                    currenUser.cart.splice(addedPosition, 1)
                    currenUser.cart.splice(addedPosition, 0, {
                        id: action.payload.id,
                        orderName: action.payload.orderName,
                        img: action.payload.img,
                        price: action.payload.price,
                        amount: newAmount,
                        isCook: action.payload.isCook,
                        cusId: action.payload.cusId,
                        orderDetails: action.payload.orderDetails,
                    })
                }
            })
            // console.log(state.productslist)
            let currentUserPosition = currentShoppingCart.indexOf(currenUser)
            // console.log('currentPors', currentUserPosition)
            state.productslist.map((pro) => {
                if (pro.cusId === currenUser.cusId) {
                    state.productslist.splice(currentUserPosition, 1)
                    state.productslist.splice(currentUserPosition, 0, {
                        cusId: currenUser.cusId,
                        cart: currenUser.cart
                    })
                }
            })
            localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))


        },
        cartEmpty: (state, action) => {
            state.cartEmpty = action.payload
        },
        setStockAvailable: (state, action) => {
            state.stockAvailable.isAvailable = action.payload.isAvailable
            state.stockAvailable.productID = action.payload.productID
        },
        setStockAvailablePeek: (state, action) => {
            state.stockAvailablePeek = action.payload
        },
        setAddedProduct: (state, action) => {
            state.addedProduct = action.payload
        },
        setCartPosition: (state, action) => {
            state.cartPosition = action.payload
        },
        getShoppingCart: (state, action) => {
            state.shoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))

            if (currentShoppingCart?.length > 0) {
                state.productslist = currentShoppingCart
            }
        },
        removeWholeItem: (state, action) => {
            // basic remove whole item cart

            // let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            // if (currentShoppingCart?.length > 0) {
            //     let added = state.productslist.find((product) => {
            //         return product.id === action.payload.id && product.isCook === action.payload.isCook
            //     })
            //     state.productslist.map((pro, index) => {
            //         if (pro.id === added.id && pro.isCook === added.isCook) {
            //             state.productslist.splice(index, 1)
            //             state.productslist = [...state.productslist]
            //             localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
            //         }
            //     })
            // }

            // (remove whole item in specific user cart)

            //check current user
            let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            let currenUser = undefined
            if (currentShoppingCart?.length > 0) {
                currenUser = currentShoppingCart.find((user) => {
                    return user.cusId === action.payload.cusId
                })
            }

            if (currenUser.cart?.length > 0) {
                let added = currenUser.cart.find((item) => {
                    return item.id === action.payload.id && item.isCook === action.payload.isCook
                })
                // remove that item from current cart
                let removedCart = currenUser.cart
                currenUser.cart.map((item, index) => {
                    if (item.id === added.id && item.isCook === added.isCook) {
                        currenUser.cart.splice(index, 1)
                        removedCart = [...currenUser.cart]
                    }
                })
                // replace old cart with removed cart
                let currentUserPosition = currentShoppingCart.indexOf(currenUser)
                // console.log('currentPors', currentUserPosition)
                state.productslist.map((pro) => {
                    if (pro.cusId === currenUser.cusId) {
                        state.productslist.splice(currentUserPosition, 1)
                        state.productslist.splice(currentUserPosition, 0, {
                            cusId: currenUser.cusId,
                            cart: removedCart
                        })
                    }
                })
                localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
            }

        },
        removeCart: (state) => {
            let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            if (currentShoppingCart?.length > 0) {
                state.productslist = []
                localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
            }
        },
        removeCartByStatus: (state, action) => {
            //check current user
            let currentShoppingCart = JSON.parse(localStorage.getItem('SHOPPING_CART'))
            let currenUser = undefined
            if (currentShoppingCart?.length > 0) {
                currenUser = currentShoppingCart.find((user) => {
                    return user.cusId === action.payload.cusId
                })
            }

            if (currenUser.cart?.length > 0) {
                let removedCart = currenUser.cart.filter((item) => item.isCook !== action.payload.isCook)

                // replace old cart with removed cart
                let currentUserPosition = currentShoppingCart.indexOf(currenUser)
                // console.log('currentPors', currentUserPosition)
                state.productslist.map((pro) => {
                    if (pro.cusId === currenUser.cusId) {
                        state.productslist.splice(currentUserPosition, 1)
                        state.productslist.splice(currentUserPosition, 0, {
                            cusId: currenUser.cusId,
                            cart: removedCart
                        })
                    }
                })
                localStorage.setItem('SHOPPING_CART', JSON.stringify(state.productslist))
            }
        },
        setShowModalCart: (state, action) => {
            state.showModal = action.payload
        },
        setCartType: (state, action) => {
            state.cartType = action.payload
        }
    }
})

export const { addItemNoStock, addItemWithStock, deleteItem,
    cartEmpty, setStockAvailable, setStockAvailablePeek,
    setAddedProduct, setCartPosition, getShoppingCart,
    removeWholeItem, setShowModalCart, removeCart, setCartType,
    removeCartByStatus } = cartSlice.actions;
export default cartSlice.reducer;

