from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from django.utils import timezone

# ==============================
# Usuário (estende AbstractUser)
# ==============================
class Usuario(AbstractUser):
    cargo = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username
    
# ==============================
# Produto
# ==============================
class Produto(models.Model):
    # Categorias pré-definidas
    CATEGORIAS = [
        ('SMARTPHONE', 'Smartphone'),
        ('NOTEBOOK', 'Notebook'),
        ('SMART_TV', 'Smart TV'),
        ('OUTRO', 'Outro')
    ]

    produtoId = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=150)
    categoria = models.CharField(max_length=20, choices=CATEGORIAS, default='OUTRO')
    
    # Características técnicas
    tensao = models.CharField(max_length=20, blank=True, null=True)  # Ex: "110V", "220V", "Bivolt"
    dimensoes = models.CharField(max_length=100, blank=True, null=True)  # Ex: "10x20x2 cm"
    resolucao_tela = models.CharField(max_length=50, blank=True, null=True)  # Ex: "1920x1080"
    capacidade_armazenamento = models.CharField(max_length=50, blank=True, null=True)  # Ex: "128GB"
    conectividade = models.CharField(max_length=100, blank=True, null=True)  # Ex: "Wi-Fi, Bluetooth"

    # Informações extras
    fabricante = models.CharField(max_length=100, blank=True, null=True)
    codigoInterno = models.CharField(max_length=50, unique=True)
    estoque_minimo = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    estoque_atual = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return f"{self.nome} ({self.categoria})"
    
# ==============================
# Movimento de Estoque
# ==============================
class Movimentacao(models.Model):
    TIPOS_MOVIMENTACAO = [
        ('entrada', 'Entrada'),
        ('saida', 'Saída'),
    ]

    MovimentacaoId = models.AutoField(primary_key=True)

    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    tipo_movimentacao = models.CharField(max_length=10, choices=TIPOS_MOVIMENTACAO)
    quantidade = models.IntegerField(validators=[MinValueValidator(1)])
    data_hora = models.DateTimeField(default=timezone.now)