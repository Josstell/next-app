import useCart from "../hooks/useCart";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useRouter } from "next/router";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: white;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
`;

const X = styled(FiX)`
  font-size: 3rem;
  &:hover {
    cursor: pointer;
  }
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
  border-bottom: 1px solid #efefef;
`;

const Item = styled.li`
  list-style: nonUL;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 0.5rem;
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

const Cart = () => {
  const { cart, isOpen, openCart, closeCart, total } = useCart();
  const router = useRouter();

  const handleClick = () => {
    closeCart();
  };

  const navigateToCkeckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Container isOpen={isOpen}>
      <XContainer>
        <X onClick={handleClick} />
      </XContainer>
      <Content>
        <Title>Cart</Title>
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

            <Button onClick={navigateToCkeckout}>Checkout</Button>
          </>
        ) : (
          <p>Car is empty</p>
        )}
      </Content>
    </Container>
  );
};

export default Cart;
