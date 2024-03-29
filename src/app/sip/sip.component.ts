import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sip',
  templateUrl: './sip.component.html',
  styleUrls: ['./sip.component.scss']
})
export class SipComponent  implements OnInit{
  investmentAmount: number = 1000;
  monthlyContribution: number = 1000;
  interestRate: number = 7;
  investmentDuration: number = 12;
  totalAmount: number = 0;
  sipResults: { year: number, totalAmount: number,wealthGained:number }[] = [];
  limitData: number[] = [0,55,100];
ngOnInit(): void {
  this.calculateSIP();
}

  calculateSIP() {
    this.sipResults = [];
    const monthlyRate = this.interestRate / 12 / 100;
    const totalMonths = this.investmentDuration * 12;
    let totalInvestment = this.investmentAmount;

    let futureValue = this.investmentAmount;
    for (let i = 1; i <= totalMonths; i++) {
      futureValue += this.monthlyContribution;
      futureValue *= (1 + monthlyRate);
      totalInvestment += this.monthlyContribution;

      if (i % 12 === 0 || i === totalMonths) {
        const yearData = {
          year: Math.ceil(i / 12),
          totalAmount: +futureValue.toFixed(0),
          wealthGained: +(futureValue - totalInvestment).toFixed(0)
        };
        this.sipResults.push(yearData);
      }
    }
    const lastRec = this.sipResults[this.sipResults.length - 1];
    this.limitData = [0,(lastRec.wealthGained*100/lastRec.totalAmount),100];
    this.totalAmount = futureValue;
  }

}
