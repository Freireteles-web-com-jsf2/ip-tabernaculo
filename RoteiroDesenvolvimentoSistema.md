# Roteiro de Desenvolvimento do Sistema de Gestão de Igrejas

## 1. Estrutura de Perfis e Permissões
- **Perfis:** Administrador, Pastor, Líder, Tesoureiro, Voluntário, Membro.
- **Permissões:** Cada perfil tem acesso a módulos específicos, com possibilidade de personalização de permissões.

---

## 2. Telas e Módulos Principais

### 2.1. Autenticação e Acesso
- Tela de Login
- Tela de Recuperação de Senha
- Tela de Cadastro (opcional, para membros)

### 2.2. Dashboard
- Visão geral com cards de resumo: Total de membros, receitas/despesas do mês, próximos eventos, aniversariantes, etc.
- Gráficos financeiros
- Notificações e mural de avisos

### 2.3. Pessoas
- Lista de Pessoas/Membros
  - Filtros por cargo, grupo, status, aniversariantes do mês, etc.
- Cadastro/Edição de Pessoa
  - Dados pessoais, foto, contatos, endereço, cargo/função, campos personalizados.
- Cartão de Membro
  - Visualização e impressão de cartões personalizados.
- Perfil do Usuário
  - Edição de dados pessoais pelo próprio membro.

### 2.4. Grupos/Células
- Lista de Grupos/Células
  - Filtros por categoria, localização, líderes, status (ativo/inativo).
- Cadastro/Edição de Grupo
  - Nome, foto, endereço, localização, líderes, categoria.
- Relatórios de Frequência
  - Envio de frequência, participantes, visitantes, tema, anotações, selfie da reunião.
- Relatórios Analíticos
  - Pessoas ausentes, sem grupo, grupos inativos.

### 2.5. Financeiro
- Visão Geral Financeira
  - Gráficos de receitas, despesas, saldo de contas.
- Contas a Pagar/Receber
- Cadastro/Edição de Receita/Despesa
  - Valor, data, categoria, pessoa/fornecedor vinculado, observações.
- Gestão de Categorias e Contas
- Relatórios Analíticos
  - Desempenho financeiro, previsões, histórico.

### 2.6. Patrimônio
- Lista de Bens/Itens
  - Filtros por categoria, localização física.
- Cadastro/Edição de Item
  - Dados do bem, histórico de anotações, localização.
- Organização por Localização
  - Ex: recepção, cozinha, secretaria.

### 2.7. Agenda e Mural
- Calendário de Eventos
  - Visualização mensal/semanal/diária.
- Cadastro/Edição de Evento
  - Nome, data, recorrência (fixo, semanal, mensal, anual), notificações.
- Mural de Avisos
  - Publicação de avisos/notificações para membros.
- Anotações Particulares
  - Área privada para anotações do usuário.

---

## 3. Fluxos Especiais
- Gestão de Permissões: Tela para administradores definirem permissões específicas para voluntários e líderes.
- Personalização de Campos: Tela para adicionar/remover campos personalizados no cadastro de pessoas.
- Notificações: Sistema de envio de notificações para eventos, avisos e lembretes.

---

## 4. Telas Auxiliares
- Configurações do Sistema
- Gestão de Usuários e Perfis
- Ajuda/Suporte

---

# Fluxo e Wireframes das Telas Principais

## 1. Login
**Fluxo:**
- Usuário acessa a tela de login.
- Informa e-mail/usuário e senha.
- Se esqueceu a senha, pode solicitar recuperação.
- Após login, é redirecionado ao Dashboard conforme seu perfil.

**Wireframe:**
```
+-----------------------------+
|      [Logo da Igreja]       |
|  E-mail: [___________]      |
|  Senha:  [___________]      |
|  [Entrar]                   |
|  [Esqueci minha senha]      |
+-----------------------------+
```

## 2. Dashboard
**Fluxo:**
- Exibe cards de resumo (membros, receitas, despesas, eventos, aniversariantes).
- Gráficos financeiros.
- Notificações e mural de avisos.
- Acesso rápido aos principais módulos.

**Wireframe:**
```
+-------------------------------------------------------------+
| Sidebar | Topbar                                            |
|---------+---------------------------------------------------|
|         | [Cards de Resumo]                                 |
|         | [Gráfico Financeiro] [Últimas Transações]         |
|         | [Aniversariantes] [Próximos Eventos]              |
|         | [Membros Recentes]                                |
|         | [Mural de Avisos]                                 |
+-------------------------------------------------------------+
```

## 3. Pessoas
### Lista de Membros
**Fluxo:**
- Visualizar todos os membros.
- Filtros por cargo, grupo, status, aniversariantes.
- Ações: visualizar, editar, excluir, imprimir cartão.

**Wireframe:**
```
+-----------------------------+
| [Buscar] [Filtros]          |
| Nome | Cargo | Grupo | ...  |
|-----------------------------|
| Ana  | Líder | Louvor | ... |
| João | Membro| Jovens | ... |
+-----------------------------+
| [Novo Membro]               |
+-----------------------------+
```

### Cadastro/Edição de Membro
**Fluxo:**
- Formulário com dados pessoais, foto, contatos, endereço, cargo, campos personalizados.
- Salvar ou cancelar.

**Wireframe:**
```
+-----------------------------+
| [Foto] [Alterar Foto]       |
| Nome: [___________]         |
| Cargo: [___________]        |
| Grupo: [___________]        |
| ...                         |
| [Salvar] [Cancelar]         |
+-----------------------------+
```

### Cartão de Membro
**Fluxo:**
- Visualizar e imprimir cartão personalizado.

**Wireframe:**
```
+-----------------------------+
| [Cartão com foto e dados]   |
| [Imprimir]                  |
+-----------------------------+
```

### Perfil do Usuário
**Fluxo:**
- Membro pode editar seus próprios dados.

---

## 4. Grupos/Células
### Lista de Grupos
**Fluxo:**
- Visualizar todos os grupos/células.
- Filtros por categoria, localização, líderes, status.
- Ações: visualizar, editar, excluir, acessar relatórios.

**Wireframe:**
```
+-----------------------------+
| [Buscar] [Filtros]          |
| Nome | Categoria | Líderes  |
|-----------------------------|
| Louvor | Música | Ana, João |
| Jovens | Jovens | Carlos    |
+-----------------------------+
| [Novo Grupo]                |
+-----------------------------+
```

### Cadastro/Edição de Grupo
**Fluxo:**
- Formulário com nome, foto, endereço, localização, líderes, categoria.

### Relatórios de Frequência
**Fluxo:**
- Líder envia frequência: participantes, visitantes, tema, anotações, selfie.

**Wireframe:**
```
+-----------------------------+
| [Selecionar Grupo]          |
| Data: [_____]               |
| Participantes: [checklist]  |
| Visitantes: [_____]         |
| Tema: [__________]          |
| Anotações: [__________]     |
| [Anexar Selfie]             |
| [Enviar Frequência]         |
+-----------------------------+
```

### Relatórios Analíticos
- Pessoas ausentes, sem grupo, grupos inativos.

---

## 5. Financeiro
### Visão Geral
**Fluxo:**
- Gráficos de receitas, despesas, saldo.
- Resumo de contas a pagar/receber.

**Wireframe:**
```
+-----------------------------+
| [Gráfico de Receitas/Despesas] |
| [Resumo de Contas]             |
+-----------------------------+
```

### Cadastro de Receita/Despesa
**Fluxo:**
- Formulário: valor, data, categoria, pessoa/fornecedor, observações.

### Gestão de Categorias e Contas
- Adicionar/editar categorias e contas bancárias.

### Relatórios Analíticos
- Desempenho financeiro, previsões, histórico.

---

## 6. Patrimônio
### Lista de Bens
**Fluxo:**
- Visualizar todos os bens.
- Filtros por categoria, localização.

### Cadastro/Edição de Item
**Fluxo:**
- Formulário: dados do bem, histórico, localização.

---

## 7. Agenda e Mural
### Calendário de Eventos
**Fluxo:**
- Visualização mensal/semanal/diária.
- Cadastro/edição de evento: nome, data, recorrência, notificações.

### Mural de Avisos
**Fluxo:**
- Publicação de avisos/notificações para membros.

### Anotações Particulares
**Fluxo:**
- Área privada para anotações do usuário.

---

## 8. Configurações/Permissões
**Fluxo:**
- Definir permissões para perfis e voluntários.
- Personalizar campos do sistema.

---

# Resumo Visual dos Fluxos

1. Login → Dashboard
2. Dashboard → Pessoas/Grupos/Financeiro/Patrimônio/Agenda
3. Pessoas → Lista → Cadastro/Edição/Cartão/Perfil
4. Grupos → Lista → Cadastro/Edição → Frequência/Relatórios
5. Financeiro → Visão Geral → Cadastro/Relatórios
6. Patrimônio → Lista → Cadastro/Edição
7. Agenda → Calendário → Cadastro de Evento/Mural/Anotações
8. Configurações → Permissões/Personalização 