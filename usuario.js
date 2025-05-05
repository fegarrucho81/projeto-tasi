const fs = require('fs');
const path = require('path');
const USUARIO_PATH = path.join(__dirname, 'usuario.json');


class Usuario {
    constructor(rl) {
        this.rl = rl;
        this.usuarios = this.lerUsuarios();
    }

    lerUsuarios() {
        try {
            const data = fs.readFileSync(USUARIO_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }
    
    salvarUsuarios() {
        fs.writeFileSync(USUARIO_PATH, JSON.stringify(this.usuarios, null, 2));
    }
    

    cadastrarUsuario(callback) {
        this.rl.question('Nome do Usuário: ', (nome) => {
            this.rl.question('E-mail do Usuário: ', (email) => {
                const usuarioExistente = this.usuarios.find(usuario => usuario.email === email);
                if (usuarioExistente) {
                    console.log('Email já cadastrado!');
                    return callback(false);
                }

                this.rl.question('Senha: ', (senha) => {
                    const novoUsuario = { nome, email, senha };
                    this.usuarios.push(novoUsuario);
                    this.salvarUsuarios();
                    console.log("Usuário cadastrado com sucesso!\n");
                    callback(true); // Cadastro bem-sucedido
                });
            });
        });
    }

    loginUsuario(callback) {
        const tentarLogin = () => {
            this.rl.question('Email: ', (email) => {
                const usuario = this.usuarios.find(usuario => usuario.email === email);

                if (!usuario) {
                    console.log('Usuário não encontrado!\n');
                    return tentarLogin();
                }

                this.rl.question('Senha: ', (senha) => {
                    if (usuario.senha !== senha) {
                        console.log("Senha incorreta!\n");
                        return tentarLogin();
                    }

                    console.log(`\nBem-vindo, ${usuario.nome}!\n`);
                    callback(usuario.email === 'adm@adm.com'); // true se admin
                });
            });
        };

        tentarLogin();
    }

    excluirUsuario(callback) {
        this.rl.question('Digite o e-mail do usuário a excluir: ', (email) => {
            const index = this.usuarios.findIndex(usuario => usuario.email === email);

            if (index !== -1) {
                this.usuarios.splice(index, 1);
                this.salvarUsuarios();
                console.log(`Usuário ${email} excluído com sucesso!`);
            } else {
                console.log(`Usuário ${email} não encontrado!`);
            }

            callback(); // Continua no menu_adm após a exclusão
        });
    }
}

module.exports = Usuario;