import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArquivoService } from 'src/app/services/arquivo.service';
import { ArquivoUpload, PercentualExtensaoArquivos } from './dados-dashboard';
import { Chart, registerables } from 'chart.js'
import { CompartilharDadosService } from 'src/app/services/compartilhar-dados.service';
import { Usuario } from 'src/app/usuario/usuario';
import { PageEvent } from '@angular/material/paginator';
Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("grafFormatoUtilizado", { static: true }) dashboardFormato!: ElementRef;

  usuario = new Usuario(this.dadosUsuario.getDados());
  usuarioAdmin: boolean = false;

  listaArquivos!: ArquivoUpload[];
  listaPercentual: PercentualExtensaoArquivos[] = [];
  quantidadeArquivosCadastrados: number = 0;

  //paginação
  pageSlice!: any;

  constructor(private arquivoService: ArquivoService, private dadosUsuario: CompartilharDadosService) { }

  ngOnInit(): void {
    //carrega as informações com base no perfil
    if (this.usuario.perfil_usuario == 'ADMINISTRADOR'){
      this.usuarioAdmin = true;
    }

    //chama serviço que busca informações do dashboard
    this.arquivoService.dashboardInfo().subscribe( ( response )  => {

      //recebe dados referente ao dashboard
      let listaArquivosUpload = response.lista_arquivo_upload;
      let listaPercentualUpload = response.lista_percentual_upload;

      this.quantidadeArquivosCadastrados += parseInt( response.quantidade_arquivos_cadastrados );
      this.listaArquivos = this.receberDadosArquivo(listaArquivosUpload);
      this.listaPercentual = this.receberPercentualUpload(listaPercentualUpload);
      this.gerarDashboard();
    });

    
  }

  visualizarArquivo(pathArquivo: string) : void{
    window.open(pathArquivo, '_blank')
  }

  OnPageChange(event: PageEvent){
    
    
    const indiceInicial = event.pageIndex * event.pageSize;
    let indiceFinal = indiceInicial + event.pageSize;

    if ( indiceInicial > this.listaArquivos.length ){
      indiceFinal = this.listaArquivos.length;
    }

    this.pageSlice = this.listaArquivos.slice( indiceInicial, indiceFinal );
  }

  receberDadosArquivo(listaArquivosUpload: any){
    let listaArquivos = [];

    for (let arquivo of listaArquivosUpload ){
      listaArquivos.push( new ArquivoUpload( arquivo.caminho_arquivo
        , arquivo.data_criacao
        , arquivo.id_upload_arquivo
        , arquivo.id_template_referencia
        , arquivo.matricula_criador
        , arquivo.nome_arquivo))
    }

    return listaArquivos;
  }

  gerarDashboard(){
    let dadosPercentualDashboard = this.graficoExtensaoMaisUtilizada(this.listaPercentual);

    new Chart(this.dashboardFormato.nativeElement, {
      type: 'bar',
      data: dadosPercentualDashboard,
      options: { scales: { y: { beginAtZero: true } } }
    });

  }

  receberPercentualUpload(listaPercentualUpload: any){
    let listaPercentual = [];

    for ( let extensao of listaPercentualUpload ){
      listaPercentual.push( { formato: extensao.formato, percentual: extensao.percentual } );
    }
    
    return listaPercentual;
  }

  graficoExtensaoMaisUtilizada(listaPercentual: any) {

    let labels: string[] = [];
    let values: number[] = [];

    for(let info of listaPercentual){
      labels.push(info.formato);
      values.push( info.percentual.toFixed(2) );
    }

    const data = {
      labels: labels,
      datasets: [{
        label: 'Porcentagem de uso',
        data: values,
        backgroundColor: [
          'rgba(37, 138, 66)',
          'rgba(37, 138, 66)',
          'rgba(37, 138, 66)'
        ]
      }]
    };

    return data;
  }
}
