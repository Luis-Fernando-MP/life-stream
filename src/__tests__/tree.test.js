import { describe, expect, it } from 'vitest'

import { RedBlackTree, TreeNode } from '../app/(dashboard)/(current)/tree/tree-ex'

describe('RedBlackTree', () => {
  it('debería insertar correctamente el nodo en el árbol', () => {
    const tree = new RedBlackTree()
    tree.insert(10)
    expect(tree.root.data).toBe(10)
    expect(tree.root.color).toBe('black')
    // El nodo raíz siempre debe ser negro
  })
})
