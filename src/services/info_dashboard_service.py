import psycopg2

def arquivos_recem_enviados():
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()

    consulta = """SELECT * FROM "SGET"."arquivo_upload" ORDER BY data_registro_arquivo DESC;"""


    cursor.execute(consulta)

    resultado_busca = cursor.fetchall()
    lista_arquivos = []
    
    if len( resultado_busca ) != 0:
        for arquivo_registrado in resultado_busca:
            arquivo = {
                "id_arquivo_upload": arquivo_registrado[0],
                "nome_arquivo": arquivo_registrado[1],
                "caminho_arquivo":arquivo_registrado[2],
                "data_criacao":arquivo_registrado[3].strftime('%d-%m-%Y %H:%M'),
                "matricula_criador": arquivo_registrado[4],
                "id_template_referencia":arquivo_registrado[5],
            }

            lista_arquivos.append(arquivo)
    return lista_arquivos
    
def analise_template_mais_utilizado():
    # conexão com o banco e fazer consulta da lista de todos os arquivos cadastrados
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()

    consulta = """ SELECT t.extensao_arquivo, COUNT(*) as quantidade_total
                    FROM "SGET"."arquivo_upload" u
                    JOIN "SGET"."template" t ON u.id_template_referencia = t.id_template
                    GROUP BY t.extensao_arquivo;"""

    cursor.execute(consulta)

    resultado = cursor.fetchall()

    if len( resultado ) != 0:
        csv = 0
        xls  = 0
        xlsx = 0

        for info_contagem in resultado:
            if info_contagem[0] == '.csv':
                csv = info_contagem[1]
            elif info_contagem[0] == ".xls":
                xls = info_contagem[1]
            else:
                xlsx = info_contagem[1]
        
        total_arquivos_cadastrados = csv + xls + xlsx
        lista_percentual = []
        percent_csv =(csv / total_arquivos_cadastrados) * 100
        percent_xls = (xls / total_arquivos_cadastrados) * 100
        percent_xlsx = (xlsx / total_arquivos_cadastrados) * 100

        lista_percentual.append( {'formato': 'csv' ,'percentual': percent_csv } )
        lista_percentual.append( {'formato': 'xls' , 'percentual': percent_xls }  )
        lista_percentual.append( {'formato': 'xlsx' , 'percentual': percent_xlsx } )

        return lista_percentual
    return resultado

def quantidade_arquivos_registrados():
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()

    consulta = """SELECT COUNT(*) FROM "SGET"."arquivo_upload"; """

    cursor.execute(consulta)

    quantidade_arquivos_cadastrados = cursor.fetchall()[0][0]

    cursor.close()
    db_conn.close()

    
    return quantidade_arquivos_cadastrados

info_banco = {
    "host": "localhost",
    "port": 5432,
    "database": "SGET",
    "user": "postgres",
    "password": "postgres"
}