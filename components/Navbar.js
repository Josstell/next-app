import React from "react";
import Link from "next/link";
import styled from "styled-components";
import useCart from "../hooks/useCart";
import UnstyledLink from "./UnstyledLink";

import { FiShoppingCart } from "react-icons/fi";

const Nav = styled.nav`
  background-color: white;
  padding: 2rem;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  font-size: 2.5rem;
  display: flex;
  justify-content: space-between;
`;

const ShopingCart = styled(FiShoppingCart)`
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const Navbar = () => {
  const { openCart } = useCart();

  const handleClick = () => {
    openCart();
  };

  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <UnstyledLink>Mariachon</UnstyledLink>
        </Link>
        <ShopingCart onClick={handleClick} />
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
