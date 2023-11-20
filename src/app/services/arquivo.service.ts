import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class ArquivoService{
    constructor ( private http: HttpClient){}

    validarArquivo(arquivo: any) : Observable<Boolean>{
        return this.http.post<Boolean>('http://localhost:5000/arquivo/validar',arquivo);
    }

    dashboardInfo() : Observable<any>{
        return this.http.get<any>('http://localhost:5000/arquivos/dashboard/info');
    }
}