class Node {
  constructor(data = null, color = 'black', left = null, right = null, parent = null) {
    this.data = data
    this.color = color
    this.left = left
    this.right = right
    this.parent = parent
  }
}

class RedBlackTree {
  constructor() {
    this.nullNode = new Node()
    this.root = this.nullNode
  }

  insert(data) {
    const newNode = new Node(data, 'red', this.nullNode, this.nullNode)
    let parentNode = null
    let currentNode = this.root

    while (currentNode !== this.nullNode) {
      parentNode = currentNode
      currentNode = data < currentNode.data ? currentNode.left : currentNode.right
    }

    newNode.parent = parentNode
    if (!parentNode) {
      this.root = newNode
    } else if (data < parentNode.data) {
      parentNode.left = newNode
    } else {
      parentNode.right = newNode
    }

    this.fixInsert(newNode)
  }

  fixInsert(node) {
    while (node.parent && node.parent.color === 'red') {
      if (node.parent === node.parent.parent.right) {
        const uncle = node.parent.parent.left
        if (uncle.color === 'red') {
          uncle.color = 'black'
          node.parent.color = 'black'
          node.parent.parent.color = 'red'
          node = node.parent.parent
        } else {
          if (node === node.parent.left) {
            node = node.parent
            this.rotateRight(node)
          }
          node.parent.color = 'black'
          node.parent.parent.color = 'red'
          this.rotateLeft(node.parent.parent)
        }
      } else {
        const uncle = node.parent.parent.right
        if (uncle.color === 'red') {
          uncle.color = 'black'
          node.parent.color = 'black'
          node.parent.parent.color = 'red'
          node = node.parent.parent
        } else {
          if (node === node.parent.right) {
            node = node.parent
            this.rotateLeft(node)
          }
          node.parent.color = 'black'
          node.parent.parent.color = 'red'
          this.rotateRight(node.parent.parent)
        }
      }
      if (node === this.root) break
    }
    this.root.color = 'black'
  }

  rotateLeft(node) {
    const temp = node.right
    node.right = temp.left
    if (temp.left !== this.nullNode) {
      temp.left.parent = node
    }
    temp.parent = node.parent
    if (!node.parent) {
      this.root = temp
    } else if (node === node.parent.left) {
      node.parent.left = temp
    } else {
      node.parent.right = temp
    }
    temp.left = node
    node.parent = temp
  }

  rotateRight(node) {
    const temp = node.left
    node.left = temp.right
    if (temp.right !== this.nullNode) {
      temp.right.parent = node
    }
    temp.parent = node.parent
    if (!node.parent) {
      this.root = temp
    } else if (node === node.parent.right) {
      node.parent.right = temp
    } else {
      node.parent.left = temp
    }
    temp.right = node
    node.parent = temp
  }

  inOrderTraversal(node) {
    if (node !== this.nullNode) {
      this.inOrderTraversal(node.left)
      console.log(node.data + ' ')
      this.inOrderTraversal(node.right)
    }
  }

  preOrderTraversal(node) {
    if (node !== this.nullNode) {
      console.log(node.data + ' ')
      this.preOrderTraversal(node.left)
      this.preOrderTraversal(node.right)
    }
  }

  postOrderTraversal(node) {
    if (node !== this.nullNode) {
      this.postOrderTraversal(node.left)
      this.postOrderTraversal(node.right)
      console.log(node.data + ' ')
    }
  }
}

// Ejecución
const tree = new RedBlackTree()

tree.insert(11)
tree.insert(2)
tree.insert(14)
tree.insert(1)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(8)
tree.insert(4)
console.log(tree)

console.log('\nIn Orden:')
tree.inOrderTraversal(tree.root)

console.log('\nPre Orden:')
tree.preOrderTraversal(tree.root)

console.log('\nPost Orden:')
tree.postOrderTraversal(tree.root)

// Hola estimado, quiero que me ayudes a mejorar este código que es de árbol binario rojo y negro, para ello si puedes le haces test
