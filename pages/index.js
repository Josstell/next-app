import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";

import useCart from "../hooks/useCart";

import styled from "styled-components";

import UnstyledLink from "../components/UnstyledLink";

const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  min-height: 12rem;
  position: relative;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const Price = styled.p`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 2.5rem;
`;

const renderProduct = (product, addItemCart) => {
  const handleClick = (e) => {
    e.stopPropagation();
    addItemCart(product);
  };

  return (
    <Link href={product.slug} key={product.slug}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <button onClick={handleClick}>Add to cart</button>
          <Price>${product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
`;

const index = (props) => {
  const { cart, addItemCart } = useCart();
  console.log(cart);
  return (
    <ProductContainer>
      {props.products.map((product) => renderProduct(product, addItemCart))}
    </ProductContainer>
  );
};

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;

  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    //read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    //pull out frontmatter = name
    const { data } = matter(fileContent);

    //return name, slug
    const slug = `/products/${filename.replace(".md", "")}`;
    const products = {
      ...data,
      slug: slug,
    };

    return products;
  });

  return {
    props: { products },
  };
};

export default index;
