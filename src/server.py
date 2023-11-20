from flask import Flask

from controllers import registrar_template_controller
from controllers import alterar_status_template_controller
from controllers import criar_arquivo_controller
from controllers import listar_templates_cadastrados_controller
from controllers import buscar_template_por_parametros_controller
from controllers import validar_arquivo_controller
from controllers import info_dashboard_controller

from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(registrar_template_controller.registro_template)

    app.register_blueprint(alterar_status_template_controller.alterar_status_template)
    
    app.register_blueprint(criar_arquivo_controller.criar_arquivo)
    
    app.register_blueprint(listar_templates_cadastrados_controller.listar_templates_cadastrados)
    
    app.register_blueprint(buscar_template_por_parametros_controller.buscar_templates_por_parametros)
  
    app.register_blueprint(validar_arquivo_controller.validar_arquivo)

    app.register_blueprint(info_dashboard_controller.dashboard_informacoes)
    return app
