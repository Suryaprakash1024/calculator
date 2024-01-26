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
  investmentData: { year: number, investmentValue: number }[] = [];

  calculateFutureValue() {
    // Your existing calculation logic
    const r = this.interestRate / 100;
    this.futureValue = this.principal * Math.pow(1 + r, this.timePeriod);

    // Clear previous investment data
    this.investmentData = [];

    // Calculate investment value for each year
    for (let i = 1; i <= this.timePeriod; i++) {
      const yearData = {
        year: i,
        investmentValue: +((this.principal * Math.pow(1 + r, i)).toFixed(0))
      };
      this.investmentData.push(yearData);
    }
  }

}
