describe('TODOMvc App', () => {
  const visitApp = () => cy.visit('');
  const addTodo = (text) => {
    cy.get('[data-cy=todo-input]').type(`${text}{enter}`);
  };
  const getTodosList = () => cy.get('[data-cy=todos-list]').children();
  const toggleTodo = (index) => {
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]').eq(index).click();
  };
  const removeTodo = (index) => {
    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]').eq(index).invoke('show').click();
  };

  it('Verifica se app está abrindo', () => {
    visitApp();
  });

  it('Insere uma tarefa', () => {
    visitApp();
    addTodo('TP2 de Engenharia de Software');
    getTodosList().should('have.length', 1).first().should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    visitApp();
    addTodo('TP2 de Engenharia de Software');
    getTodosList().should('have.length', 1);
    removeTodo(0);
    getTodosList().should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    visitApp();
    addTodo('TP2 de ES');
    addTodo('Prova de ES');
    toggleTodo(0);

    cy.get('[data-cy=filter-active-link]').click();
    getTodosList().should('have.length', 1).first().should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link]').click();
    getTodosList().should('have.length', 1).first().should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link]').click();
    getTodosList().should('have.length', 2);
  });

  it('Adiciona uma tarefa e marca como concluída', () => {
    visitApp();
    addTodo('Fazer compras');
    getTodosList().should('have.length', 1).first().should('have.text', 'Fazer compras');
    toggleTodo(0);
    cy.get('[data-cy=todos-list] > li').should('have.class', 'completed');
  });

  it('Excluir tarefa após marcar como concluída', () => {
    visitApp();
    addTodo('Estudar para a prova');
    toggleTodo(0);
    cy.get('[data-cy=todos-list] > li').should('have.class', 'completed');
    removeTodo(0);
    getTodosList().should('have.length', 0);
  });

  it('Excluir uma tarefa incompleta', () => {
    visitApp();
    addTodo('Fazer compras');
    addTodo('Estudar para a prova');
    addTodo('Ler um livro');
    toggleTodo(1);
    cy.get('[data-cy=todos-list] > li').eq(1).should('have.class', 'completed');
    removeTodo(0);
    getTodosList().should('have.length', 2);
  });
});
