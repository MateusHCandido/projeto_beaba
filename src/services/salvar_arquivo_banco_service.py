import psycopg2
import datetime


def enviar_arquivo_banco(nome_arquivo, id_template, matricula_criador, path_arquivo):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()

    consulta = """INSERT INTO "SGET"."arquivo_upload"(nome_arquivo, caminho_upload_arquivo, data_registro_arquivo, matricula_criador_arquivo, 
                                                      id_template_referencia)
                    VALUES (%s, %s, %s, %s, %s) """

    data_atual = datetime.datetime.now()

    cursor.execute(consulta, (nome_arquivo, path_arquivo, data_atual, matricula_criador, id_template))

    
    db_conn.commit()

    cursor.close()
    db_conn.close()



info_banco = {
    "host": "localhost",
    "port": 5432,
    "database": "SGET",
    "user": "postgres",
    "password": "postgres"
}