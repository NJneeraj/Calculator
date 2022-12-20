const nums = document.querySelectorAll(".nums");
const mainScreen = document.querySelector(".input-screen");
const clearInput = document.querySelector(".clear");
const evaluateResult = document.querySelector(".evaluate");
const back = document.querySelector("#back");
const sin = document.querySelector("#sin");
const cos = document.querySelector("#cos");
const arr = [];
let evaluatedResult;

nums.forEach((input) => {
  input.addEventListener("click", () => inputClikced(input.textContent));
});

function inputClikced(data) {
  arr.push(data);
  showData(arr);
}
function showData(arr) {
  mainScreen.textContent = arr.join("");
}

function evaluate() {
  let equation = arr.join("");
  let res = equation.split(/[\+|\-|\/|\*]/g);
  const decimals = getMostDecimals(res);
  let result = Number(eval(equation));
  arr.splice(0, arr.length);
  arr.push(result);
  evaluatedResult = result;
  mainScreen.textContent = decimals ? result.toFixed(decimals) : result;
}
function clear() {
  mainScreen.textContent = "";
  arr.splice(0, arr.length);
}
function getMostDecimals(arr) {
  let max = arr[0].toString().split(".")[1]?.length || 0;
  for (let num of arr) {
    let value = num.toString().split(".")[1]?.length || 0;
    if (value > max) {
      max = value;
    }
  }
  return max;
}
function backInput() {
  arr.pop();
  showData(arr);
}
function sinValue() {
  evaluate();
  let sinResult = Math.sin((evaluatedResult * Math.PI) / 180);
  clear();
  arr.push(
    sinResult == Math.floor(sinResult) ? sinResult : sinResult.toFixed(5)
  );
  showData(arr);
}
function cosValue() {
  evaluate();
  let cosResult = Math.cos((evaluatedResult * Math.PI) / 180);
  clear();

  cosResult == Math.floor(cosResult)
    ? arr.push(cosResult)
    : arr.push(cosResult.toFixed(5));

  showData(arr);
}

clearInput.addEventListener("click", clear);
evaluateResult.addEventListener("click", evaluate);
back.addEventListener("click", backInput);
sin.addEventListener("click", sinValue);
cos.addEventListener("click", cosValue);
