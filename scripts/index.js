// If you want percentages in input and need to convert it to decimals in js then:

/* <input type="number" min="1" max="100" id="myPercent"/> */
// var valInDecimals = document.getElementById("myPercent").value / 100;
document.getElementById("myForm").onsubmit = function () {
    var valInDecimals = document.getElementById("myPercent").value / 100;
  };