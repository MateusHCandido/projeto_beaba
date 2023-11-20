import csv
import psycopg2
import pandas as pd
from openpyxl import Workbook
import xlwt

from entities.campo_template import CampoTemplateResponse, TipoDado
from entities.template_arquivo import Template


def criar_arquivo_template(id_template):
    template = buscar_dados_template(id_template)
    nome_arquivo = f'{template.nome_template}{template.extensao_arquivo}'
    nome_campos = []
    tipo_dados = []

    for campo_template in template.campos_template:
        print(campo_template)
        nome_campos.append(campo_template.nome_campo)
        tipo_dados.append(definir_tipo_dado(TipoDado(campo_template.tipo_dado), template.extensao_arquivo))
    
    if template.extensao_arquivo == '.xls':
        return criar_arquivo_xls(nome_campos, tipo_dados, nome_arquivo)
    elif template.extensao_arquivo == '.xlsx':
        return criar_arquivo_xlsx(nome_campos, tipo_dados, nome_arquivo)
    else:
        return criar_arquivo_csv(nome_campos, tipo_dados, nome_arquivo)
    
    return False

def buscar_dados_template(id_template):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()

    consulta = """ SELECT * FROM "SGET"."template"
                    INNER JOIN "SGET"."template_campo_template" ON template.id_template = template_campo_template.id_template
                    INNER JOIN "SGET"."campo_template" ON template_campo_template.id_campo_template = campo_template.id_campo_template
                        WHERE template.id_template = %s
                """
    
    cursor.execute(consulta, (id_template,))
    template = cursor.fetchall()

    cursor.close()
    db_conn.close()

    
    if len(template) != 0:
        campos_template = []
        templates = []

        for campo_template in template:
            campos_template.append( CampoTemplateResponse(campo_template[10], campo_template[11], campo_template[12]) )  
        

        template_response = Template(
        id_template = template[0][0],
        nome_template = template[0][1],
        extensao_arquivo = template[0][2],
        quantidade_campos = template[0][4],
        matricula_criador = template[0][6],
        data_criacao = template[0][3],
        status_template = template[0][5],
        campos_template = campos_template
        )

        templates.append( template_response )
       
        return templates[0]

def criar_arquivo_csv(nome_campos, tipo_dados, nome_arquivo):


    if len(nome_campos) == len(tipo_dados):
        df = pd.DataFrame(columns=nome_campos)
        
        for campo, tipo_dado in zip(nome_campos, tipo_dados):
            df[campo] = df[campo].astype(tipo_dado)
    else:
        #deu erro
        return False
    print(df)
    print(df.dtypes)

    df.to_csv(nome_arquivo, index=False, encoding='latin-1', sep=';', decimal='.')
    
    return True

def criar_arquivo_xls(nome_campos, tipo_dados, nome_arquivo):
    wb = xlwt.Workbook()

    sheet = wb.add_sheet('Folha 1')

    estilos = [xlwt.XFStyle() for _ in range( len(nome_campos) )]
    for i, tipo_dado in enumerate(tipo_dados):
        if tipo_dado == "string":
            estilos[i].num_format_str = '@' 
        elif tipo_dado == "int":
            estilos[i].num_format_str = '0'  
        elif tipo_dado == "float":
            estilos[i].num_format_str = '0.00'  
        elif tipo_dado == "bool":
            estilos[i].num_format_str = 'BOOLEAN'  
        elif tipo_dado == "datetime64[ns]":
            estilos[i].num_format_str = 'DD/MM/YYYY'  

    for i, coluna in enumerate(nome_campos):
        sheet.write(0, i, coluna, estilos[i])

    for row_idx in range(1, 9999):
        for col_idx, tipo_dado in enumerate(tipo_dados):
            sheet.write(row_idx, col_idx, "", estilos[col_idx])
    
    wb.save(nome_arquivo)

    return True

def criar_arquivo_xlsx(nome_campos, tipo_dados, nome_arquivo):
    wb = xlwt.Workbook()

    sheet = wb.add_sheet('Folha 1')

    estilos = [xlwt.XFStyle() for _ in range( len(nome_campos) )]
    for i, tipo_dado in enumerate(tipo_dados):
        print(f"Coluna: {nome_campos[i]}, Tipo de Dado: {tipo_dado}")
        if tipo_dado == "string":
            estilos[i].num_format_str = '@' 
        elif tipo_dado == "int":
            estilos[i].num_format_str = '0'  
        elif tipo_dado == "float":
            estilos[i].num_format_str = '0.00'  
        elif tipo_dado == "bool":
            estilos[i].num_format_str = 'BOOLEAN'  
        elif tipo_dado == "datetime64[ns]":
            estilos[i].num_format_str = 'DD/MM/YYYY'  

    for i, coluna in enumerate(nome_campos):
        sheet.write(0, i, coluna, estilos[i])

    for row_idx in range(1, 9999):
        for col_idx, tipo_dado in enumerate(tipo_dados):
            sheet.write(row_idx, col_idx, "", estilos[col_idx])
    
    wb.save(nome_arquivo)

    return True

def definir_tipo_dado(tipo_dado, extensao_arquivo):
    if tipo_dado == TipoDado.TEXTO:
        return 'string'
    elif tipo_dado == TipoDado.DATA:
        return 'datetime64[ns]'
    elif tipo_dado == TipoDado.NUMERO_INTEIRO:
        return 'int'
    elif tipo_dado == TipoDado.NUMERO_DECIMAL:
        return 'float'
    elif tipo_dado == TipoDado.LOGICO:
        return 'bool'
    

info_banco = {
    "host": "localhost",
    "port": 5432,
    "database": "SGET",
    "user": "postgres",
    "password": "postgres"
}