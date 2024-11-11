import RedBlackTree, { TreeNode } from './RedBlackTree'

export interface D3TreeNodeData {
  children: D3TreeNodeData[] | null[]
}

export type TCreateHierarchy = {
  node: TreeNode
  children: ((TreeNode & D3TreeNodeData[]) | null)[]
}

export function parseTreeToD3(redBlackTree: RedBlackTree) {
  const createHierarchy = (node: TreeNode): TCreateHierarchy | null => {
    if (node === redBlackTree.nullNode) return null

    const leftChild = createHierarchy(node.left as TreeNode)
    const rightChild = createHierarchy(node.right as TreeNode)

    const result = {
      node,
      children: [leftChild, rightChild].filter(Boolean)
    }

    return result as TCreateHierarchy
  }

  return createHierarchy(redBlackTree.root)
}
