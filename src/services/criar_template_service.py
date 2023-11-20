from typing import List
import psycopg2
from datetime import datetime
from entities.template_arquivo import Template, StatusTemplate, TemplateRequest
from entities.campo_template import CampoTemplate, TipoDado


def criar_template(dados_template):
    campos_template = []
    template = TemplateRequest(
        nome_template = dados_template['nome_template'], 
        extensao_arquivo = dados_template['extensao_arquivo'],
        quantidade_campos = dados_template['quantidade_campos'],
        matricula_criador = dados_template['criador_template'],
        data_criacao = datetime.now(),
        status_template = StatusTemplate.INATIVO)

    dados_campo_template = dados_template['campos_template']
    for campo in dados_campo_template:
        campo_template = CampoTemplate( nome_campo = campo['nome_campo'], tipo_dado = definir_tipo_dado( campo['tipo_dado'] ) )
        campos_template.append( campo_template )

    template_valido = validar_dados_template(template)
    campos_validos = validar_campos_template(campos_template)
    
    if template_valido == True and campos_validos == True:
        id_campos_localizados_banco = analise_paridade_campos( campos_template ) 

        if len( id_campos_localizados_banco ) != 0:
            campos_template = filtrar_campos_template( campos_template, id_campos_localizados_banco )
        id_template = salvar_template(template)
        lista_campo_template_id = salvar_campo_template(campos_template)
        salvar_template_campo_template(id_template, lista_campo_template_id, id_campos_localizados_banco)
        return True 
    return False


def salvar_template_campo_template(id_template, lista_campo_template_id: List[int], id_campos_localizados_banco):
    db_conn = psycopg2.connect(**info_banco)
    tct_cursor = db_conn.cursor()
    consulta = ("""INSERT INTO "SGET"."template_campo_template" (id_template, id_campo_template) VALUES ( %s, %s ) """)
    
    for campo_template_id in lista_campo_template_id:
        tct_cursor.execute( consulta, (id_template, campo_template_id) )
    
    for campo_template_id in id_campos_localizados_banco:
        tct_cursor.execute ( consulta, (id_template, campo_template_id))

    db_conn.commit()

    tct_cursor.close()
    db_conn.close()

def salvar_template(template):
        db_conn = psycopg2.connect(**info_banco)
        template_cursor = db_conn.cursor()

        template_insert = ("""INSERT INTO "SGET"."template" (nome_template, extensao_arquivo, 
                                                            quantidade_campos, matricula_criador_template,
                                                            data_criacao, status_template)
                                VALUES ( %s, %s, %s, %s, %s, %s )""")
    
        template_cursor.execute(template_insert, (template.nome_template, template.extensao_arquivo, 
                                                  int(template.quantidade_campos), template.matricula_criador, 
                                                  template.data_criacao, template.status_template.value))
        
        template_cursor.execute(" SELECT lastval() ")

        db_conn.commit()

        id_template = template_cursor.fetchone()[0]

        template_cursor.close()
        db_conn.close()

        return id_template

def salvar_campo_template(dados_campo_template):
    db_conn = psycopg2.connect(**info_banco)
    campo_template_cursor = db_conn.cursor()

    lista_campo_template_id = []
    consulta = """INSERT INTO "SGET"."campo_template" (nome_campo, tipo_dado) VALUES (%s, %s)"""

    for campo in dados_campo_template:
        print('linha 88', campo)
        if isinstance(campo, CampoTemplate):
            campo_template_cursor.execute(consulta, (campo.nome_campo, campo.tipo_dado.value))

        campo_template_cursor.execute("SELECT lastval()")
        lista_campo_template_id.append( campo_template_cursor.fetchone()[0] )

    db_conn.commit()

    campo_template_cursor.close()
    db_conn.close()

    return lista_campo_template_id

def validar_dados_template(template: Template):
    # verifica se os campos estão preenchidos
    template_preenchido = all([template.nome_template, template.extensao_arquivo, template.quantidade_campos
                               , template.matricula_criador , template.data_criacao, template.status_template])
    # verifica se o campo status_template entra como default, INATIVO
    if template_preenchido:
        if template.status_template == StatusTemplate.INATIVO:
            return True
    return False

def validar_campos_template(dados_campo_template: List[CampoTemplate]):
    #verifica se o campo está vazio
    for campo in dados_campo_template:
        if not all(  [campo.nome_campo, campo.tipo_dado]  ):
            return False
        
    #verifica se os nomes estão repetidos
    campos_analisados = set() 
    for campo in dados_campo_template:
        if not campo.nome_campo in campos_analisados:
            campos_analisados.add( campo.nome_campo )

    if len( dados_campo_template ) == len( campos_analisados ):
        return True
    
    return False

def analise_paridade_campos(dados_campo_template : List[CampoTemplate]):
    db_conn = psycopg2.connect(**info_banco)
    
    id_campos_dados_equivalentes = []

    for campo in dados_campo_template:
        cursor = db_conn.cursor()

        nome_campo = campo.nome_campo
        tipo_dado = campo.tipo_dado.value

        consulta = """SELECT id_campo_template FROM "SGET"."campo_template" 
                            WHERE nome_campo = %s  AND tipo_dado = %s """
        
        cursor.execute(consulta, (nome_campo, tipo_dado))

        resultado_busca = cursor.fetchall()
        
        if len( resultado_busca ) != 0:
            id_campos_dados_equivalentes.append(resultado_busca[0][0])

        cursor.close()
            
    db_conn.close()
    
    return id_campos_dados_equivalentes 

def filtrar_campos_template(campos_template: List[CampoTemplate], lista_id_campos_localizados_no_banco):
    campos_nao_repetidos = []
    campos_localizados = []

    for id_localizado in lista_id_campos_localizados_no_banco:
        db_conn = psycopg2.connect(**info_banco)
        cursor = db_conn.cursor()

        consulta = """SELECT nome_campo, tipo_dado FROM "SGET"."campo_template" 
        WHERE id_campo_template = %s """
    
        cursor.execute (consulta, (str(id_localizado),))
        campo_template_banco = cursor.fetchall()[0]

        campos_localizados.append( CampoTemplate(campo_template_banco[0], TipoDado(campo_template_banco[1])) )
    
    for campo_template in campos_localizados:
        if campo_template in campos_template:
            campos_template.remove(campo_template)

    return campos_template 
    
def definir_tipo_dado(tipo_dado):
    if tipo_dado == 'TEXTO':
        return TipoDado.TEXTO
    elif tipo_dado == 'NUMERO_INTEIRO':
        return TipoDado.NUMERO_INTEIRO
    elif tipo_dado == 'NUMERO_DECIMAL':
        return TipoDado.NUMERO_DECIMAL
    elif tipo_dado == 'DATA':
        return TipoDado.DATA
    elif tipo_dado == 'LOGICO':
        return TipoDado.LOGICO
    
def definir_status_template(status_template):
    if status_template == 'ATIVO':
        return StatusTemplate.ATIVO
    elif status_template == 'INATIVO':
        return StatusTemplate.INATIVO
    

info_banco = {
    "host": "localhost",
    "port": 5432,
    "database": "SGET",
    "user": "postgres",
    "password": "postgres"
}
