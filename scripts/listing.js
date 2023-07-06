
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
    if (this.top) {
      return Number((this.eSellFee() * 0.1).toFixed(2));
    } else {
      return 0;
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
}

module.exports = listing;
