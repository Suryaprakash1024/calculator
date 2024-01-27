import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  principal: number = 10000;
  interestRate: number = 7;
  timePeriod: number = 3;
  futureValue: number = 20000;
  limitData: number[] = [0,55,100];

  ngOnInit(): void {
    this.calculateFutureValue();
  }

  // Array to store investment data by year
  investmentData: { year: number, investmentValue: number, wealthGained: number, totalWealth: number}[] = [];

  calculateFutureValue() {
    // Your existing calculation logic
    const r = this.interestRate / 100;
    this.futureValue = this.principal * Math.pow(1 + r, this.timePeriod);

    // Clear previous investment data
    this.investmentData = [];
    let totalWealth = this.principal;
    // Calculate investment value for each year
    for (let i = 1; i <= this.timePeriod; i++) {
      const yearData = {
        year: i,
        investmentValue: +((this.principal * Math.pow(1 + r, i)).toFixed(0)),
        wealthGained: +((this.principal * Math.pow(1 + r, i)) - this.principal).toFixed(0),
        totalWealth: +(totalWealth * Math.pow(1 + r, i)).toFixed(0)
      };
      this.investmentData.push(yearData);
      totalWealth = yearData.totalWealth; // Update total wealth for next iteration
    };
    const lastRec = this.investmentData[this.investmentData.length - 1];
    this.limitData = [0,(lastRec.wealthGained*100/lastRec.investmentValue),100];
  }

}
