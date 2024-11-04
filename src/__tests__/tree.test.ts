import { beforeEach, describe, expect, test } from 'vitest'

import RedBlackTree, { TreeColor } from '../shared/tree/RedBlackTree'

describe('RedBlackTree Tests', () => {
  let tree: RedBlackTree

  beforeEach(() => {
    tree = new RedBlackTree()
  })

  test('B1: Insertar un solo nodo y comprobar si es raíz y negro', () => {
    tree.insert({ id: 11 })
    expect(tree.root.data?.id).toBe(11)
    expect(tree.root.color).toBe('black')
  })

  test('IN1: Insertar 3 nodos, verifica el balance y colores', () => {
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
})
