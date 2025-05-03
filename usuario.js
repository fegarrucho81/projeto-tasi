class Usuario {

    constructor() { // Construtor padrão

        this.usuarios = []; // Irei salvar os usuários em um Array

    }

    cadastrarUsuario(nome, email, senha) {
        
        const usuarioExistente = this.usuarios.find(usuario => usuario.email === email); // O método find vai verificar se já existe 
                                                                                        // esse usuário cadastrado no Array
        if (usuarioExistente)
            return "Email já cadastrado!";

        const novoUsuario = { // Objeto para criar novo usuário e salvar no Array do construtor
            nome,
            email,
            senha
        }

        this.usuarios.push(novoUsuario); // Colocando novo usuário no Array
        return "Usuário cadastrado com sucesso!";

    }

    loginUsuario(email, senha) {

        const usuario = this.usuarios.find(usuario => usuario.email === email);

        if (!usuario)
            return "Usuário não encontrado!"

        if (usuario.senha !== senha)
            return "Senha incorreta!"

        return `Bem-vindo, ${usuario.nome}!`

    }

    excluirUsuario(email) {
        if (!email || !email.includes('@'))     
            return "E-mail inválido!";
    
        const index = this.usuarios.findIndex(usuario => usuario.email === email);
    
        if (index !== -1) {
            this.usuarios.splice(index, 1); // Remove o usuário do array
            return `Usuário ${email} excluído com sucesso!`;
        } else {
            return `Usuário ${email} não encontrado!`;
        }
    }
    
}

module.exports = Usuario;