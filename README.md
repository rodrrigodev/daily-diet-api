# API Daily Diet

A API Daily Diet é projetada para gerenciamento de dietas diárias, permitindo que os usuários:

- Criem e identifiquem contas.
- Registrem refeições com detalhes como nome, descrição, data, hora e status da dieta.
- Editem e excluam refeições.
- Visualizem todas as refeições de um usuário ou uma refeição específica.
- Obtenham métricas, como total de refeições, refeições dentro e fora da dieta, e a melhor sequência de dieta.
- Acesso a visualização, edição e exclusão de refeições é restrito a cada usuário individualmente, garantindo a privacidade dos dados.


## Como baixar e usar

- Passo 1: Clone o repositório do GitHub
Copie a URL: https://github.com/rodrrigodev/daily-diet-api.git

Abra seu terminal (ou prompt de comando) e navegue até o diretório onde deseja colocar o projeto clonado

Em seguida, execute o seguinte comando, substituindo <URL> pela URL que você copiou
git clone <URL>

Após clonar, navegue para o diretório do projeto usando o comando cd
cd daily-diet-api

- Passo 2: Instalando as dependências
Execute o comando para instalar as dependências
npm install or npm i

Passo 3: Executando a API
No terminal, execute o comando npm run dev
Isso iniciará o servidor conforme configurado no script dev.
O servidor será iniciado no endereço http://localhost:3000

* Atenção: certifique-se de que seu ambiente de desenvolvimento tenha o Node.js instalado.

### Ferramentas úteis
Para usar os endpoints da API após iniciar o servidor localmente (como explicado anteriormente), você vai precisar de uma ferramenta que permita enviar solicitações HTTP para testar e interagir com esses endpoints. Duas das ferramentas mais populares para isso são o Postman e o Insomnia.

### Endpoints
- Obter métricas de um usuário
http://localhost:3333/diet/user

- Obter informações de refeições
http://localhost:3333/diet/all

- Obter informações de uma única dieta
http://localhost:3333/diet/id

- Criar um usuário
http://localhost:3333/diet/create-user

- Criar uma dieta
http://localhost:3333/diet/new

- Atualizar uma dieta
http://localhost:3333/diet/id

- Deletar uma dieta
http://localhost:3333/diet/id
