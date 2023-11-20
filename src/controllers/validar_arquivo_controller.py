import os
from flask import Blueprint, request, jsonify
from services.salvar_arquivo_banco_service import enviar_arquivo_banco
from services.validar_arquivo_service import *
import pandas as pd

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload




validar_arquivo = Blueprint('validar_arquivo', __name__)


@validar_arquivo.route('/arquivo/validar', methods = ['POST'])
def validar_arquivo_controller():
    arquivo = request.files['file']
    id_template = request.form['idTemplate']
    matricula_criador = request.form['matriculaCriador']
    categoria_pasta_envio = request.form['pasta_destino']

    extensao_arquivo = verificar_extensao_arquivo(id_template)
    template_valido = False
    mimetype = ''
    nome_arquivo = arquivo.filename

    if categoria_pasta_envio != '' and id_template != '':
        if extensao_arquivo[0] == '.xls':
            df = pd.read_excel(arquivo)
            template_valido = validar_info_arquivo_xls(df, id_template) 
            mimetype = 'application/vnd.ms-excel'
        elif extensao_arquivo[0] == '.xlsx':
            df = pd.read_excel(arquivo)
            template_valido = validar_info_arquivo_xlsx(df, id_template)
            mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        else:
            df = pd.read_csv(arquivo, encoding='latin-1', delimiter=',')
            template_valido = validar_info_arquivo_csv(df, id_template)
            mimetype = 'text/csv'
    
    if template_valido:
        DIR = r'C:\Users\980194\Desktop\ESTÁGIO\beaba\back\python_app\src\api'
        service = autenticar_google_drive(DIR)

        id_pasta = (listar_pastas_destino(categoria_pasta_envio))
        
        id_arquivo = enviar_arquivo_google_drive(service, nome_arquivo, nome_arquivo, mimetype, id_pasta)


        path_arquivo = f'https://drive.google.com/file/d/{id_arquivo}/view'

        enviar_arquivo_banco(nome_arquivo, id_template, matricula_criador, path_arquivo)


        return jsonify({'mensagem temp': 'tudo ok'}),200
    return jsonify({'mensagem temp': 'Arquivo com informações inválidas'}),404


def autenticar_google_drive(caminho_diretorio):
    SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive.metadata',
          'https://www.googleapis.com/auth/drive.metadata.readonly']

    token_path = os.path.join(caminho_diretorio, 'token.json')
    credentials_path = os.path.join(caminho_diretorio, 'credentials.json')

    creds = None
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                credentials_path, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    return build('drive', 'v3', credentials=creds)

def enviar_arquivo_google_drive(service, nome_arquivo_local, nome_arquivo_drive, mimetype, id_pasta):
    file_metadata = {'name': nome_arquivo_drive,
                     'parents': [id_pasta]}
    media = MediaFileUpload(nome_arquivo_local, mimetype=mimetype)
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    print('Arquivo enviado com sucesso. ID: %s' % file.get('id'))
    return file.get('id')

def listar_pastas_destino(categoria_pasta_envio):
    DIR = r'C:\Users\980194\Desktop\ESTÁGIO\beaba\back\python_app\src\api'
    service = autenticar_google_drive(DIR)
    
    results = service.files().list(q="mimeType='application/vnd.google-apps.folder'").execute()

    for file in results['files']:
        if file['name'] == categoria_pasta_envio:
            return file['id']


