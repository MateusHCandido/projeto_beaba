import { CampoTemplate } from "./campo-template";

export enum StatusTemplate{
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
}

export class Template{
    id_template?: number;
    nome_template?: string;
    extensao_arquivo?: string;
    data_criacao?: Date;
    quantidade_campos?: number;
    status_template?: StatusTemplate;
    criador_template?: string;
    id_campo_template?: CampoTemplate[];


}

export class TemplateRequest{
    id_template?: number;
    nome_template?: string;
    extensao_arquivo?: string;
    data_criacao?: Date;
    quantidade_campos?: number;
    status_template?: StatusTemplate;
    criador_template?: string;
    id_campo_template?: CampoTemplate[];

    constructor(template: any){
        this.id_template = template.id_template;
        this.nome_template = template.nome_template;
        this.extensao_arquivo = template.extensao_arquivo;
        this.data_criacao = template.data_criacao;
        this.quantidade_campos = template.quantidade_campos;
        this.status_template = template.status_template;
        this.criador_template = template.matricula_criador;
        this.id_campo_template = template.campos_template;
    }
}