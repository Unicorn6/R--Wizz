import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IpinfoService } from './ipinfo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ColorPickerModule,
    HttpClientModule
    // MatLabel,
    // MatSelectModule,
    // MatFormFieldModule,
    // BrowserAnimationsModule
  ],
  providers: [IpinfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
