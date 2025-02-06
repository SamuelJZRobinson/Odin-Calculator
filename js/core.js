function operate(num1,operator,num2){
  switch(operator){
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

n1 = 5;
n2 = 10;

console.log(n1,"+",n2,"=",operate(n1,"+",n2));
console.log(n1,"-",n2,"=",operate(n1,"-",n2));
console.log(n1,"*",n2,"=",operate(n1,"*",n2));
console.log(n1,"/",n2,"=",operate(n1,"/",n2));