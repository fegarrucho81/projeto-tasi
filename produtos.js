class Produto {
    constructor(rl) {
        this.rl = rl;
        this.produtos = []; // Array de Produtos
    }

    cadastrarProduto(callback) {
        this.rl.question('Digite o nome do produto: ', (nome_produto) => {
            if (this.produtos.find(produto => produto.nome_produto.trim().toLowerCase() === nome_produto.trim().toLowerCase())) {
                console.log('Produto já existe no estoque!');
                return callback(); // Retorna ao menu após verificar que o produto já existe
            }

            this.rl.question('Digite a quantidade: ', (quantidade) => {
                quantidade = parseInt(quantidade);
                if (isNaN(quantidade) || quantidade <= 0) {
                    console.log('Quantidade inválida!');
                    return callback(); // Retorna ao menu se a quantidade for inválida
                }

                const novo_produto = {
                    id: this.produtos.length + 1,
                    nome_produto: nome_produto,
                    quantidade: quantidade,
                };

                this.produtos.push(novo_produto);
                console.log(`Produto adicionado: Nome: ${nome_produto} - Quantidade: ${quantidade}`);
                console.log('Estoque atual:', this.produtos);
                callback(); // Retorna ao menu após adicionar o produto
            });
        });
    }

    removerProduto(callback) {
        this.rl.question('Digite o nome ou id do produto que deseja remover: ', (nome_produto_remover) => {
            const index = this.produtos.findIndex(
                produto => produto.nome_produto.trim().toLowerCase() === nome_produto_remover.trim().toLowerCase() ||
                          produto.id === parseInt(nome_produto_remover)
            );

            if (index === -1) {
                console.log('Produto não encontrado!');
                return callback(); // Retorna ao menu caso o produto não seja encontrado
            }

            const removido = this.produtos.splice(index, 1)[0];
            console.log(`Produto removido: ${removido.nome_produto}`);
            callback(); // Retorna ao menu após remover o produto
        });
    }

    editarProduto(callback) {
        this.rl.question('Digite o nome ou ID do produto que deseja editar: ', (selecionar_produto) => {
            const index = this.produtos.findIndex(
                produto => produto.nome_produto.trim().toLowerCase() === selecionar_produto.trim().toLowerCase() ||
                          produto.id === parseInt(selecionar_produto)
            );

            if (index === -1) {
                console.log('Produto não encontrado!');
                return callback(); // Retorna ao menu caso o produto não seja encontrado
            }

            const produto = this.produtos[index];
            const menuEdicao = () => {
                this.rl.question(
                    '- Digite 0 para editar o nome;\n- Digite 1 para editar a quantidade;\n- Digite 2 para cancelar a edição;\nEscolha: ',
                    (opcoes_menu) => {
                        opcoes_menu = parseInt(opcoes_menu);

                        if (opcoes_menu === 0) {
                            this.rl.question('Digite o novo nome do produto: ', (novo_nome) => {
                                produto.nome_produto = novo_nome;
                                console.log('Nome alterado com sucesso.');
                                menuEdicao(); // Repete o menu após a alteração
                            });
                        } else if (opcoes_menu === 1) {
                            this.rl.question('Digite a nova quantidade de produtos: ', (nova_quantidade) => {
                                const quantidade = parseInt(nova_quantidade);
                                if (quantidade >= 0) {
                                    produto.quantidade = quantidade;
                                    console.log('Quantidade alterada com sucesso.');
                                    menuEdicao(); // Repete o menu após a alteração
                                } else {
                                    console.log('Quantidade inválida');
                                    menuEdicao(); // Repete o menu para tentar novamente
                                }
                            });
                        } else if (opcoes_menu === 2) {
                            console.log('Operação cancelada');
                            callback(); // Retorna ao menu após cancelar
                        } else {
                            console.log('Opção inválida');
                            menuEdicao(); // Repete o menu
                        }
                    }
                );
            };
            menuEdicao(); // Inicia o menu de edição
        });
    }

    mostrarEstoque(callback) {
        if (this.produtos.length === 0) {
            console.log('Estoque vazio!');
        } else {
            console.log('Estoque atual:');
            this.produtos.forEach(produto => {
                console.log(`ID: ${produto.id} - Nome: ${produto.nome_produto} - Quantidade: ${produto.quantidade}`);
            });
        }
        callback(); // Retorna ao menu após mostrar o estoque
    }
}

module.exports = Produto;