from enum import Enum
from datetime import datetime
from dataclasses import dataclass
from entities.campo_template import CampoTemplate, CampoTemplateResponse

class StatusTemplate(Enum):
    ATIVO = 'ATIVO'
    INATIVO = 'INATIVO'

@dataclass
class Template:
    id_template: int
    nome_template: str
    extensao_arquivo: str
    quantidade_campos: int
    matricula_criador: str
    data_criacao: datetime
    status_template: str
    campos_template: [CampoTemplateResponse]

@dataclass
class TemplateRequest:
    nome_template: str
    extensao_arquivo: str
    quantidade_campos: int
    matricula_criador: str
    data_criacao: datetime
    status_template: StatusTemplate
