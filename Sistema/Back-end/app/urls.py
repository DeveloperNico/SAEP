from django.urls import path
from .views import *

urlpatterns = [
    # Endpoint para login
    path('login/', LoginView.as_view(), name='token_obtain_pair'),

    # Endpoints para Usuário
    path('usuarios/', UsuarioListCreateView.as_view(), name='usuario-list-create'),
    path('usuarios/<int:pk>/', UsuarioRetrieveUpdateDestroyAPIView.as_view(), name='usuario-retrieve-update-destroy'),

    # Endpoints para Produto
    path('produtos/', ProdutoListCreateView.as_view(), name='produto-list-create'),
    path('produtos/<int:pk>/', ProdutoRetrieveUpdateDestroyAPIView.as_view(), name='produto-retrieve-update-destroy'),

    # Endpoints para Movimentação
    path('movimentacoes/', MovimentacaoListCreateView.as_view(), name='movimentacao-list-create'),
    path('movimentacoes/<int:pk>/', MovimentacaoRetrieveUpdateDestroyAPIView.as_view(), name='movimentacao-retrieve-update-destroy'),
]