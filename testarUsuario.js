const Usuario = require('./usuario'); // Importando a classe

const sistemaUsuarios = new Usuario(); // Instanciando a classe

console.log(sistemaUsuarios.cadastrarUsuario("Felipe","felipe@gmail.com", "123456")); // Deve retornar que ocorreu com sucesso

console.log(sistemaUsuarios.cadastrarUsuario("João","felipe@gmail.com", "123456")); // Deve retornar que já existe esse email

console.log(sistemaUsuarios.loginUsuario("felipe@email.com", "senha123")); // "Bem-vindo, Felipe!"
console.log(sistemaUsuarios.loginUsuario("felipe@email.com", "senhaErrada")); // "Senha incorreta!"
console.log(sistemaUsuarios.loginUsuario("naoexiste@email.com", "senha123")); // "Usuário não encontrado!"