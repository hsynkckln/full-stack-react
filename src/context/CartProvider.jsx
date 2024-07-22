import { createContext, useContext,useEffect,useState } from "react";

const CartContext=createContext();

export const CartProvider=({children})=>{
    const [cartItems,setCartItems]=useState(
        localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    );

    useEffect(()=>{
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
    },[cartItems])

    const addCart=(item)=>{
        setCartItems([...cartItems,
            {
                ...item,
                quantity:item.quantity ? item.quantity:1,}]);
        console.log(cartItems);
    }
    const removeCart=(item)=>{
        const filteredCart=cartItems.filter(x=>x._id!=item._id)
        setCartItems(filteredCart)
    }
    var value={
        cartItems,setCartItems,addCart,removeCart
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart=()=>useContext(CartContext);