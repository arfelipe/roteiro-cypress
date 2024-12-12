describe('TODOMvc App', () => {
  
  it('Verifica se app está abrindo', () => {
    cy.visit('');
  });

  it('Insere uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    // Filtra as tarefas ativas (não concluídas)
    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES'); // Tarefa ativa

    // Filtra as tarefas concluídas
    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES'); // Tarefa concluída

    // Filtra todas as tarefas
    cy.get('[data-cy=filter-all-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Adiciona uma tarefa e marca como concluída', () => {
    cy.visit('');

    // Adiciona uma tarefa
    cy.get('[data-cy=todo-input]')
      .type('Fazer compras{enter}');

    // Verifica se a tarefa foi adicionada
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Fazer compras');

    // Marca a tarefa como concluída
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();

    // Verifica se a tarefa está marcada como concluída
    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');
  });

  it('Excluir tarefa após marcar como concluída', () => {
    cy.visit(''); // Insira o URL ou caminho correto aqui

    // Adiciona uma tarefa
    cy.get('[data-cy=todo-input]')
      .type('Estudar para a prova{enter}');

    // Marca a tarefa como concluída
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();

    // Verifica se a tarefa está concluída
    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');

    // Remove a tarefa
    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    // Verifica se a lista está vazia
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Excluir uma tarefa incompleta', () => {
    cy.visit('');

    // Adiciona várias tarefas
    cy.get('[data-cy=todo-input]')
      .type('Fazer compras{enter}')
      .type('Estudar para a prova{enter}')
      .type('Ler um livro{enter}');

    // Marca a segunda tarefa como concluída
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .eq(1)
      .click();

    // Verifica se a segunda tarefa foi marcada como concluída
    cy.get('[data-cy=todos-list] > li')
      .eq(1)
      .should('have.class', 'completed');

    // Exclui a primeira tarefa (incompleta)
    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .eq(0)  // Seleciona a tarefa incompleta
      .invoke('show')
      .click();

    // Verifica se a primeira tarefa foi excluída
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2); // Deve restar duas tarefas
  });

});
