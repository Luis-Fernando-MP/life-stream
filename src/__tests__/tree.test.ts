import { beforeEach, describe, expect, test } from 'vitest'

import RedBlackTree, { TreeColor } from '../shared/tree/RedBlackTree'

describe('RedBlackTree Tests', () => {
  let tree: RedBlackTree

  beforeEach(() => {
    tree = new RedBlackTree()
  })

  test('Insertar un solo nodo y comprobar si es raíz y negro', () => {
    tree.insert({ id: 11 })
    expect(tree.root.data?.id).toBe(11)
    expect(tree.root.color).toBe(TreeColor.BLACK)
  })

  test('Insertar 3 nodos, verifica el balance y colores', () => {
    tree.insert({ id: 11 })
    tree.insert({ id: 2 })
    tree.insert({ id: 14 })

    expect(tree.root.data?.id, 'padre 11').toBe(11)
    expect(tree.root.left?.data?.id, 'hijo iz 2').toBe(2)
    expect(tree.root.right?.data?.id, 'hijo dr 2').toBe(14)

    expect(tree.root.color, 'padre negro').toBe(TreeColor.BLACK)
    expect(tree.root.left?.color, 'hijo iz rojo').toBe(TreeColor.RED)
    expect(tree.root.right?.color, 'hijo dr rojo').toBe(TreeColor.RED)
  })

  test('Actualizar un nodo existente y verificar los nuevos datos', () => {
    tree.insert({ id: 11 })
    tree.insert({ id: 2 })
    tree.insert({ id: 14 })

    const { node } = tree.update(11, { id: 12, name: 'Updated Node' })
    expect(node?.data?.name).toBe('Updated Node')
    expect(node?.data?.id).not.toBe(12)
  })

  test('Eliminar un nodo y comprobar el nodo eliminado', () => {
    tree.insert({ id: 10 })
    tree.insert({ id: 2 })
    tree.insert({ id: 14 })

    const { node } = tree.delete(10)
    expect(node, 'Posiblemente eliminado').toBeTruthy()
    const { node: existNode } = tree.find(10)
    expect(existNode, 'Eliminado del árbol').toBeNull()
  })

  test('Intentar eliminar un nodo que no existe', () => {
    const { node } = tree.delete(99)
    expect(node).toBeNull()
  })
}).clear()

describe('Pruebas de tiempo y comparación de arbolesRN y colas, con 10000 datos', () => {
  let tree: RedBlackTree
  const data = Array(500)
    .fill(0)
    .map((_, i) => ({ id: i }))

  beforeEach(() => {
    tree = RedBlackTree.fromArray(data)
  })

  test('Tiempo de inserción', () => {
    function linearInsert(array: any[], data: any) {
      const startTime = performance.now()
      array.push(data)
      const endTime = performance.now()
      return { time: Number((endTime - startTime).toFixed(4)) }
    }

    const newData = { id: data.length + 1, name: 'nuevo' }

    const treeTime = tree.insert(newData)
    const tailsTime = linearInsert(data, newData)
    console.log(`Tiempo de inserción en ${data.length - 1} datos en ms:`)
    console.log('En árboles binarios: ', treeTime)
    console.log('En colas: ', tailsTime.time)

    expect(treeTime).not.equals(tailsTime.time)
  })

  test('Tiempo de búsqueda', () => {
    function linearSearch(array: any[], id: number) {
      const startTime = performance.now()
      const exist = array.find(a => a.id === id) ?? null
      const endTime = performance.now()
      return { node: exist, time: Number((endTime - startTime).toFixed(4)) }
    }

    const treeTime = tree.find(data.length - 1)
    const tailsTime = linearSearch(data, data.length - 1)
    console.log(`Tiempo de búsqueda en ${data.length - 1} datos en ms:`)
    console.log('En árboles binarios: ', treeTime.time)
    console.log('En colas: ', tailsTime.time)

    expect(treeTime.time, 'se espera menor tiempo en un árbol').toBeLessThan(tailsTime.time)
  })

  test('Tiempo de eliminación de un nodo', () => {
    function linearRemove(array: any[], id: number) {
      const startTime = performance.now()
      const index = array.findIndex(a => a.id === id)
      if (index !== -1) array.splice(index, 1)
      const endTime = performance.now()
      return Number((endTime - startTime).toFixed(4))
    }
    const { time: treeTime } = tree.delete(data.length - 1)

    const linearTime = linearRemove(data, data.length - 1)

    console.log(`Tiempo de eliminación en ${data.length - 1} datos en ms:`)
    console.log('En árboles binarios: ', treeTime)
    console.log('En colas: ', linearTime)

    expect(treeTime, 'se espera menor tiempo en un árbol').toBeLessThan(linearTime)
  })

  test('Prueba de tiempo en la actualización de un nodo, un árbol binario debería de demorar menos que una cola', () => {
    function linearUpdate(array: any[], id: number, newValue: any) {
      const startTime = performance.now()
      const index = array.findIndex(a => a.id === id)
      if (index !== -1) {
        array[index] = { ...array[index], ...newValue }
      }
      const endTime = performance.now()
      return Number((endTime - startTime).toFixed(4))
    }

    const { time: treeTime } = tree.update(data.length - 1, { newValue: 'updated' })

    const linearTime = linearUpdate(data, data.length - 1, { newValue: 'updated' })

    console.log(`Tiempo de actualización en ${data.length - 1} datos en ms:`)
    console.log('En árboles binarios: ', treeTime)
    console.log('En colas: ', linearTime)

    expect(treeTime).toBeLessThan(linearTime)
  })
})
