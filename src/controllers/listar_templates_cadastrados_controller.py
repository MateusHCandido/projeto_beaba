from flask import Blueprint, jsonify
from services.listar_templates_cadastrados_service import listar_templates
import json

listar_templates_cadastrados = Blueprint('listar_templates_cadastrados', __name__)

@listar_templates_cadastrados.route('/template/listar-templates-cadastrados', methods=['GET'])
def listrar_templates():
    lista_preenchida, templates = listar_templates()

    if lista_preenchida:
        return jsonify(templates), 200
    return  jsonify(), 400