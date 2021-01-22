import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const CartProvider = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const initialCart = getInitialCart();
    console.log("intial ", initialCart);
    if (initialCart) {
      setCart(initialCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let newTotal = 10;
    cart.forEach((item) => (newTotal += item.price * item.qty));
    setTotal(newTotal);
  }, [cart]);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const addItemCart = (product, qty = 1) => {
    const item = cart.find((i) => i.id === product.id);
    if (item) {
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeItemFromCart = (id) => {
    console.log(id);
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };
  const exposed = {
    cart,
    isOpen,
    total,
    addItemCart,
    removeItemFromCart,
    openCart,
    closeCart,
    clearCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default CartProvider;
