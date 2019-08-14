import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IpinfoService } from './ipinfo.service';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ColorPickerModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [IpinfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
