import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Template } from './../template/template'
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class TemplateService{
    constructor ( private http: HttpClient){}

    registrarTemplate(template: Template) : Observable<Boolean>{
        const templateFormatado = {
            nome_template: template.nome_template,
            extensao_arquivo: template.extensao_arquivo,
            quantidade_campos: template.quantidade_campos,
            criador_template: template.criador_template,
            campos_template: template.id_campo_template
        }
        return this.http.post<Boolean>('http://localhost:5000/template/registrar', templateFormatado);
    }

    listarTodosTemplates() : Observable<any>{
        return this.http.get<any>('http://localhost:5000/template/listar-templates-cadastrados');
    }

    buscarTemplatePorId(id_template: number) : Observable<any>{
        return this.http.get<any>(`http://localhost:5000/template/buscar-template/id/${id_template}`);
    }

    buscarTemplatePorNome(nome_template: string): Observable<any>{
        return this.http.get<any>(`http://localhost:5000/template/buscar-template/nome_template/${nome_template}`);
    }

    buscarTemplatePorFormato(formato_arquivo: string): Observable<any>{
        return this.http.get<any>(`http://localhost:5000/template/buscar-template/formato/${formato_arquivo}`, {observe: 'response'});
    }

    buscarTemplatePorMatriculaCriador(matricula_criador: string): Observable<any>{
        return this.http.get<any>(`http://localhost:5000/template/buscar-template/matricula/${matricula_criador}`);
    }

    buscarMatriculaPorStatus(status_template: string): Observable<any>{
        return this.http.get<any>(`http://localhost:5000/template/buscar-template/status/${status_template}`);
    }

    alterarStatusTemplate(id_template: any): Observable<any>{
        return this.http.put<any>('http://localhost:5000/template/alterar-status', id_template);
    }

    downloadTemplateArquivo(id_template: any): Observable<any>{
        return this.http.post<any>('http://localhost:5000/arquivo/criar-arquivo/template-id', id_template)
    }
}