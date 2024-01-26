import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  principal: number = 10000;
  interestRate: number = 7;
  timePeriod: number = 3;
  futureValue: number = 20000;

  sipAmount: number = 1000;
  sipDuration: number = 10;
  sipFrequency: string = 'monthly';
  investmentType = 'normal';
  fututeValueWithSIP = 0;

    // Array to store investment data by year
    investmentData: { year: number, investmentValue: number }[] = [];

  // calculateFutureValue() {
  //   // Your existing calculation logic
  //   const r = this.interestRate / 100;
  //   this.futureValue = this.principal * Math.pow(1 + r, this.timePeriod);

  //   // Clear previous investment data
  //   this.investmentData = [];

  //   // Calculate investment value for each year
  //   for (let i = 1; i <= this.timePeriod; i++) {
  //     const yearData = {
  //       year: i,
  //       investmentValue: +((this.principal * Math.pow(1 + r, i)).toFixed(0))
  //     };
  //     this.investmentData.push(yearData);
  //   }

  //   const sipAmountPerPeriod = this.sipAmount * ((1 + r) - 1) / r;
  //   let futureValueWithSIP = 0;
  //   for (let i = 1; i <= this.sipDuration; i++) {
  //     futureValueWithSIP += this.sipAmount * Math.pow(1 + r, (this.sipDuration - i) / 12);
  //   }
  //   futureValueWithSIP += futureValueWithSIP;
  //   this.fututeValueWithSIP = futureValueWithSIP;
  // }
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
  
    if (this.investmentType === 'sip') {
      const totalMonths = this.sipDuration * 12;
      const sipAmountPerPeriod = this.sipAmount * ((1 + r) - 1) / r;
      let futureValueWithSIP = 0;
      for (let i = 1; i <= totalMonths; i++) {
        futureValueWithSIP += sipAmountPerPeriod * Math.pow(1 + r, (totalMonths - i) / 12);
      }
      futureValueWithSIP += this.principal * Math.pow(1 + r, this.timePeriod);
      this.futureValue = futureValueWithSIP;
    }
  }
  
}
