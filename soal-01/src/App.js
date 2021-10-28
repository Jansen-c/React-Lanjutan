import { useEffect, useState } from "react";
import CardProduct from "./components/CardProduct";
import CartListItem from "./components/CartListItem";
import Navbar from "./components/Navbar";

import menus from "./dummy-data";

export default function App() {
  const [total, setTotal] = useState(0);
  const [purchasedItem, setPurchasedItem] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => { //kalau ada update dia ke-trigger
    setPurchasedItem(cart.reduce((account, currency) => currency.amount + account, 0));
    setTotal(cart.reduce((account, currency) => currency.amount * currency.price + account, 0));
  });

  const addToCart = (id) => {

    const menu = menus.find((index) => {
      if(index.id === id){
      return index.id
      }
    }) 

    const cardDenganID = cart.find((index) => {
      if(index.id === id){
        return index.id
      }
    })


    if (cardDenganID == undefined) {
      setCart([
        ...cart,
        {
          id: id,
          name: menu.name,
          price: menu.price,
          amount: 1,
        },
      ])
    } else {
      increaseCartAmount(id);
    }
  };


  const increaseCartAmount = (id) => {

    const cardDenganID = cart.find((index) => {
      if(index.id === id){
        // console.log(id,"======================")
      return index.id
      }
    })
    console.log(cardDenganID,"kenapa bentuknya array")
    cardDenganID.amount = cardDenganID.amount + 1;
    const cartTanpaID = cart.filter((index) => { // bikin arr baru 
      if(index.id !== id){
      return index.id
      }
    })
    setCart([...cartTanpaID, cardDenganID]);
    // console.log(cart)


  };

  const decreaseCartAmount = (id) => {
    const cardDenganID = cart.find((index) => {
      if(index.id === id){
      return index.id
      }
    })

    cardDenganID.amount = cardDenganID.amount - 1;
    const cartTanpaID = cart.filter((index) => {
      if(index.id !== id){
      return index.id
      }
    })
    
    if (cardDenganID.amount <= 0) {
      setCart(cartTanpaID);
    } else {
      setCart([...cartTanpaID, cardDenganID]);
    }
  };

 
  return (
    <div className="bg-secondary">
      <Navbar totalItem={purchasedItem} />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card w-100">
              <div className="card-body">
                <div className="row">
                  {menus.map((menu) => (
                    <div
                        key={menu.id}
                      className="col-md-4 col-sm-6 col-12 my-2"
                    >
                      <CardProduct
                        {...menu}
                        addToCart={() => addToCart(menu.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <ol className="list-group">
              {cart.map((c) => {
                return (
                  <CartListItem
                    key={c.id}
                    {...c}
                    increase={() => increaseCartAmount(c.id)}
                    decrease={() => decreaseCartAmount(c.id)}
                  />
                );
              })}
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Total Harga</div>
                </div>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(total)}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
