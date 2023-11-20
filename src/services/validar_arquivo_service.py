import numpy
import psycopg2
from entities.campo_template import CampoTemplateResponse, TipoDado
from entities.template_arquivo import Template
from services.criar_arquivo_service import definir_tipo_dado
import pandas as pd

def validar_info_arquivo_xls(df, id_template):
    template = buscar_dados_template( str(id_template) )

    #dados template
    nome_campos_template, tipo_dados_template = buscar_info_campos( template )
    quantidade_campos_template = template.quantidade_campos

    #juntando dados template em um dicionário
    campos_template = dict(zip(nome_campos_template, tipo_dados_template))
    
    #dado df
    nome_campos_df = df.columns.tolist()
    quantidade_campos_df = len( nome_campos_df )

    #validação dos dados
    quantidade_campos_equivalente = quantidade_campos_df == quantidade_campos_template
    nome_campos_equivalentes = all(campo in nome_campos_template for campo in nome_campos_df)

    print(df.dtypes)
    if quantidade_campos_equivalente and nome_campos_equivalentes:
        for campo in nome_campos_df:
            tipo_dado_campo = campos_template[campo]
            quantidade_dados_linha = df[campo].count() 
            for linha in range(0, quantidade_dados_linha):
                print(df.loc[linha, campo], 'TIPO DADO: ', tipo_dado_campo)
                if tipo_dado_campo == 'str':
                    if isinstance(df.loc[linha, campo], str):
                        print('ok')
                        continue
                    else:
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
                elif tipo_dado_campo == 'int':
                    if isinstance(df.loc[linha, campo], numpy.int64):
                        continue
                    else:  
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
                elif tipo_dado_campo == 'float':
                    if isinstance(df.loc[linha, campo], float):
                        continue
                    else:  
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
                elif tipo_dado_campo == 'datetime64[ns]':
                    if isinstance(df.loc[linha, campo], pd.Timestamp):
                        continue
                    else:
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
                elif tipo_dado_campo == 'bool':
                    if isinstance(df.loc[linha, campo], object):
                        continue
                    else:  
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
        return True

def validar_info_arquivo_xlsx(df, id_template):
    template = buscar_dados_template( str(id_template) )

    #dados template
    nome_campos_template, tipo_dados_template = buscar_info_campos( template )
    quantidade_campos_template = template.quantidade_campos

    #juntando dados template em um dicionário
    campos_template = dict(zip(nome_campos_template, tipo_dados_template))
    
    #dado df
    nome_campos_df = df.columns.tolist()
    quantidade_campos_df = len( nome_campos_df )

    #validação dos dados
    quantidade_campos_equivalente = quantidade_campos_df == quantidade_campos_template
    nome_campos_equivalentes = all(campo in nome_campos_template for campo in nome_campos_df)

    print(df.dtypes)
    if quantidade_campos_equivalente and nome_campos_equivalentes:
        for campo in nome_campos_df:
            tipo_dado_campo = campos_template[campo]
            quantidade_dados_linha = df[campo].count() 
            for linha in range(0, quantidade_dados_linha):
                print(df.loc[linha, campo], 'TIPO DADO: ', tipo_dado_campo)
                if tipo_dado_campo == 'str':
                    if isinstance(df.loc[linha, campo], str):
                        print('ok')
                        continue
                    else:
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
                elif tipo_dado_campo == 'int':
                    if isinstance(df.loc[linha, campo], numpy.int64):
                        continue
                    else:  
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
                elif tipo_dado_campo == 'float':
                    if isinstance(df.loc[linha, campo], float):
                        continue
                    else:  
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
                elif tipo_dado_campo == 'datetime64[ns]':
                    if isinstance(df.loc[linha, campo], pd.Timestamp):
                        continue
                    else:
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
                elif tipo_dado_campo == 'bool':
                    if isinstance(df.loc[linha, campo], object):
                        continue
                    else:  
                        print(f'para o {df.loc[linha, campo]} deu ruim')
                        return False
        return True

def validar_info_arquivo_csv(df, id_template):
    template = buscar_dados_template( str(id_template) )
    nome_campos_template, tipo_dados_template = buscar_info_campos( template )
    quantidade_campos_template = template.quantidade_campos

    campos_template = dict(zip(nome_campos_template, tipo_dados_template))
    
    nome_campos_df = df.columns
    quantidade_campos_df = len(df.columns)

    quantidade_campos_equivalente = quantidade_campos_df == quantidade_campos_template
    nome_campos_equivalentes = all(campo in nome_campos_template for campo in nome_campos_df)
    
    if quantidade_campos_equivalente and nome_campos_equivalentes:
 
        for coluna in range(0, quantidade_campos_df):
            for campo in nome_campos_template:
                if nome_campos_df[coluna] == campo :
                    if campos_template[campo] == 'string': 
                       
                       qtd_linhas_preenchidas = df[campo].count()
                       for linha in range(0, qtd_linhas_preenchidas): 
                           valor_linha = df.iloc[linha, coluna]
                           if isinstance( valor_linha, str ):
                                continue
                           else:
                                return False
                    elif campos_template[campo] == 'int':
                           qtd_linhas_preenchidas = df[campo].count()

                           for linha in range(0, qtd_linhas_preenchidas):
                                valor_linha = df.iloc[linha, coluna]
                                if isinstance( valor_linha, int ) or isinstance( valor_linha, numpy.int64 ):
                                    continue
                                else:
                                    return False
                    elif campos_template[campo] == 'float' :
                           qtd_linhas_preenchidas = df[campo].count()

                           for linha in range(0, qtd_linhas_preenchidas): 

                                valor_linha = df.iloc[linha, coluna]
                                if isinstance( valor_linha, float ) or isinstance( valor_linha, numpy.float64 ):
                                    continue
                                else:
                                    return False
                    elif campos_template[campo] == 'datetime64[ns]':
                           qtd_linhas_preenchidas = df[campo].count()

                           for linha in range(0, qtd_linhas_preenchidas): 

                                valor_linha = df.iloc[linha, coluna]
                                if isinstance( valor_linha, str ):
                                    df[nome_campos_template[coluna]] = pd.to_datetime( df[nome_campos_template[coluna]], format='%d/%m/%y')
                                    
                                elif isinstance(df.iloc[linha, coluna], pd._libs.tslibs.timestamps.Timestamp ):
                                    continue    
                                else:
                                    return False
        return  True

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

def buscar_info_campos(template):
    nome_campos = []
    tipo_dados = []

    for campo_template in template.campos_template:
        nome_campos.append(campo_template.nome_campo)
        tipo_dados.append(definir_tipo_dado(TipoDado(campo_template.tipo_dado), template.extensao_arquivo))
    return nome_campos, tipo_dados

def verificar_extensao_arquivo(id_template):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()

    consulta = """SELECT extensao_arquivo FROM "SGET"."template" WHERE id_template = %s """

    cursor.execute(consulta, (str(id_template),))

    return cursor.fetchall()[0]

    
info_banco = {
    "host": "localhost",
    "port": 5432,
    "database": "SGET",
    "user": "postgres",
    "password": "postgres"
}
