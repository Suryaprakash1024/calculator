import { Component } from '@angular/core';

@Component({
  selector: 'app-sip',
  templateUrl: './sip.component.html',
  styleUrls: ['./sip.component.scss']
})
export class SipComponent {
  investmentAmount: number = 1000;
  monthlyContribution: number = 1000;
  interestRate: number = 7;
  investmentDuration: number = 12;
  totalAmount: number = 0;
  sipResults: { year: number, totalAmount: number }[] = [];

  calculateSIP() {
    this.sipResults = [];
    const monthlyRate = this.interestRate / 12 / 100;
    const totalMonths = this.investmentDuration * 12;

    let futureValue = this.investmentAmount;
    for (let i = 1; i <= totalMonths; i++) {
      futureValue += this.monthlyContribution;
      futureValue *= (1 + monthlyRate);

      if (i % 12 === 0 || i === totalMonths) {
        const yearData = {
          year: Math.ceil(i / 12),
          totalAmount: +futureValue.toFixed(0)
        };
        this.sipResults.push(yearData);
      }
    }

    this.totalAmount = futureValue;
  }

}
