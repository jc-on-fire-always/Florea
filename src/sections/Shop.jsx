import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import perfumesData from "../assets/data/perfumes";
import { MdExitToApp } from "react-icons/md";

const Section = styled(motion.section)`
  min-height: 100vh;
  height: auto;
  /* width: 80vw; */
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  position: relative;

  /* background-color: orange; */
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  /* text-transform: capitalize; */
  color: ${(props) => props.theme.text};
  text-shadow: 1px 1px 1px ${(props) => props.theme.body};

  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 11;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Left = styled.div`
  width: 35%;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  min-height: 100vh;
  z-index: 10;

  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 300;
    width: 80%;
    margin: 0 auto;
  }

  @media (max-width: 64em) {
    p {
      font-size: ${(props) => props.theme.fontmd};
    }
  }

  @media (max-width: 48em) {
    width: 40%;
    p {
      font-size: ${(props) => props.theme.fontsm};
    }
  }
  @media (max-width: 30em) {
    p {
      font-size: ${(props) => props.theme.fontxs};
    }
  }
`;
const Right = styled.div`
  /* width: 65%; */
  position: absolute;
  left: 35%;
  padding-left: 30%;
  background-color: ${(props) => props.theme.grey};
  min-height: 100vh;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Item = styled(motion.div)`
  display: inline-block;
  width: 20rem;
  /* background-color: black; */
  margin-right: 6rem;
  img {
    width: 100%;
    height: auto;
    cursor: pointer;
  }

  h1 {
    font-weight: 500;
    text-align: center;
    cursor: pointer;
  }

  @media (max-width: 48em) {
    width: 15rem;
  }
`;
//data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal"
const Product = ({ img, name = "", price, description, onClick }) => {
  return (
    // x: 100, y: -100
    <Item
      initial={{ filter: "grayscale(100%)" }}
      whileInView={{ filter: "grayscale(0%)" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: "all" }}
      onClick={() => onClick({ img, name, price, description })}
    >
      <img width="400" height="600" src={img} alt={name} />
      <h1>{name}</h1>
    </Item>
  );
};

const Shop = () => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);

  const Horizontalref = useRef(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log("Selected Product:", product);
    setDrawerOpen(true);
  };

  const handleRazorpay = () => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: selectedProduct.price * 100, // Amount in paise
      currency: "INR",
      name: selectedProduct.name,
      description: "Order for " + selectedProduct.name,
      image: selectedProduct.img,
      handler: function (response) {
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
      },
      prefill: {
        name: "Your Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useLayoutEffect(() => {
    let element = ref.current;

    let scrollingElement = Horizontalref.current;

    let pinWrapWidth = scrollingElement.offsetWidth;
    let t1 = gsap.timeline();

    setTimeout(() => {
      t1.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: `${pinWrapWidth} bottom`,
          scroller: ".App", //locomotive-scroll
          scrub: 1,
          pin: true,
          // markers: true,
          // anticipatePin: 1,
        },
        height: `${scrollingElement.scrollWidth}px`,
        ease: "none",
      });

      t1.to(scrollingElement, {
        scrollTrigger: {
          trigger: scrollingElement,
          start: "top top",
          end: `${pinWrapWidth} bottom`,
          scroller: ".App", //locomotive-scroll
          scrub: 1,
          // markers: true,
        },
        x: -pinWrapWidth,

        ease: "none",
      });
      ScrollTrigger.refresh();
    }, 1000);
    ScrollTrigger.refresh();

    return () => {
      t1.kill();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <Section ref={ref} id="shop">
      <Title data-scroll data-scroll-speed="-1">
        Our Collection
      </Title>
      <Left>
        <p>
          Each fragrance is a celebration of tradition and individuality. From
          delicate florals reminiscent of Indian summers to bold, smoky notes
          evoking ancient rituals — our perfumes are carefully composed to
          reflect personality, mood, and legacy.
          <br /> <br />
          Beyond perfumes, we create scented adornments and fragrance-infused
          jewelry, reimagining how modern luxury can carry the soul of Indian
          craftsmanship.
        </p>
      </Left>
      <Right data-scroll ref={Horizontalref}>
        {perfumesData.map((product, index) => (
          <Product
            key={index}
            img={product.img}
            name={product.name}
            price={product.price}
            description={product.description}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </Right>
      {isDrawerOpen && selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "25rem",
            height: "100vh",
            background: "#fff",
            padding: "2rem",
            boxShadow: "-5px 0 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ float: "right", fontWeight: "bold" }}
          >
            <MdExitToApp />
          </button>
          <h2>{selectedProduct.name}</h2>
          <img
            src={selectedProduct.img}
            alt={selectedProduct.name}
            style={{
              width: "60%",
              height: "auto",
              borderRadius: "8px",
              marginTop: "1rem",
              display: "block",
            }}
          />
          <p style={{ marginTop: "1rem" }}>
            Price: ₹{selectedProduct.price} <br />
            Description: {selectedProduct.description}
          </p>
          <button
            onClick={handleRazorpay}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 1.5rem",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Buy Now
          </button>
        </div>
      )}
    </Section>
  );
};

export default Shop;
