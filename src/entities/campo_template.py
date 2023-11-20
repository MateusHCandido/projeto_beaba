from enum import Enum
from dataclasses import dataclass

class TipoDado(Enum):
    TEXTO = 'TEXTO'
    NUMERO_INTEIRO = 'NUMERO_INTEIRO'
    NUMERO_DECIMAL = 'NUMERO_DECIMAL'
    DATA = 'DATA'
    LOGICO = 'LOGICO'
    VAZIO = 'VAZIO'

@dataclass
class CampoTemplate:
    nome_campo: str
    tipo_dado: TipoDado

@dataclass
class CampoTemplateResponse:
    id_campo_template: int
    nome_campo: str
    tipo_dado: TipoDado