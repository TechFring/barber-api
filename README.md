# Barber API

## Pré-requisitos
Antes de iniciar o projeto, certifique-se de ter as seguintes ferramentas instaladas e configuradas em seu ambiente:

- Node.js 14.21
- PostgreSQL
- Docker
- Docker Compose

## Execução do Projeto
Para executar o projeto, é necessário configurar as variáveis de ambiente. Siga os passos abaixo para realizar a configuração inicial:

1. Após clonar o projeto, crie um arquivo chamado **.env** no diretório raiz do projeto.
2. O conteúdo do arquivo deve seguir o exemplo abaixo:

```env
# Chave utilizada para criptografia
APP_SECRET=aa311ba6f74cfe0a682af8f0099e8b90

# Informações do banco de dados: base de dados, usuário, senha, host e porta
DB_DATABASE=barber
DB_USERNAME=postgres
DB_PASSWORD=docker
DB_HOST=db
DB_PORT=5432

# Informações do usuário admin: nome, login e senha
ADMIN_NAME=Administrador
ADMIN_LOGIN=admin
ADMIN_PASSWORD=01234567
```

**Importante: Preencha as informações necessárias de acordo com suas preferências.**

### Ambiente de Desenvolvimento
Siga os passos abaixo para executar o projeto em ambiente de desenvolvimento:

1. Execute o comando `npm install` para instalar as dependências do projeto.
2. Execute o comando `npm run dev` para iniciar o projeto.
3. Após isso, o projeto estará disponível em http://localhost:3333.

### Ambiente de Produção
Siga os passos abaixo para executar o projeto em ambiente de produção:

1. Execute o comando `docker-compose build` para construir a imagem do projeto.
2. Execute o comando `docker-compose up` para iniciar o container do projeto.
3. Após isso, o projeto estará disponível em http://localhost:3333.
