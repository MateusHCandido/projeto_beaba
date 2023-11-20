import psycopg2
from entities.campo_template import CampoTemplate, CampoTemplateResponse
from entities.template_arquivo import Template

def buscar_template_por_nome(nome_template):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()
    
    consulta = """SELECT * FROM "SGET"."template"
	                WHERE nome_template = %s"""
    

    
    cursor.execute(consulta, ( str( nome_template ) ,))

    template = cursor.fetchall()
    print(template)
    cursor.close()
    db_conn.close()

    templates = []
    campos_template = []

    if len(template) != 0:

        for template_response in template:
        
            templates.append( Template(
                id_template = template_response[0],
                nome_template = template_response[1],
                extensao_arquivo = template_response[2],
                quantidade_campos = template_response[4],
                matricula_criador = template_response[6],
                data_criacao = template_response[3],
                status_template = template_response[5],
                campos_template = campos_template
                ) )
       
        return True, templates
    return False, templates

def buscar_template_por_status(status_template):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()
    
    consulta = """SELECT * FROM "SGET"."template"
	                WHERE status_template = %s"""
    
    cursor.execute(consulta, ( str( status_template.upper() ) ,))

    template = cursor.fetchall()
    cursor.close()

    templates = []
    campos_template = []

    if len(template) != 0:

        for template_response in template:
        
            templates.append( Template(
                id_template = template_response[0],
                nome_template = template_response[1],
                extensao_arquivo = template_response[2],
                quantidade_campos = template_response[4],
                matricula_criador = template_response[6],
                data_criacao = template_response[3],
                status_template = template_response[5],
                campos_template = campos_template
                ) )
       
        return True, templates
    return False, templates

def buscar_template_por_matricula_criador(matricula_criador):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()
    
    consulta = """SELECT * FROM "SGET"."template"
	                WHERE matricula_criador_template = %s"""
    
    cursor.execute(consulta, ( str( matricula_criador ) ,))

    template = cursor.fetchall()
    cursor.close()

    templates = []
    campos_template = []

    if len(template) != 0:

        for template_response in template:
        
            templates.append( Template(
                id_template = template_response[0],
                nome_template = template_response[1],
                extensao_arquivo = template_response[2],
                quantidade_campos = template_response[4],
                matricula_criador = template_response[6],
                data_criacao = template_response[3],
                status_template = template_response[5],
                campos_template = campos_template
                ) )
       
        return True, templates
    return False, templates

def buscar_template_por_formato(extensao_arquivo):
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()
    
    consulta = """SELECT * FROM "SGET"."template"
	                WHERE extensao_arquivo = %s"""
    
    cursor.execute(consulta, ( str( extensao_arquivo ) ,))

    template = cursor.fetchall()
    cursor.close()

    templates = []
    campos_template = []

    if len(template) != 0:

        for template_response in template:
        
            templates.append( Template(
                id_template = template_response[0],
                nome_template = template_response[1],
                extensao_arquivo = template_response[2],
                quantidade_campos = template_response[4],
                matricula_criador = template_response[6],
                data_criacao = template_response[3],
                status_template = template_response[5],
                campos_template = campos_template
                ) )
       
        return True, templates
    return False, templates

def buscar_template_por_id(id_template):
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
        data_criacao = template[0][3].strftime('%Y-%m-%d %H:%M'),
        status_template = template[0][5],
        campos_template = campos_template
        )

        templates.append( template_response )
       
        return True, templates
    
    return False, templates


info_banco = {
    "host": "localhost",
    "port": 5432,
    "database": "SGET",
    "user": "postgres",
    "password": "postgres"
}

