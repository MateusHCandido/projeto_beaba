import psycopg2
from entities.template_arquivo import Template
 


def listar_templates():
    db_conn = psycopg2.connect(**info_banco)
    cursor = db_conn.cursor()
    
    consulta = """SELECT * FROM "SGET"."template" """
    
    cursor.execute(consulta)

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



info_banco = {
    "host": "localhost",
    "port": 5432,
    "database": "SGET",
    "user": "postgres",
    "password": "postgres"
}
