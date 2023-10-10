import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../API";
import Ghost from "../assets/ghost.png";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    async function getSingleProductData() {
      try {
        const productData = await fetchSingleProduct(id);
        if (productData) {
          setProduct(productData.product);
        } else {
          setError("No product fetched");
        }
      } catch (error) {
        setError("Error fetching product data");
      }
    }
    getSingleProductData();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    addToCart(product);
  };

  async function onSubmit() {
    console.log("something");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1NzWUZLy2DFROTD9qmeVEB0C",
            quantity: 1,
          },
        ],
      }),
    };
    const response = await fetch("http://localhost:3000/create-checkout-session", requestOptions);
  }

  const handleClick = async () => {
    console.log(parseInt(String(product.price).replace(".", "")));
    const res = await fetch("http://localhost:3000/create-checkout-session", {
      method: 'POST', 
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        // line_items: [
        //   {
        //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //     price: "price_1NzWUZLy2DFROTD9qmeVEB0C",
        //     quantity: 1,
        //   },
        // ],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
              },
              unit_amount: parseInt(product.price*100),
            },
            quantity: 1,
          },
        ],
      }),
    })
    
    const body = await res.json()
    window.location.href = body.url
  }

  return (
    <div className="container-1">
      <div className="productdetail">
        {product && (
          <div>
            <img src={Ghost} alt={product.name} />
            <h2>{product.name}</h2>
            <h4>{product.price}</h4>
            <p>{product.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )}
        <button onClick={handleClick}>
          Checkout
        </button>
      </div>
    </div>
  );
}
