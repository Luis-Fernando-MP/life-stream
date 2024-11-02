import RedBlackTree, { ITreeNodeData, TreeNode } from './RedBlackTree'

export interface D3TreeNodeData {
  children: D3TreeNodeData[] | null[]
}

export function parseTreeToD3<T extends ITreeNodeData>(data: T[]) {
  if (!data || data.length === 0) return null

  const redBlackTree = RedBlackTree.fromArray<T>(data)

  type TCreateHierarchy = {
    node: TreeNode<T>
    children: ((TreeNode<T> & D3TreeNodeData[]) | null)[]
  }
  const createHierarchy = (node: TreeNode<T>): TCreateHierarchy | null => {
    if (node === redBlackTree.nullNode) return null

    const leftChild = createHierarchy(node.left as TreeNode<T>)
    const rightChild = createHierarchy(node.right as TreeNode<T>)
    const children = [leftChild, rightChild].filter(Boolean)

    const result = {
      node,
      children
    }

    return result as TCreateHierarchy
  }

  return createHierarchy(redBlackTree.root)
}
