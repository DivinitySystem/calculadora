// Declarando as variáveis relacionadas ao DOM
const section = document.getElementsByTagName("section")[0];
const table = document.getElementsByTagName("table")[0];
const firstTd = document.createElement("tr");
const secondTd = document.createElement("tr");
const tirdTd = document.createElement("tr");
const fortTd = document.createElement("tr");
const show = document.createElement("div");
const result = document.createElement("div");
// Colocando as variáveis dentro do DOM, especificamente nessa ordem

table.appendChild(show);
table.appendChild(firstTd);
table.appendChild(secondTd);
table.appendChild(tirdTd);
table.appendChild(fortTd);

// Declarar as variaveis e funções nescessárias

let str = "";

const handleClick = (value) => {
  if (str[str.length - 1] === undefined && typeof value !== "string") {
    str += value;
  } else if (isNaN(str[str.length - 1]) !== isNaN(value)) {
    str += value;
  } else if (typeof value === "number") {
    str += value;
  }
  show.innerText = str;
};

const handleReset = () => {
  str = "";
  show.innerText = "";
};

const parseCalculationString = (str) => {
  // transformando string em array
  let calculation = [],
    current = "";
  for (let i = 0, ch; (ch = str.charAt(i)); i++) {
    if ("*/+-".indexOf(ch) > -1) {
      if (current == "" && ch == "-") {
        current = "-";
      } else {
        calculation.push(parseFloat(current), ch);
        current = "";
      }
    } else {
      current += str.charAt(i);
    }
  }
  if (current != "") {
    calculation.push(parseFloat(current));
  }
  return calculation;
};

const calculate = (calc) => {
  // Calculando e retornando o numero
  let operations = [
      { "*": (a, b) => a * b, "/": (a, b) => a / b },
      { "+": (a, b) => a + b, "-": (a, b) => a - b },
    ],
    newCalc = [],
    currentOperation;

  for (let i = 0; i < operations.length; i++) {
    for (let j = 0; j < calc.length; j++) {
      if (operations[i][calc[j]]) {
        currentOperation = operations[i][calc[j]];
      } else if (currentOperation) {
        newCalc[newCalc.length - 1] = currentOperation(
          newCalc[newCalc.length - 1],
          calc[j]
        );

        currentOperation = null;
      } else {
        newCalc.push(calc[j]);
      }
    }

    calc = newCalc;
    newCalc = [];
  }

  if (calc.length > 1) {
    console.log(calc);
    return calc;
  } else {
    return calc[0];
  }
};

const handleCalculate = () => {
  const arr = parseCalculationString(str);
  const res = calculate(arr);
  if (!!res && res !== Infinity) {
    str = `${res}`;
    show.innerText = str;
  }
};

// Gerando as divs com os numeros

for (let i = 0; i < 10; i++) {
  const td = document.createElement("td");
  td.innerText = i;
  td.onclick = () => handleClick(i);
  if (i !== 0 && i < 4) {
    firstTd.appendChild(td);
  }
  if (i > 3 && i < 7) {
    secondTd.appendChild(td);
  }
  if (i > 6) {
    tirdTd.appendChild(td);
  }
}

// Gerando as tds com sinais e colocando elas em seus respectivos locais

const plus = document.createElement("td");
plus.innerText = "+";
firstTd.appendChild(plus);
plus.onclick = () => handleClick("+");

const minus = document.createElement("td");
minus.innerText = "-";
minus.onclick = () => handleClick("-");
secondTd.appendChild(minus);

const multiply = document.createElement("td");
multiply.innerText = "x";
tirdTd.appendChild(multiply);
multiply.onclick = () => handleClick("*");

// Fazendo o ultimo tr, com botao de reset, e , e 0 e =

const reset = document.createElement("td");
reset.innerText = "C";
reset.classList = "reset";
reset.onclick = () => handleReset();
fortTd.appendChild(reset);

const zero = document.createElement("td");
zero.innerText = "0";
zero.onclick = () => handleClick(0);
fortTd.appendChild(zero);

const equal = document.createElement("td");
equal.innerText = "=";
equal.classList = "equal";
equal.onclick = () => handleCalculate();
fortTd.appendChild(equal);

const divide = document.createElement("td");
divide.innerText = "/";
divide.onclick = () => handleClick("/");
fortTd.appendChild(divide);

const dot = document.createElement("td");
dot.innerText = ",";
dot.onclick = () => handleClick(".");
fortTd.appendChild(dot);
