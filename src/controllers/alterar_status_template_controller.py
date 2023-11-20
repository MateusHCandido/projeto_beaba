from flask import Blueprint, jsonify, request
from services.alterar_status_template_service import validar_id_template

alterar_status_template = Blueprint('alterar_status_template', __name__)


@alterar_status_template.route('/template/alterar-status', methods=['PUT'])
def alterar_status():
    id_template_request = request.get_json()

    print('AAAA',id_template_request)
    status_template_alterado = validar_id_template(id_template_request)

    if status_template_alterado:
        return jsonify({'mensagem': 'Alteração de status do template concluída'}), 204
    
    return jsonify({'mensagem': 'Não foi possível alterar o status do template'}), 400
    