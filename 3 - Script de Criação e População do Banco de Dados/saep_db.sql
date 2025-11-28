CREATE DATABASE saep_db;
USE saep_db;
DROP DATABASE saep_db;

# Criação da tabela de Usuário
CREATE TABLE Usuario (
    UsuarioID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Login VARCHAR(50) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL
);

# Ciação da tabela de Produto
CREATE TABLE Produto (
    ProdutoID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Categoria VARCHAR(50) NOT NULL,
    Tensao VARCHAR(20),
    Dimensoes VARCHAR(50),
    ResolucaoTela VARCHAR(50),
    CapacidadeArmazenamento VARCHAR(50),
    Conectividade VARCHAR(50),
    Fabricante VARCHAR(100),
    CodigoInterno VARCHAR(50) UNIQUE,
    EstoqueMinimo INT DEFAULT 0,
    EstoqueAtual INT DEFAULT 0
);

# Criação da tabela de Movimentação
CREATE TABLE Movimentacao (
    MovimentacaoID INT AUTO_INCREMENT PRIMARY KEY,
    ProdutoID INT NOT NULL,
    UsuarioID INT NOT NULL,
    TipoMovimentacao ENUM('Entrada', 'Saida') NOT NULL,
    Quantidade INT NOT NULL,
    DataHora DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ProdutoID) REFERENCES Produto(ProdutoID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
);

# Inserção de dados dentro da tabela usuário
INSERT INTO Usuario (Nome, Login, Senha, Perfil) VALUES
	('Administrador', 'admin', 'admin123', 'Administrador'),
	('João Silva', 'joao', 'joao123', 'Almoxarifado'),
	('Maria Souza', 'maria', 'maria123', 'Almoxarifado');

# Inserção de dados dentro da tebela Produto
INSERT INTO Produto 
	(Nome, Categoria, Tensao, Dimensoes, ResolucaoTela, CapacidadeArmazenamento, Conectividade, Fabricante, CodigoInterno, EstoqueMinimo, EstoqueAtual)
VALUES
	('Smartphone Galaxy S22', 'Smartphone', 'Bivolt', '146x70mm', '2400x1080', '128GB', '5G/Wi-Fi', 'Samsung', 'SP001', 5, 20),
	('Notebook Acer Aspire 5', 'Notebook', 'Bivolt', '36cm x 25cm', 'Full HD', '512GB SSD', 'Wi-Fi', 'Acer', 'NB001', 3, 10),
	('Smart TV LG 55"', 'SmartTV', 'Bivolt', '55 polegadas', '4K UHD', 'N/A', 'Wi-Fi', 'LG', 'TV001', 2, 4);


# Inserção de dados dentro da tabela Movimentação
INSERT INTO Movimentacao (ProdutoID, UsuarioID, TipoMovimentacao, Quantidade)
VALUES
	(1, 2, 'Entrada', 10),
	(1, 2, 'Saida', 20),
	(2, 2, 'Entrada', 50),
	(3, 1, 'Saida', 1);
