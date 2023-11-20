import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-dialogo-confirmacao',
  templateUrl: './dialogo-confirmacao.component.html',
  styleUrls: ['./dialogo-confirmacao.component.css']
})
export class DialogoConfirmacaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogoConfirmacaoComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: Usuario) { }

  ngOnInit(): void {
  }

}
