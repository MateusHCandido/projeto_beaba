from flask import Blueprint, request, jsonify

from services.info_dashboard_service import *

dashboard_informacoes = Blueprint('dashboard_informacoes', __name__)


@dashboard_informacoes.route ('/arquivos/dashboard/info', methods=['GET'])
def enviar_info_dashboard():
    lista_arquivo_upload = arquivos_recem_enviados()
    lista_percentual_upload = analise_template_mais_utilizado()
    quantidade_arquivos_cadastrados = quantidade_arquivos_registrados()

    dashboard = {
        'lista_arquivo_upload': lista_arquivo_upload,
        'lista_percentual_upload': lista_percentual_upload,
        'quantidade_arquivos_cadastrados': quantidade_arquivos_cadastrados 
    }
    return jsonify(dashboard), 200