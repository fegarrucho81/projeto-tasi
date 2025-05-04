const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const Produto = require('./produtos.js');
const Usuario = require('./usuario.js');

const novo_produto = new Produto(rl);
const novo_usuario = new Usuario(rl);

// Realiza o login e, dependendo do tipo de usuário, chama o menu adequado
function menuInicial() {
    console.log('=== BEM-VINDO AO SISTEMA DE ESTOQUE ===');
    console.log('1 - Já tenho uma conta');
    console.log('2 - Criar nova conta');

    rl.question('Escolha uma opção: ', (op) => {
        switch (op.trim()) {
            case '1':
                novo_usuario.loginUsuario((isAdm) => {
                    if (isAdm) {
                        menu_adm();
                    } else {
                        menu();
                    }
                });
                break;
            case '2':
                novo_usuario.cadastrarUsuario((sucesso) => {
                    if (sucesso) {
                        // Após cadastro, volta para o login
                        menuInicial();
                    } else {
                        console.log('Erro ao cadastrar. Tente novamente.');
                        menuInicial();
                    }
                });
                break;
            default:
                console.log('Opção inválida!\n');
                menuInicial();
        }
    });
}

menuInicial();


// Menu para usuários comuns
function menu() {
    console.log('\n=== MENU ESTOQUE ===');
    console.log('1 - Cadastrar Produto');
    console.log('2 - Remover Produto');
    console.log('3 - Editar Estoque');
    console.log('4 - Mostrar Estoque');
    console.log('5 - Sair');

    rl.question('Escolha uma opção: ', (op) => {
        switch (op.trim()) {
            case '1':
                novo_produto.cadastrarProduto(() => menu()); // Chama o menu novamente após o cadastro
                break;
            case '2':
                novo_produto.removerProduto(() => menu()); // Chama o menu novamente após a remoção
                break;
            case '3':
                novo_produto.editarProduto(() => menu()); // Chama o menu novamente após a edição
                break;
            case '4':
                novo_produto.mostrarEstoque(() => menu()); // Chama o menu novamente após mostrar estoque
                break;
            case '5':
                console.log('Encerrando o programa...');
                rl.close(); // Fecha o readline ao encerrar
                break;
            default:
                console.log('Opção inválida!');
                menu(); // Chama o menu novamente em caso de opção inválida
        }
    });
}

// Menu para administradores
function menu_adm() {
    console.log('\n=== MENU ESTOQUE ===');
    console.log('1 - Cadastrar Produto');
    console.log('2 - Remover Produto');
    console.log('3 - Editar Estoque');
    console.log('4 - Mostrar Estoque');
    console.log('5 - Cadastrar Usuario');
    console.log('6 - Remover Usuario');
    console.log('7 - Sair');

    rl.question('Escolha uma opção: ', (op) => {
        switch (op.trim()) {
            case '1':
                novo_produto.cadastrarProduto(() => menu_adm()); // Chama o menu novamente após o cadastro
                break;
            case '2':
                novo_produto.removerProduto(() => menu_adm()); // Chama o menu novamente após a remoção
                break;
            case '3':
                novo_produto.editarProduto(() => menu_adm()); // Chama o menu novamente após a edição
                break;
            case '4':
                novo_produto.mostrarEstoque(() => menu_adm()); // Chama o menu novamente após mostrar estoque
                break;
            case '5':
                novo_usuario.cadastrarUsuario(() => menu_adm()); // Chama o menu novamente após cadastrar um usuário
                break;
            case '6':
                novo_usuario.excluirUsuario(() => menu_adm()); // Chama o menu novamente após excluir um usuário
                break;
            case '7':
                console.log('Encerrando o programa...');
                rl.close(); // Fecha o readline ao encerrar
                break;
            default:
                console.log('Opção inválida!');
                menu_adm(); // Chama o menu novamente em caso de opção inválida
        }
    });
}