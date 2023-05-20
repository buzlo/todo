import { test, expect } from 'vitest'

import { useFormatDate } from '../src/composables/useFormatDate'

test('Функция корректно возвращает строку даты в коротком формате', () => {
  const date1 = new Date(1998, 4, 14)
  const date2 = new Date(2023, 11, 1)

  expect(useFormatDate(date1)).toBe('14.05.1998')
  expect(useFormatDate(date2)).toBe('01.12.2023')
})

test('Функция корректно возвращает строку даты в длинном формате', () => {
  const date1 = new Date(1998, 4, 14)
  const date2 = new Date(2023, 11, 1)

  expect(useFormatDate(date1, false)).toBe('14 мая 1998')
  expect(useFormatDate(date2, false)).toBe('01 декабря 2023')
})
