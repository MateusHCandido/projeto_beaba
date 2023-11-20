from flask import Blueprint, request, jsonify
from services.criar_arquivo_service import criar_arquivo_template


criar_arquivo = Blueprint('criar_arquivo',__name__)

@criar_arquivo.route('/arquivo/criar-arquivo/template-id', methods = ['POST'])
def criar_arquivo_controller():
    id_template = request.get_json()
    arquivo_criado = criar_arquivo_template(id_template)

    if arquivo_criado:
        return jsonify(True),200
    return jsonify(False), 404
    