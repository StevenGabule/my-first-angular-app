import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  displayValue = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondNumber = false;

  append(value: string): void {
    if(this.waitForSecondNumber) {
      this.displayValue = value;
      this.waitForSecondNumber = false;
    } else {
      this.displayValue === '0' ? this.displayValue = value : this.displayValue += value
    }
  }

  clear() : void {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  backspace() : void {
    this.displayValue = this.displayValue.slice(0, -1) || '0';
  }

  chooseOperator(operator: string): void {
    if(this.firstOperand === null) {
      this.firstOperand = parseFloat(this.displayValue)
    } else if(this.operator) {
      const result = this.calculate();
      this.displayValue = String(result)
      this.firstOperand = result;
    }
    this.operator = operator;
    this.waitForSecondNumber = true;
  }

  calculate() : number {
    if(this.firstOperand === null || this.operator === null) {
      return parseFloat(this.displayValue)
    }
    const secondOperand = parseFloat(this.displayValue);
    let result: number;

    switch (this.operator) {
      case '+':
        result = this.firstOperand + secondOperand;
        break;
      case '-':
        result = this.firstOperand - secondOperand;
        break;
      case '*':
        result = this.firstOperand * secondOperand;
        break;
      case '/':
        result = this.firstOperand / secondOperand;
        break;
      case '%':
        result = this.firstOperand % secondOperand;
        break;
      default:
        result = secondOperand;
    }
    return result;
  }

  equals(): void {
    const result = this.calculate()
    this.displayValue = String(result)
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
