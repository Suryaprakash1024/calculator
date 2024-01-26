import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';
import { SipComponent } from './sip/sip.component';
import { ChartsComponent } from './shared/components/charts/charts.component';
import { IndianNumberPipe } from './shared/pipes/indian-number.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndianNumberPipe,
    SipComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
