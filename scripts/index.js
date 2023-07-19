const myform = document.getElementById("myForm");
myform.addEventListener("submit", submitForm);

function submitForm(e) {
  // input values don't disappear from input boxes
  e.preventDefault();

  // form input values are stored in an array
  const data = [];
  var formData = new FormData(myform);

  // changes numbers that are strings into numbers
  for (const value of formData.values()) {
    if (value == "true" || value == "false") {
      data.push(value);
    } else {
      const converted = Number(value);
      data.push(converted);
    }
  }

  // displays calculation divs that were hidden on page load
  const underInputs = document.querySelector(".underInputs");
  underInputs.style.display = "block";

  // gets form inputs and inserts them into a new listing object
  const soldItem = new listing(...data);

  // second listing method
  const based = document.querySelectorAll(".basedOn");
  const before = soldItem.basedOn();
  const after = soldItem.hundredthsplace(before);
  based.forEach((el) => (el.textContent = after));

  // third listing method
  const eSell = document.querySelectorAll(".eSellFee");
  const before2 = soldItem.eSellFee();
  const after2 = soldItem.hundredthsplace(before2);
  eSell.forEach((el) => (el.textContent = after2));

  // if seller is not top rated, don't display discount calculations
  const discountBox = document.querySelector(".discountBox");
  if (soldItem.top == "true") {
    discountBox.style.display = "block";
    // fourth listing method
    const discount = document.querySelector(".discountTotal");
    const before3 = soldItem.ratedDiscount();
    const after3 = soldItem.hundredthsplace(before3);
    discount.textContent = after3;
  } else {
    discountBox.style.display = "none";
  }

  // fifth listing method
  const totalFee = document.querySelectorAll(".feeAmount");
  const before4 = soldItem.totalFees();
  const after4 = soldItem.hundredthsplace(before4);
  totalFee.forEach((el) => (el.textContent = "$" + after4));

  // first listing method
  const listPrice = document.querySelector(".listPrice");
  const before5 = soldItem.beforeTax();
  const after5 = soldItem.hundredthsplace(before5);
  listPrice.textContent = "$" + after5;

  const cost2Ship = document.querySelector(".cost2Ship");
  cost2Ship.textContent = "$" + soldItem.cost.toFixed(2);

  // sixth listing method
  const net = document.querySelector(".netAmount");
  const before6 = soldItem.netAmount();
  const after6 = soldItem.hundredthsplace(before6);
  net.textContent = "$" + after6;
}

function listing(
  quantity = 1,
  price = 0.99,
  ship = 3.99,
  tax = 4.4,
  cost = 3.99,
  top = true
) {
  this.quantity = quantity;
  this.price = price;
  this.ship = ship;
  this.tax = tax;
  this.cost = cost;
  this.top = top;

  this.beforeTax = function () {
    // multiply quantity and item price
    const quanPrice = this.quantity * this.price;

    // add that product to shipping and handling
    return Number((this.ship + quanPrice).toFixed(2));
  };

  // calculate sales tax from that sum and adds it
  this.basedOn = function () {
    const paid = this.beforeTax();
    const afterConversion = Number((this.tax * 0.01).toFixed(6));
    const taxes = Number((paid * afterConversion).toFixed(4));
    return Number((paid + taxes).toFixed(2));
  };

  // applies ebay's 13.25% selling fee to what buyer paid
  this.eSellFee = function () {
    const totalPaid = this.basedOn();
    return Number((totalPaid * 0.1325).toFixed(2));
  };

  // if top rated is true, returns 10% of ebay selling fee
  this.ratedDiscount = function () {
    if (this.top === "false") {
      return 0;
    } else {
      return Number((this.eSellFee() * 0.1).toFixed(2));
    }
  };

  // gets all fees combined
  this.totalFees = function () {
    return Number((this.eSellFee() - this.ratedDiscount() + 0.3).toFixed(2));
  };

  // returns amount seller nets after fees and printing the shipping label
  this.netAmount = function () {
    return Number((this.beforeTax() - this.totalFees() - this.cost).toFixed(2));
  };

  //  if number has only one or no decimal place, this function turns 3.4 and 3 into 3.40 because
  //  $3.40 looks better
  this.hundredthsplace = function (checking) {
    const nowString = checking.toString();
    const nowArray = nowString.split("");

    // for a number with no decimals
    if (!nowArray.includes(".")) {
      nowArray.push(".00");
      const joined = nowArray.join("");
      return joined;

      // for a number with only one decimal
    } else if (nowString[nowString.length - 2] == ".") {
      nowArray.push("0");
      const joined = nowArray.join("");
      return joined;

      // if number already has two decimal places
    } else {
      return checking;
    }
  };
}
