const listing = require("./listing");

describe("listing", () => {
  describe("Initialization", () => {
    it("should return a new 'listing' object", () => {
      const obj = new listing();
      expect(obj instanceof listing).toEqual(true);
    });

    it("should contain a 'quantity' property with number datatype when called with the 'new' keyword", () => {
      const obj = new listing();
      expect(obj).toHaveProperty("quantity");
      expect(typeof obj.quantity).toBe("number");
    });

    it("should contain a 'price' property with number datatype when called with the 'new' keyword", () => {
      const obj = new listing();
      expect("price" in obj).toEqual(true);
      expect(typeof obj.price).toBe("number");
    });

    it("should contain a 'ship' property with number datatype when called with the 'new' keyword", () => {
      const obj = new listing();
      expect(obj).toHaveProperty("ship");
      expect(typeof obj.ship).toBe("number");
    });

    it("should contain a 'tax' property with number datatype when called with the 'new' keyword", () => {
      const obj = new listing();
      expect("tax" in obj).toEqual(true);
      expect(typeof obj.tax).toBe("number");
    });

    it("should contain a 'cost' property with number datatype when called with the 'new' keyword", () => {
      const obj = new listing();
      expect(obj).toHaveProperty("cost");
      expect(typeof obj.cost).toBe("number");
    });

    it("should contain a 'top' property with boolean datatype when called with the 'new' keyword", () => {
      const obj = new listing();
      expect("top" in obj).toEqual(true);
      expect(typeof obj.top).toBe("boolean");
    });
  });

  describe("beforeTax method", () => {
    it("multiplies quantity with item price and then adds shipping", () => {
      const practice = new listing(2, 19.99, 3.99);
      const product = practice.quantity * practice.price;
      const end = product + practice.ship;
      expect(practice.beforeTax()).toBe(end);
    });
  });

  describe("paidWithTax method", () => {
    it("gets tax percentage of beforeTax returned value and then adds it", () => {
      const practice = new listing(1, 9.99, 3.99, 8.75);
      const coverted = practice.tax * 0.01;
      const estiTax = practice.beforeTax() * coverted;
      const taxAdded = Number((practice.beforeTax() + estiTax).toFixed(2));
      expect(practice.basedOn()).toBe(taxAdded);
    });
  });

  describe("ebay selling fee method", () => {
    it("gets ebay fee based on what buyer paid", () => {
      const practice = new listing(1, 9.99, 3.99);
      const eSellFee = Number((practice.basedOn() * 0.1325).toFixed(2));
      expect(practice.eSellFee()).toBe(eSellFee);
    });
  });

  describe("top rated seller discount method", () => {
    it("returns discount based on ebay selling fee", () => {
      const practice = new listing(1, 9.99, 3.99, 8.75);
      const discount = Number((practice.eSellFee() * 0.1).toFixed(2));
      expect(practice.ratedDiscount()).toBe(discount);
    });
  });

  describe("total fees method", () => {
    it("adds all the fees and top rated seller discount if applicable", () => {
      const practice = new listing(1, 9.99, 3.99, 8.75);
      const finalValFee = 0.3;
      const totalFee = Number(
        (practice.eSellFee() - practice.ratedDiscount() + finalValFee).toFixed(
          2
        )
      );
      expect(practice.totalFees()).toBe(totalFee);
    });
  });

  describe("net amount method", () => {
    it("gets amount by subtracting total fees and cost to ship from list price", () => {
      const practice = new listing(1, 9.99, 3.99, 8.75, 4.13, true);
      const listPrice = practice.beforeTax();
      const totalFee = practice.totalFees();
      const netAmount = Number(
        (listPrice - totalFee - practice.cost).toFixed(2)
      );
      expect(practice.netAmount()).toBe(netAmount);
    });
  });
});
