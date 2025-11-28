from django.contrib import admin
from .models import Usuario, Produto, Movimentacao

admin.site.register(Usuario)
admin.site.register(Produto)
admin.site.register(Movimentacao)