import React, { useEffect, useState } from "react";

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

const Checkout = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [val, setVal] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [button1, setButton1] = useState('Check Balance');
  const [button2, setButton2] = useState('Check Balance');
  const [button3, setButton3] = useState('Check Balance');

  function onChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setVal(e.target.value);
    }
  }

  async function addBalance1() {
    let RandomNumber = Math.floor(Math.random() * 100) + 1;
    const curBalance = balance + RandomNumber
    setBalance(curBalance);
    setButton1('Redeemed');
  }

  async function addBalance2() {
    let RandomNumber = Math.floor(Math.random() * 100) + 1;
    const curBalance = balance + RandomNumber
    setBalance(curBalance);
    setButton2('Redeemed');
  }

  async function addBalance3() {
    let RandomNumber = Math.floor(Math.random() * 100) + 1;
    const curBalance = balance + RandomNumber
    setBalance(curBalance);
    setButton3('Redeemed');
  }

  // button.addEventListener('click', setButtonColor('green'));

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const { unitAmount, currency } = await fetch("/config").then((r) =>
        r.json()
      );
      setAmount(unitAmount);
      setCurrency(currency);
    }
    fetchConfig();
  }, []);

  return (
    <div className="sr-root">
      <div className="sr-header">
        <button2>Current Balance: {balance}</button2>
        <h1 style={{float: 'left'}}>Get paid now!</h1>
      </div>
      <div className="sr-main">
        <section className="container">
          <div>
            <h1>Apple</h1>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://media.idownloadblog.com/wp-content/uploads/2018/07/Apple-logo-black-and-white-768x895.png"
                width="160"
                height="160"
              />
            </div>
          </div>
          <div>
            <p className="sr-legal-text">Enter your Apple Gift Card Number</p>
            <div className="quantity-setter">
              <input type="number" pattern="^-?[0-9]\d*\.?\d*$" />
            </div>
            <button onClick={()=> addBalance1()} style={{background:button1=='Redeemed'?"#32cd32":""}}>{button1}</button>
          </div>
        </section>
        <section className="container">
          <div>
            <h1>Allbirds</h1>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://thegreenhubonline.com/wp-content/uploads/2019/03/Allbirds-logo.jpg"
                width="160"
                height="160"
              />
            </div>
          </div>
          <div>
            <p className="sr-legal-text">
              Enter your Allbirds Gift Card Number
            </p>
            <div className="quantity-setter">
              <input type="number" pattern="^-?[0-9]\d*\.?\d*$" />
            </div>
            <button onClick={()=> addBalance2()} style={{background:button2=='Redeemed'?"#32cd32":""}}>{button2}</button>
          </div>
        </section>
        <section className="container">
          <div>
            <h1>Starbucks</h1>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://logos-download.com/wp-content/uploads/2016/03/Starbucks_Logo_2011.png"
                width="160"
                height="160"
              />
            </div>
          </div>
          <div>
            <p className="sr-legal-text">
              Enter your Starbucks Gift Card Number
            </p>
            <div className="quantity-setter">
              <input type="number" pattern="^-?[0-9]\d*\.?\d*$" />
            </div>
            <button onClick={()=> addBalance3()} style={{background:button3=='Redeemed'?"#32cd32":""}}>{button3}</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
