const Color = {
  RED: 'RED',
  BLACK: 'BLACK'
}

console.log('a')

class TreaeNode {
  key: number | null
  data: any
  color: string
  left: TreeNode
  right: TreeNode
  parent: TreeNode | null

  constructor(key: number | null = null, data: any = null, color: string = Color.RED) {
    this.key = key
    this.data = data
    this.color = color
    this.left = null as any
    this.right = null as any
    this.parent = null
  }

  isRed(): boolean {
    return this.color === Color.RED
  }

  isBlack(): boolean {
    return this.color === Color.BLACK
  }

  setBlack() {
    this.color = Color.BLACK
  }

  setRed() {
    this.color = Color.RED
  }
}

class RedBlackTree {
  private NIL: TreeNode
  private root: TreeNode

  constructor() {
    this.NIL = new TreeNode(null, null, Color.BLACK)
    this.root = this.NIL
  }

  insert(key: number, data: any): void {
    const newNode = new TreeNode(key, data)
    newNode.left = newNode.right = this.NIL

    const { parentNode, currentNode } = this.traverseTree(key)
    newNode.parent = parentNode

    if (!parentNode) {
      this.root = newNode
    } else {
      this.assignParentSide(newNode, parentNode, key)
    }

    this.fixInsert(newNode)
  }

  private traverseTree(key: number): { parentNode: TreeNode | null; currentNode: TreeNode } {
    let currentNode = this.root
    let parentNode: TreeNode | null = null

    while (currentNode !== this.NIL) {
      parentNode = currentNode
      currentNode = key < currentNode.key! ? currentNode.left : currentNode.right
    }
    return { parentNode, currentNode }
  }

  private assignParentSide(newNode: TreeNode, parentNode: TreeNode, key: number): void {
    if (key < parentNode.key!) {
      parentNode.left = newNode
    } else {
      parentNode.right = newNode
    }
  }

  private fixInsert(node: TreeNode): void {
    while (node.parent?.isRed()) {
      const isParentLeftChild = node.parent === node.parent.parent?.left
      this.fixInsertForSide(node, isParentLeftChild ? 'left' : 'right')
    }
    this.root.setBlack()
  }

  private fixInsertForSide(node: TreeNode, side: 'left' | 'right'): void {
    const uncle = side === 'left' ? node.parent!.parent?.right : node.parent!.parent?.left

    if (uncle?.isRed()) {
      this.recolor(node, uncle)
    } else {
      this.handleRotation(node, side)
    }
  }

  private recolor(node: TreeNode, uncle: TreeNode): void {
    node.parent!.setBlack()
    uncle.setBlack()
    node.parent!.parent!.setRed()
    node = node.parent!.parent!
  }

  private handleRotation(node: TreeNode, side: 'left' | 'right'): void {
    const isNodeRightChild =
      side === 'left' ? node === node.parent!.right : node === node.parent!.left

    if (isNodeRightChild) {
      node = node.parent!
      side === 'left' ? this.rotateLeft(node) : this.rotateRight(node)
    }

    node.parent!.setBlack()
    node.parent!.parent!.setRed()
    side === 'left' ? this.rotateRight(node.parent!.parent!) : this.rotateLeft(node.parent!.parent!)
  }

  private rotateLeft(node: TreeNode): void {
    const rightChild = node.right
    node.right = rightChild.left

    if (rightChild.left !== this.NIL) {
      rightChild.left.parent = node
    }

    this.transplantNode(node, rightChild)
    rightChild.left = node
    node.parent = rightChild
  }

  private rotateRight(node: TreeNode): void {
    const leftChild = node.left
    node.left = leftChild.right

    if (leftChild.right !== this.NIL) {
      leftChild.right.parent = node
    }

    this.transplantNode(node, leftChild)
    leftChild.right = node
    node.parent = leftChild
  }

  private transplantNode(oldNode: TreeNode, newNode: TreeNode): void {
    if (!oldNode.parent) {
      this.root = newNode
    } else if (oldNode === oldNode.parent.left) {
      oldNode.parent.left = newNode
    } else {
      oldNode.parent.right = newNode
    }
    newNode.parent = oldNode.parent
  }

  search(key: number): TreeNode | null {
    let currentNode = this.root
    while (currentNode !== this.NIL && key !== currentNode.key) {
      currentNode = key < currentNode.key! ? currentNode.left : currentNode.right
    }
    return currentNode === this.NIL ? null : currentNode
  }

  update(key: number, newData: any): void {
    const node = this.search(key)
    if (node) {
      node.data = newData
    }
  }

  delete(key: number): void {
    const nodeToDelete = this.search(key)
    if (!nodeToDelete) return

    let nodeToReplace = nodeToDelete
    let originalColor = nodeToReplace.color
    let replacementNode

    if (nodeToDelete.left === this.NIL) {
      replacementNode = nodeToDelete.right
      this.transplantNode(nodeToDelete, nodeToDelete.right)
    } else if (nodeToDelete.right === this.NIL) {
      replacementNode = nodeToDelete.left
      this.transplantNode(nodeToDelete, nodeToDelete.left)
    } else {
      nodeToReplace = this.findMinimum(nodeToDelete.right)
      originalColor = nodeToReplace.color
      replacementNode = nodeToReplace.right

      if (nodeToReplace.parent === nodeToDelete) {
        replacementNode!.parent = nodeToReplace
      } else {
        this.transplantNode(nodeToReplace, nodeToReplace.right)
        nodeToReplace.right = nodeToDelete.right
        nodeToReplace.right.parent = nodeToReplace
      }

      this.transplantNode(nodeToDelete, nodeToReplace)
      nodeToReplace.left = nodeToDelete.left
      nodeToReplace.left.parent = nodeToReplace
      nodeToReplace.color = nodeToDelete.color
    }

    if (originalColor === Color.BLACK) {
      this.fixDelete(replacementNode)
    }
  }

  private fixDelete(node: TreeNode): void {
    while (node !== this.root && node.isBlack()) {
      const isNodeLeftChild = node === node.parent!.left
      this.fixDeleteForSide(node, isNodeLeftChild ? 'left' : 'right')
    }
    node.setBlack()
  }

  private fixDeleteForSide(node: TreeNode, side: 'left' | 'right'): void {
    let sibling = side === 'left' ? node.parent!.right : node.parent!.left

    if (sibling!.isRed()) {
      sibling!.setBlack()
      node.parent!.setRed()
      side === 'left' ? this.rotateLeft(node.parent!) : this.rotateRight(node.parent!)
      sibling = side === 'left' ? node.parent!.right : node.parent!.left
    }

    if (sibling!.left!.isBlack() && sibling!.right!.isBlack()) {
      sibling!.setRed()
      node = node.parent!
    } else {
      if ((side === 'left' ? sibling!.right : sibling!.left)!.isBlack()) {
        ;(side === 'left' ? sibling!.left : sibling!.right)!.setBlack()
        sibling!.setRed()
        side === 'left' ? this.rotateRight(sibling!) : this.rotateLeft(sibling!)
        sibling = side === 'left' ? node.parent!.right : node.parent!.left
      }

      sibling!.color = node.parent!.color
      node.parent!.setBlack()
      ;(side === 'left' ? sibling!.right : sibling!.left)!.setBlack()
      side === 'left' ? this.rotateLeft(node.parent!) : this.rotateRight(node.parent!)
      node = this.root
    }
  }

  private findMinimum(node: TreeNode): TreeNode {
    while (node.left !== this.NIL) {
      node = node.left
    }
    return node
  }
}

console.log('a')
