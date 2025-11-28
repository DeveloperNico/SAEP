from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Usuario, Produto, Movimentacao
from .serializers import UsuarioSerializer, ProdutoSerializer, MovimentacaoSerializer, LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# CRUD para Usuário
class UsuarioListCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


# CRUD para Produto
class ProdutoListCreateView(ListCreateAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

class ProdutoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer


# CRUD para Movimentação
class MovimentacaoListCreateView(ListCreateAPIView):
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer

class MovimentacaoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

@api_view(['GET'])
def listar_categorias(request):
    categorias = [
        {"value": value, "label": label}
        for value, label in Produto.CATEGORIAS
    ]
    return Response(categorias)