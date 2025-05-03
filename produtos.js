const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class Produto {
    constructor() {
        this.produtos = []; //Array de Produtos
    }

    cadastrarProduto() {
        rl.question('Digite o nome do produto: ', (nome_produto) => {
            if (this.produtos.find(produto => produto.nome_produto.trim().toLowerCase() === nome_produto.trim().toLowerCase())) {
                console.log('Produto já existe no estoque!');
                return rl.close();
            }            
    
            rl.question('Digite a quantidade: ', (quantidade) => {
                quantidade = parseInt(quantidade);
                if (isNaN(quantidade) || quantidade < 0) {
                    return 'Quantidade Inválida!';
                }
    
                const novo_produto = {
                    id: this.produtos.length + 1,
                    nome_produto: nome_produto,
                    quantidade: quantidade,
                };
    
                this.produtos.push(novo_produto);
                console.log(`Produto adicionado: Nome: ${nome_produto} - Quantidade: ${quantidade}`);
                console.log('Estoque atual:', this.produtos);
            })
        })
    }

    removerProduto() {
        rl.question('Digite o nome ou id do produto que deseja remover: ', (nome_produto_remover) => {
            const index = this.produtos.findIndex(
                produto => produto.nome_produto.trim().toLowerCase() === nome_produto_remover.trim().toLowerCase() || 
                          produto.id === parseInt(nome_produto_remover)
            );

            if (index === -1) {
                console.log('Produto não encontrado!');
                return rl.close();
            }

            const removido = this.produtos.splice(index, 1)[0];
            console.log(`Produto removido: ${removido.nome_produto}`);
            rl.close();
        });
    }

    editarProduto() {
        // Verifica qual o produto a ser editado.
        rl.question('Digite o nome ou ID do produto que deseja editar: ', (selicionar_produto) => {
            const index = this.produtos.findIndex(
                produto => produto.nome_produto.trim().toLowerCase() === selicionar_produto.trim().toLowerCase() || 
                          produto.id === parseInt(selicionar_produto)
            );
    
            // Caso o produto não seja encontrado, mensagem de erro + encerrar chamada.
            if (index === -1) {
                console.log('Produto não encontrado!');
                return rl.close();
            }
    
            // Separa o produto a ser editado.
            const produto = this.produtos[index];
    
            // Edição.
            let i = 0
            while(i === 0){
                // Pergunta o que se deseja alterar.
                rl.question('- Digite 0 para editar o nome;\n- Digite 1 para editar a quantidade;\n- Digite 2 para cancelar a edição;\n User: ', (opcoes_menu) => {
                    opcoes_menu = parseInt(opcoes_menu)
    
                    // 0 altera o nome
                    if (opcoes_menu === 0) {
                        rl.question('Digite o novo nome do produto: ', (novo_nome) => {
                            produto.nome_produto = novo_nome;
                            console.log('Nome alterado com sucesso.');
                            i = 1
                            rl.close();
                        });
    
                    // 1 altera a quantidade
                    } else if (opcoes_menu === 1) {
                        rl.question('Digite a nova quantidade de produtos: ', (nova_quantidade) => {
                            const quantidade = parseInt(nova_quantidade);
                            if (quantidade >= 0){
                                produto.quantidade = quantidade;
                                console.log('Quantidade alterada com sucesso.');
                                i = 1
                                rl.close();
    
                            } else { 
                                console.log('Quantidade inválida');
                                i = 0
                                rl.close()
                            }
    
                        });
    
                    // 2 Cancela a edição.
                    } else if (opcoes_menu === 2) {
                        console.log('Operação cancelada');
                        i = 1
                        rl.close();
    
                    // Mensagem de erro + retorna o loop
                    } else {
                        console.log('Opção inválida');
                        i = 0
                    }
    
                });
            };
    
            this.produtos[index] = produto
    
    
        });
    }

    mostrarEstoque() {
        if (this.produtos.length === 0) {
            console.log('Estoque vazio!');
        } else {
            console.log('Estoque atual:');
            this.produtos.forEach(produto => {
                console.log(`ID: ${produto.id} - Nome: ${produto.nome_produto} - Quantidade: ${produto.quantidade}`);
            });
        }
        rl.close();
    }

}

module.exports = Produto;