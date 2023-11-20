import { Component, OnInit } from '@angular/core';
import { CompartilharDadosService } from 'src/app/services/compartilhar-dados.service';
import { Usuario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuario = new Usuario(this.dadosUsuario.getDados());
  

  constructor( private dadosUsuario: CompartilharDadosService ) { }

  ngOnInit(): void {
  }

}
