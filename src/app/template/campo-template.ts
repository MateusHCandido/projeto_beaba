export enum TipoDado{
    TEXTO = 'TEXTO',
    NUMERO_INTEIRO = 'NUMERO_INTEIRO',
    NUMERO_DECIMAL = 'NUMERO_DECIMAL',
    DATA = 'DATA',
    LOGICO = 'LOGICO',
}

export class CampoTemplate{
    id_campo_template?: number;
    nome_campo? : string;
    tipo_dado?: TipoDado;

    constructor(nomeCampo: string, tipoDado: TipoDado){
        this.nome_campo = nomeCampo;
        this.tipo_dado = tipoDado;
    }
}

export class CampoTemplateRequest{
    id_campo_template?: number;
    nome_campo? : string;
    tipo_dado?: TipoDado;

    constructor(campo_template: CampoTemplateRequest){
        this.id_campo_template = campo_template.id_campo_template;
        this.nome_campo = campo_template.nome_campo;
        this.tipo_dado = campo_template.tipo_dado;
    }
}


