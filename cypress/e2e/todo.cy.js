/// <reference types="cypress" />

describe('Список задач', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    cy.get('input[placeholder="Новая задача*"]').as('newTitleInput')
    cy.get('input[placeholder="Телефон*"]').as('newTelInput')
    cy.get('button').contains('Добавить').as('addItemBtn')
    cy.get('.filter').find('select').as('filterSelect')
    cy.get('.filter').find('input').as('filterInput')
  })

  it('Изначально в списке 4 дела', () => {
    cy.get('.todo-list__item').should('have.length', 4)
  })

  it('Новое дело добавляется при корректном заполнении обязательных полей', () => {
    cy.get('@newTitleInput').type('Тестовая задача')
    cy.get('@newTelInput').type('9876543210')
    cy.get('@addItemBtn').click()
    cy.get('.todo-list__item')
      .should('have.length', 5)
      .last()
      .find('input')
      .first()
      .should('have.value', 'Тестовая задача')
      .next()
      .should('have.value', '+7 987 654-32-10')
  })

  it('Новое дело не добавляется при некорректном заполнении обязательных полей', () => {
    cy.get('@newTitleInput').type('Тестовая задача')
    cy.get('@newTelInput').type('9876543')
    cy.get('@addItemBtn').click()
    cy.get('.todo-list__item').should('have.length', 4)
    cy.get('@newTelInput').should('have.class', 'is-invalid')

    cy.get('@newTitleInput').clear()
    cy.get('@newTelInput').clear()
    cy.get('@newTelInput').type('9876543210')
    cy.get('@addItemBtn').click()
    cy.get('@newTitleInput').should('have.class', 'is-invalid')
    cy.get('.todo-list__item').should('have.length', 4)
  })

  it('Дело отмечается как готовое', () => {
    cy.get('.todo-list__item').first().should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('.todo-list__item').first().find('button').contains('Готово').click()
    cy.get('.todo-list__item')
      .first()
      .should('not.have.css', 'background-color', 'rgb(255, 255, 255)')
  })

  it('Дело удаляется', () => {
    cy.get('.todo-list__item')
      .first()
      .then(($item) => {
        cy.wrap($item).find('button').contains('Удалить').click()
        cy.wrap($item).should('not.exist')
      })
  })

  it('Дело редактируется', () => {
    cy.get('.todo-list__item')
      .first()
      .as('firstItem')
      .find('button')
      .contains('Редактировать')
      .click()
    cy.get('@firstItem').find('input').first().clear()
    cy.get('@firstItem').find('input').first().type('Отредактированная задача')
    cy.get('@firstItem').find('input').eq(1).clear()
    cy.get('@firstItem').find('input').eq(1).type('0000000000')
    cy.get('@firstItem').find('button').contains('Сохранить').click()
    cy.get('@firstItem').find('input').first().should('have.value', 'Отредактированная задача')
    cy.get('@firstItem').find('input').eq(1).should('have.value', '+7 000 000-00-00')
  })

  it('Дело фильтруется по названию', () => {
    cy.get('@filterSelect').select('title')
    cy.get('@filterInput').type('сог')
    cy.get('.todo-list__item')
      .should('have.length', 1)
      .find('input')
      .first()
      .should('have.value', 'Согласовать изменения в комплекте')
  })

  it('Дело фильтруется по телефону', () => {
    cy.get('@filterSelect').select('tel')
    cy.get('@filterInput').type('457')
    cy.get('.todo-list__item')
      .should('have.length', 2)
      .first()
      .find('input')
      .eq(1)
      .should('have.value', '+7 457 689-09-87')
  })

  it('Дело фильтруется по описанию', () => {
    cy.get('@filterSelect').select('descr')
    cy.get('@filterInput').type('№')
    cy.get('.todo-list__item')
      .should('have.length', 2)
      .first()
      .find('input')
      .eq(2)
      .should('have.value', 'Ольга. Контракт №243 от 13.02.2023')
  })
})
