from flask import Blueprint, request, jsonify
from services.criar_template_service import criar_template

registro_template = Blueprint('registro_template', __name__)


@registro_template.route('/template/registrar', methods=['POST'])
def registrar_template():
    dados_request = request.get_json()
    criacao_realizada = criar_template( dados_template = dados_request )

    if criacao_realizada:
        return jsonify(True), 200
    return jsonify(False), 400
    

