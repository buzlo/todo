import { test, expect } from 'vitest'

import { useGetNewId } from '../src/composables/useGetNewId'

test('Функция корректно возвращает новый ID для пустого массива', () => {
  const array = []
  expect(useGetNewId(array)).toBe(1)
})

test('Функция корректно возвращает новый ID для непустого массива', () => {
  const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  expect(useGetNewId(array)).toBe(5)
})
