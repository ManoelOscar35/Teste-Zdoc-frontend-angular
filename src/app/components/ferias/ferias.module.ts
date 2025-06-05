import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeriasRoutingModule } from './ferias-routing.module';
import { FeriasComponent } from './ferias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FeriasComponent
  ],
  imports: [
    CommonModule,
    FeriasRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class FeriasModule { }
