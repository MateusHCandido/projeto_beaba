import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoConfirmacaoComponent } from './dialogo-confirmacao.component';
import { MatDialogModule } from '@angular/material/dialog'



@NgModule({
  declarations: [
    DialogoConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  entryComponents: [MatDialogModule]
})
export class DialogoConfirmacaoModule { }
