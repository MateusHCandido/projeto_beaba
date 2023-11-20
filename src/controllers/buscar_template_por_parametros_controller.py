from flask import Blueprint, jsonify
from services.buscar_template_por_parametros_service import *

buscar_templates_por_parametros = Blueprint('buscar_templates_por_parametros', __name__)

@buscar_templates_por_parametros.route('/template/buscar-template/id/<id_template>', methods=['GET'])
def buscar_template_com_id(id_template):
    template_localizado, template = buscar_template_por_id(id_template)
    if template_localizado:
        return jsonify(template), 200
    return jsonify({'mensagem': 'Template não localizado'}), 404


@buscar_templates_por_parametros.route('/template/buscar-template/nome_template/<nome_template>', methods=['GET'])
def buscar_template_com_nome(nome_template):
    
    template_localizado, template = buscar_template_por_nome(nome_template)
    
    if template_localizado:
        return jsonify(template), 200
    return jsonify({'mensagem': 'Template não localizado'}), 404


@buscar_templates_por_parametros.route('/template/buscar-template/matricula/<matricula_criador>', methods=['GET'])
def buscar_template_com_matricula_criador(matricula_criador):
    templates_localizados, templates = buscar_template_por_matricula_criador(matricula_criador)
    
    if templates_localizados:
        return jsonify(templates), 200
    return jsonify({'mensagem': 'Template não localizado'}), 404


@buscar_templates_por_parametros.route('/template/buscar-template/status/<status_template>', methods=['GET'])
def buscar_template_com_status_template(status_template):
    templates_localizados,templates = buscar_template_por_status(status_template)
    
    if templates_localizados:
        return jsonify(templates), 200
    return jsonify({'mensagem': 'Template não localizado'}), 404


@buscar_templates_por_parametros.route('/template/buscar-template/formato/<extensao_arquivo>', methods=['GET'])
def buscar_template_com_formato(extensao_arquivo):
    templates_localizados, templates = buscar_template_por_formato(extensao_arquivo)
    
    if templates_localizados:
        return jsonify(templates), 200
    return jsonify({'mensagem': 'Template não localizado'}), 404