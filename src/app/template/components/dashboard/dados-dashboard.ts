export class ArquivoUpload {
    caminhoArquivo: string;
    dataCriacao: string;
    idUploadArquivo: number;
    idTemplateReferencia: number;
    matriculaCriador: string;
    nomeArquivo: string;

    constructor(
        caminhoArquivo: string,
        dataCriacao: string,
        idUploadArquivo: number,
        idTemplateReferencia: number,
        matriculaCriador: string,
        nomeArquivo: string
    ){
        this.caminhoArquivo = caminhoArquivo;
        this.dataCriacao = dataCriacao;
        this.idUploadArquivo = idUploadArquivo;
        this.idTemplateReferencia = idTemplateReferencia;
        this.matriculaCriador = matriculaCriador;
        this.nomeArquivo = nomeArquivo;
    }
}

export class PercentualExtensaoArquivos{
    formato: string;
    percentual: number;

    constructor(formato: string, percentual: number){
        this.formato = formato;
        this.percentual = percentual;
    }
    
}

