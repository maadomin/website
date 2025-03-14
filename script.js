"use strict";

var resultDisplayed = false; // flag to keep an eye on what output is displayed
var leftValue = 430;

function moveElementResult(e) {
    leftValue = 430;
    e.style.left = (Number(leftValue) - 30*e.length) + "px";
    leftValue -= 30*e.length;
}

function moveElement(e) {
    if(leftValue < 430) {
        leftValue =  e.style.left.replace("px", "");
    }
    e.style.left = (Number(leftValue) - 30) + "px";
    leftValue -= 30;
}

function processNumber(e) {
    var input = document.getElementById('user-input');
    const title = e.getAttribute('title');
    var currentString = input.innerHTML;
    if(currentString.length == 12) return;

    var lastChar = currentString[currentString.length - 1];
    var numberStr = 'NaN';
    switch(title) {
        case 'zero':
            numberStr = '0';
            break;
        case 'one':
            numberStr = '1';
            break;
        case 'two':
            numberStr = '2';
            break;
        case 'three':
            numberStr = '3';
            break;
        case 'four':
            numberStr = '4';
            break;
        case 'five':
            numberStr = '5';
            break;
        case 'six':
            numberStr = '6';
            break;
        case 'seven':
            numberStr = '7';
            break;
        case 'eight':
            numberStr = '8';
            break;
        case 'nine':
            numberStr = '9';
            break;
    }
    if (resultDisplayed === false) {
        input.innerHTML += numberStr;
        moveElement(input);
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        // if result is currently displayed and user pressed an operator
        // we need to keep on adding to the string for next operation
        resultDisplayed = false;
        input.innerHTML += numberStr;
        moveElement(input);
    } else {
        resultDisplayed = false;
        input.innerHTML = "";
        input.innerHTML += numberStr;
        leftValue = 430;
    }
}

function processOperator(e) {
    var input = document.getElementById('user-input');
    const title = e.getAttribute('title');
    var currentString = input.innerHTML;
    if(currentString.length == 12) return;

    var lastChar = currentString[currentString.length - 1];

    var opStr = '';
    switch(title) {
        case 'add':
            opStr = '+';
            break;
        case 'sub':
            opStr = '-';
            break;
        case 'mult':
            opStr = "×";
            break;
        case 'div':
            opStr = '÷';
            break;
    }
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        var newString = currentString.substring(0, currentString.length - 1) + opStr;
        input.innerHTML = newString;
        moveElement(input);
    } else if (currentString.length == 0) {
        // if first key pressed is an opearator, don't do anything
        console.log("enter a number first");
      } else {
        // else just add the operator pressed to the input
        input.innerHTML += opStr;
        moveElement(input);
      }
}

function processResult(e) {
    var input = document.getElementById('user-input');
    var inputString = input.innerHTML;
    
    var numbers = inputString.split(/\+|\-|\×|\÷/g);

    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    var divide = operators.indexOf("÷");
    while (divide != -1) {
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      operators.splice(divide, 1);
      divide = operators.indexOf("÷");
    }
  
    var multiply = operators.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, parseFloat(numbers[multiply]) * parseFloat(numbers[multiply + 1]));
      operators.splice(multiply, 1);
      multiply = operators.indexOf("×");
    }
  
    var subtract = operators.indexOf("-");
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operators.splice(subtract, 1);
      subtract = operators.indexOf("-");
    }
  
    var add = operators.indexOf("+");
    while (add != -1) {
      // using parseFloat is necessary, otherwise it will result in string concatenation :)
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operators.splice(add, 1);
      add = operators.indexOf("+");
    }
  
    input.innerHTML = numbers[0];
    moveElementResult(input);
    resultDisplayed = true;
}