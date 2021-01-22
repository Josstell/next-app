import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import axios from "axios";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";

const Item = styled.li`
  list-style: nonUL;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1rem;
`;

const UL = styled.ul`
  padding: 0;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: #42275a;
  font-size: 2rem;
  outline: none;
  border: none;
  width: 100%;
  padding: 1.5rem;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Checkout = () => {
  const { cart, total } = useCart();

  const processPayment = async () => {
    const url = "/.netlify/functions/charge-card";
    const newCart = cart.map(({ id, qty }) => ({
      id,
      qty,
    }));

    const stripe = await loadStripe(
      "pk_test_51I3nyuJOIVxoBffO5CllggWC0LnKDYGAnLRYAa1mQ6CwhNZqbt0b5gTq4mQmIHUIPJgQdbxYHWp1Hy8KwctKkZua00hNLCJZMU"
    );
    const { data } = await axios.post(url, { cart: newCart });
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <Page>
      <h1>Checkout</h1>
      {cart.length > 0 ? (
        <>
          <UL>
            {cart.map((item) => {
              return (
                <Item key={item.id}>
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>${item.price / 1000}</span>
                </Item>
              );
            })}
          </UL>
          <Total>
            <span>Total</span>
            <span>${total / 1000}</span>
          </Total>
          <Button onClick={processPayment}>Payment</Button>{" "}
        </>
      ) : (
        <p>You do not appear to have any items in your cart.</p>
      )}
    </Page>
  );
};

export default Checkout;
