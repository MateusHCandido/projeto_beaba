import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartilharDadosService {

  private dadosCompartilhados: any;

  setDados(dados: any) {
    this.dadosCompartilhados = dados;
  }

  getDados() {
    return this.dadosCompartilhados;
  }
}
