export interface ITreeNodeData {
  id: number
  image?: string
  [key: string]: any
}

export enum TreeColor {
  BLACK = 'black',
  RED = 'red'
}

export class TreeNode {
  constructor(
    public data: ITreeNodeData | null = null,
    public color: TreeColor = TreeColor.BLACK,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
    public parent: TreeNode | null = null
  ) {}
}

export default class RedBlackTree {
  // Representa a los nodos vacíos
  public readonly nullNode: TreeNode
  public root: TreeNode

  constructor() {
    this.nullNode = new TreeNode()
    this.root = this.nullNode
  }

  protected diffTime(end: number, start: number) {
    return Number((end - start).toFixed(4))
  }

  public static fromArray(data: ITreeNodeData[]): RedBlackTree {
    const tree = new RedBlackTree()
    data.forEach(dt => tree.insert(dt))
    return tree
  }

  public insert(data: ITreeNodeData) {
    const startTime = performance.now()
    const newNode = new TreeNode(data, TreeColor.RED, this.nullNode, this.nullNode)

    let parentNode = null
    let currentNode: TreeNode | null = this.root

    while (currentNode !== this.nullNode) {
      // Foto del padre
      parentNode = currentNode
      // Si es menor, se va a la izquierda o a la derecha
      if (!currentNode?.data) continue
      currentNode = data.id < currentNode.data?.id ? currentNode.left : currentNode.right
    }

    // Asignamos su padre
    newNode.parent = parentNode

    // Existe un padre
    if (!parentNode) {
      this.root = newNode
    } else if (data.id < Number(parentNode.data?.id)) {
      parentNode.left = newNode
    } else {
      parentNode.right = newNode
    }
    this.fixInsert(newNode)
    const endTime = performance.now()

    return this.diffTime(endTime, startTime)
  }

  private fixInsert(node: TreeNode) {
    // balanceo y recoloreo
    // Mientras el padre del nodo sea rojo y no llegamos a la raíz
    while (node.parent && node.parent.color === TreeColor.RED) {
      // Si el padre es el hijo derecho de su abuelo
      const rightChildOfGrandpa = node.parent?.parent?.right
      if (node.parent === rightChildOfGrandpa) {
        const uncle = node.parent?.parent?.left

        // Caso 1: padre y tio son de color rojo
        // Se baja el color negro del abuelo y el rojo sube
        if (uncle?.color === TreeColor.RED) {
          uncle.color = TreeColor.BLACK
          node.parent.color = TreeColor.BLACK
          node.parent.parent!.color = TreeColor.RED // abuelo
          // Movemos el nodo hacia el abuelo
          node = node.parent?.parent as TreeNode
        } else {
          // Caso 3: hijo izquierdo, padre izquierdo rojos y tio derecho negro
          // Se intercambian los colores del papa y del abuelo, ya que se rotara
          if (node === node.parent.left) {
            node = node.parent
            this.rotateRight(node)
          }
          // Caso 2: Rotación izquierda y recoloreo
          // hijo derecho rojo, padre rojo y tio negro
          // Estructura del codo, hijo derecho eje de rotación
          node.parent!.color = TreeColor.BLACK
          node.parent!.parent!.color = TreeColor.RED
          this.rotateLeft(node.parent?.parent as TreeNode)
        }
      } else {
        // El mismo proceso de los casos anteriores, pero al revés
        const uncle = node.parent.parent?.right

        if (uncle?.color === TreeColor.RED) {
          uncle.color = TreeColor.BLACK
          node.parent.color = TreeColor.BLACK
          node.parent.parent!.color = TreeColor.RED
          node = node.parent.parent as TreeNode
        } else {
          if (node === node.parent.right) {
            node = node.parent
            this.rotateLeft(node)
          }
          node.parent!.color = TreeColor.BLACK
          node.parent!.parent!.color = TreeColor.RED
          this.rotateRight(node.parent?.parent as TreeNode)
        }
      }
      // Si llegamos a la raíz, rompemos el bucle
      if (node === this.root) break
    }

    this.root.color = TreeColor.BLACK
  }

  private rotateLeft(node: TreeNode) {
    // Se guarda el sub-árbol derecho del nodo
    const temp = node.right // 7

    // Sub-árbol izquierdo de temp como sub-árbol derecho de node
    node.right = temp?.left ?? null // 5
    if (temp?.left !== this.nullNode) {
      // Se actualiza el padre del hijo izquierdo
      temp!.left!.parent = node
    }
    // El padre de temp se convierte en el padre de node
    temp!.parent = node.parent
    if (!node.parent) {
      // Si node era la raíz, ahora temp es la raíz
      this.root = temp as TreeNode
    } else if (node === node.parent.left) {
      // Si node era el hijo izquierdo, temp lo reemplaza
      node.parent.left = temp
    } else {
      // Si node era el hijo derecho, temp lo reemplaza
      node.parent.right = temp
    }
    // node se convierte en el hijo izquierdo de temp
    temp!.left = node
    // Actualizar el padre de node
    node.parent = temp
  }

  private rotateRight(node: TreeNode) {
    const temp = node.left
    // Se mueve el sub-árbol derecho de temp como sub-árbol izquierdo de node
    node.left = temp?.right ?? null
    if (temp?.right !== this.nullNode) {
      // Actualizar el padre del hijo derecho de temp
      temp!.right!.parent = node
    }
    // El padre de temp se convierte en el padre de node
    temp!.parent = node.parent
    if (!node.parent) {
      // Si node era la raíz, ahora temp es la raíz
      this.root = temp as TreeNode
    } else if (node === node.parent.right) {
      // Si node era el hijo derecho, temp lo reemplaza
      node.parent.right = temp
    } else {
      // Si node era el hijo izquierdo, temp lo reemplaza
      node.parent.left = temp
    }
    // node se convierte en el hijo derecho de temp
    temp!.right = node
    // Actualizar el padre de node
    node.parent = temp
  }

  public delete(id: number) {
    const startTime = performance.now()
    const { node: z } = this.find(id)
    if (z === null) return { node: null, time: this.diffTime(performance.now(), startTime) }

    // Guardar el nodo a eliminar y su color original
    let y = z
    let yOriginalColor = y.color
    let x: TreeNode

    // Caso 1: El nodo no tiene hijo izquierdo
    if (z.left === this.nullNode) {
      x = z.right!
      this.transplant(z, z.right!)
    }

    // Caso 2: El nodo no tiene hijo derecho
    else if (z.right === this.nullNode) {
      x = z.left!
      this.transplant(z, z.left!)
    }

    // Caso 3: El nodo tiene ambos hijos
    else {
      // Encontrar el sucesor mínimo
      y = this.minimum(z.right!)
      yOriginalColor = y.color
      x = y.right!
      // Si el sucesor es el hijo directo
      if (y.parent === z) {
        x.parent = y
      } else {
        this.transplant(y, y.right!)
        y.right = z.right
        y.right!.parent = y
      }
      this.transplant(z, y)
      y.left = z.left
      y.left!.parent = y
      y.color = z.color
    }

    // Reparar el árbol si se eliminó un nodo negro
    if (yOriginalColor === TreeColor.BLACK) this.fixDelete(x)

    const endTime = performance.now()
    return { node: z, time: this.diffTime(endTime, startTime) }
  }

  private transplant(u: TreeNode, v: TreeNode) {
    // Reemplazar el sub-árbol en u con el sub-árbol en v
    if (!u.parent) {
      this.root = v
    } else if (u === u.parent.left) {
      u.parent.left = v
    } else {
      u.parent.right = v
    }
    v.parent = u.parent
  }

  private minimum(node: TreeNode): TreeNode {
    // Encontrar el nodo con el valor mínimo
    while (node.left !== this.nullNode) {
      node = node.left as TreeNode
    }
    return node
  }

  private fixDelete(x: TreeNode) {
    // Reparar el árbol si se rompe alguna propiedad
    while (x !== this.root && x.color === TreeColor.BLACK) {
      if (x === x.parent!.left) {
        let w = x.parent!.right!
        // Caso 1: Hermano rojo
        if (w.color === TreeColor.RED) {
          w.color = TreeColor.BLACK
          x.parent!.color = TreeColor.RED
          this.rotateLeft(x.parent!)
          w = x.parent!.right!
        }
        // Caso 2: Hermano negro con hijos negros
        if (w.left!.color === TreeColor.BLACK && w.right!.color === TreeColor.BLACK) {
          w.color = TreeColor.RED
          x = x.parent!
        } else {
          // Caso 3: Hermano negro con hijo derecho negro
          if (w.right!.color === TreeColor.BLACK) {
            w.left!.color = TreeColor.BLACK
            w.color = TreeColor.RED
            this.rotateRight(w)
            w = x.parent!.right!
          }
          // Caso 4: Hermano negro con hijo derecho rojo
          w.color = x.parent!.color
          x.parent!.color = TreeColor.BLACK
          w.right!.color = TreeColor.BLACK
          this.rotateLeft(x.parent!)
          x = this.root
        }
      } else {
        let w = x.parent!.left!
        // Caso 1: Hermano rojo
        if (w.color === TreeColor.RED) {
          w.color = TreeColor.BLACK
          x.parent!.color = TreeColor.RED
          this.rotateRight(x.parent!)
          w = x.parent!.left!
        }
        // Caso 2: Hermano negro con hijos negros
        if (w.right!.color === TreeColor.BLACK && w.left!.color === TreeColor.BLACK) {
          w.color = TreeColor.RED
          x = x.parent!
        } else {
          // Caso 3: Hermano negro con hijo izquierdo negro
          if (w.left!.color === TreeColor.BLACK) {
            w.right!.color = TreeColor.BLACK
            w.color = TreeColor.RED
            this.rotateLeft(w)
            w = x.parent!.left!
          }
          // Caso 4: Hermano negro con hijo izquierdo rojo
          w.color = x.parent!.color
          x.parent!.color = TreeColor.BLACK
          w.left!.color = TreeColor.BLACK
          this.rotateRight(x.parent!)
          x = this.root
        }
      }
    }
    x.color = TreeColor.BLACK
  }

  public inOrder(node: TreeNode = this.root, order: ITreeNodeData[] = []) {
    const startTime = performance.now()
    if (node !== this.nullNode) {
      this.inOrder(node.left as TreeNode, order)
      order?.push(node.data as ITreeNodeData)
      this.inOrder(node.right as TreeNode, order)
    }
    const endTime = performance.now()
    const time = this.diffTime(endTime, startTime)
    return { order, time }
  }

  public preOrder(node: TreeNode = this.root, order: ITreeNodeData[] = []) {
    const startTime = performance.now()
    if (node !== this.nullNode) {
      order?.push(node.data as ITreeNodeData)
      this.preOrder(node.left as TreeNode, order)
      this.preOrder(node.right as TreeNode, order)
    }
    const endTime = performance.now()
    const time = this.diffTime(endTime, startTime)
    return { order, time }
  }

  public postOrder(node: TreeNode = this.root, order: ITreeNodeData[] = []) {
    const startTime = performance.now()
    if (node !== this.nullNode) {
      this.postOrder(node.left as TreeNode, order)
      this.postOrder(node.right as TreeNode, order)
      order?.push(node.data as ITreeNodeData)
    }
    const endTime = performance.now()
    const time = this.diffTime(endTime, startTime)
    return { order, time }
  }

  public find(id: number, tree: TreeNode = this.root) {
    const startTime = performance.now()
    while (!!tree && tree?.data) {
      if (id === tree.data.id) {
        const endTime = performance.now()
        return { node: tree, time: this.diffTime(endTime, startTime) }
      }
      tree = id < tree?.data.id ? tree.left! : tree.right!
    }
    const endTime = performance.now()
    return { node: null, time: this.diffTime(endTime, startTime) }
  }

  public update(id: number, newData: any) {
    const startTime = performance.now()
    const { node } = this.find(id)
    if (node === null) return { node: null, time: this.diffTime(performance.now(), startTime) }
    node.data = { ...newData, id }
    const endTime = performance.now()
    return { node, time: this.diffTime(endTime, startTime) }
  }
}
