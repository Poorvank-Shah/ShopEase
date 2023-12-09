import axios from "axios";
import { useEffect, useState } from "react";
import styled,{keyframes} from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LdsRing = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 42%;
`;

const LdsRingElement = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 50px;
  height: 50px;
  margin: 8px;
  border: 6px solid teal;
  border-radius: 50%;
  animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: teal transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // GET PRODUCTS ACC TO CATEGORY
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `products?category=${cat}`
            : "/products"
        );
        setProducts(res.data);
      } catch (err) { }
    };
    getProducts();
  }, [cat]);

  // FILTER BUTTON FUNCTION
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  // SORT BUTTON FUNCTION
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {
         products.length > 0
          ? cat
            ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
            : products.slice(0, 8).map((item) => <Product item={item} key={item.id} />)
          : (
            <LdsRing>
              <LdsRingElement></LdsRingElement>
              <LdsRingElement></LdsRingElement>
              <LdsRingElement></LdsRingElement>
              <LdsRingElement></LdsRingElement>
            </LdsRing>
          )
      }
    </Container>
  );
};

export default Products;
