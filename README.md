Este é um sistema de CRUD desenvolvido em Node.js, é um sistema de gerenciamento de usuarios, projetos e tarefas. O sistema permite que crie, leia, atualização e exclusão de usuários, projetos e tarefas, além de autenticação de usuários. Cada projeto pode ter várias tarefas associadas, e cada tarefa terá um título, descrição, data de criação, data de conclusão e status.

Informações sobre o projeto
No sistema o email é único para cada usuário. No sistema apenas usuarios logados conseguem interagir com os Projetos e Tarefas.

Instalação
Clone o repositório:

git clone  https://github.com/FabricioLenzz/provaADS.git

Navegue até o diretório do projeto: cd Gestao-tarefas-projetos

Instale o node modules para poder rodar o projeto: npm install

Configuração
Crie o banco de dados para salvar arquivos Abre o xampp e o Apache e o Mysql, após isso entre no phpMyAdmin e crie o banco de dados de acordo com o nome que esta configurado no ../src/database/db
Executar o servidor
Inicie o servidor: npm start

O servidor estará disponível em http://localhost:8000.

Usuários
Criar Usuário

POST /api/v1/usuario Body: json { "nome": "Nome do Usuário", "email": "email@gmail.com", "senha": "12345", "datanasc": "26/00/1990" }
Login

POST /api/v1/login Body: json { "email": "email@exemplo.com", "senha": "senha123" }
Obter Usuário por ID

GET /api/v1/usuario
Atualizar Usuário

PUT /api/v1/usuario/1 Body: json { "nome": "Nome Atualizado", "email": "emailAtualizado@gmail.com", "senha": "12345Atualizado", "datanasc": "26/00/1990" }
Deletar Usuário

DELETE /api/v1/usuario/id
Projetos
Criar Projeto

POST /api/v1/projeto/ Body: json { "nome": "Nome do Projeto", "desc": "Descrição do Projeto", "dtCreate": "2024-01-01", "autorId": 1 }
Obter Projeto por ID

GET /api/v1/projeto/
Atualizar Projeto

PUT /api/v1/projeto/:id Body: json { "nome": "Nome Atualizado do Projeto", "desc": "Descrição Atualizada do Projeto", "dtCreate": "2024-01-01", "autorId": 1 }
Deletar Projeto

DELETE /api/v1/projeto/:id
Tarefas
Criar Tarefa

POST /api/v1/tarefa Body: json { "nome": "Nome da Tarefa", "desc": "Descrição da Tarefa", "dtCreate": "2024-01-01", "projetoId": 1 }
Obter Tarefa por ID

GET /api/v1/tarefa/:id
Atualizar Tarefa

PUT /api/v1/tarefa/:id Body: json { "nome": "Nome Atualizado da Tarefa", "desc": "Descrição Atualizada da Tarefa", "dtCreate": "2024-01-01", "projetoId": 1 }
Deletar Tarefa

DELETE /api/v1/tarefa/:id
