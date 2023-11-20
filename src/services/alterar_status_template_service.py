import psycopg2


def validar_id_template(id_template):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()
    consulta = """ SELECT status_template FROM "SGET"."template" 
                        WHERE id_template = %s"""
    
    cursor.execute(consulta, (str(id_template),))
    status_template = cursor.fetchall()

    cursor.close()
    db_conn.close()

    template_localizado = len(status_template) != 0 # Se o tamanho for != 0, então template foi localizado
    

    if template_localizado:
        return alterar_stts(str(id_template), status_template[0][0])
    return False

def alterar_stts(id_template, status_template):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()

    if status_template == 'ATIVO':
        consulta = """UPDATE "SGET"."template"
                        SET status_template = 'INATIVO'
                            WHERE id_template = %s"""
        
        cursor.execute(consulta, (id_template,))
        db_conn.commit()
        return True
    
    consulta = """UPDATE "SGET"."template"
                SET status_template = 'ATIVO'
                    WHERE id_template = %s"""
    
    cursor.execute(consulta, (id_template,))
    db_conn.commit()

    cursor.close()
    db_conn.close()
    return True

info_banco = {
    "host": "localhost",
    "port": 5432,
    "database": "SGET",
    "user": "postgres",
    "password": "postgres"
}
