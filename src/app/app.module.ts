import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';
import { IndianNumberPipe } from 'src/shared/pipes/indian-number.pipe';
import { SipComponent } from './sip/sip.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndianNumberPipe,
    SipComponent
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
