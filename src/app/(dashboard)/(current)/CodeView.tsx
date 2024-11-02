import RedBlackTree, { ITreeNodeData, TreeColor, TreeNode } from '@/shared/RedBlackTree'
import { hierarchy, tree, zoom } from 'd3'
import { select } from 'd3-selection'
import { type JSX, memo, useEffect, useRef } from 'react'

const head = {
  root: 'life stream',
  trees: [
    [
      { id: 11, etc: 'n1', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 15, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 8, etc: 'n8', image: '/1.jpg' },
      { id: 4, etc: 'n9', image: '/1.jpg' },

      { id: 11, etc: 'n4', image: '/1.jpg' },
      { id: 17, etc: 'n5', image: '/1.jpg' },
      { id: 25, etc: 'n6', image: '/1.jpg' },
      { id: 6, etc: 'n7', image: '/1.jpg' },
      { id: 3, etc: 'n8', image: '/1.jpg' },

      { id: 13, etc: 'n4', image: '/1.jpg' },
      { id: 16, etc: 'n5', image: '/1.jpg' },
      { id: 20, etc: 'n6', image: '/1.jpg' },
      { id: 21, etc: 'n7', image: '/1.jpg' },
      { id: 22, etc: 'n8', image: '/1.jpg' },
      { id: 5, etc: 'n1', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 3, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 12, etc: 'n8', image: '/1.jpg' },
      { id: 4, etc: 'n9', image: '/1.jpg' }
    ],
    [
      { id: 5, etc: 'n1', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 3, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 12, etc: 'n8', image: '/1.jpg' },
      { id: 4, etc: 'n9', image: '/1.jpg' }
    ],
    [
      { id: 11, etc: 'n1', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 15, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 8, etc: 'n8', image: '/1.jpg' },
      { id: 4, etc: 'n9', image: '/1.jpg' },

      { id: 11, etc: 'n4', image: '/1.jpg' },
      { id: 17, etc: 'n5', image: '/1.jpg' },
      { id: 25, etc: 'n6', image: '/1.jpg' },
      { id: 6, etc: 'n7', image: '/1.jpg' },
      { id: 3, etc: 'n8', image: '/1.jpg' },

      { id: 13, etc: 'n4', image: '/1.jpg' },
      { id: 16, etc: 'n5', image: '/1.jpg' },
      { id: 20, etc: 'n6', image: '/1.jpg' },
      { id: 21, etc: 'n7', image: '/1.jpg' },
      { id: 22, etc: 'n8', image: '/1.jpg' },
      { id: 5, etc: 'n1', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 3, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 12, etc: 'n8', image: '/1.jpg' },
      { id: 4, etc: 'n9', image: '/1.jpg' }
    ],
    [
      { id: 5, etc: 'n1', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 3, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 12, etc: 'n8', image: '/1.jpg' },
      { id: 4, etc: 'n9', image: '/1.jpg' }
    ]
  ]
}

const CodeView = (): JSX.Element => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1200 // Ampliar el ancho para evitar cortes
    const height = 1000
    const margin = 100 // Ampliar márgenes para más espacio en los bordes

    const createTree = (data: ITreeNodeData[]) => {
      const redBlackTree = RedBlackTree.fromArray(data)

      interface ICreateHistory {
        id: number
        color: TreeColor
        children: ICreateHistory[]
      }
      const createHierarchy = (node: TreeNode): ICreateHistory | null => {
        if (node === redBlackTree.nullNode) return null

        return {
          id: node.data?.id ?? 0,
          color: node.color,
          etc: node.data?.etc,
          image: node.data?.image,
          children: [
            createHierarchy(node.left as TreeNode),
            createHierarchy(node.right as TreeNode)
          ].filter(Boolean)
        }
      }

      return createHierarchy(redBlackTree.root)
    }

    const treesData = head.trees.map(createTree)

    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height * treesData.length + 200)
      .attr('viewBox', [-margin, -margin, width + margin * 2, height * treesData.length + 200])
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;')
    svg.selectAll('*').remove()

    const g = svg.append('g').attr('class', 'tree-group')

    const mainNode = {
      id: head.root,
      color: 'green',
      children: [...treesData]
    }

    const treeLayout = tree()
      .size([height - margin * 2, width - margin * 2]) // Ajusta el alto del árbol
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.5))

    const hierarchyData = hierarchy(mainNode)
    treeLayout(hierarchyData)

    // Append links
    const linkGroup = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 2)
    linkGroup
      .selectAll('path')
      .data(hierarchyData.links())
      .join('path')
      .attr(
        'd',
        d =>
          `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`
      )

    // Append nodes
    const nodeGroup = g.append('g')

    // Agregar imagen encima de cada nodo
    nodeGroup
      .selectAll('image')
      .data(hierarchyData.descendants())
      .join('image')
      .attr('xlink:href', d => d.data.image) // Ruta de la imagen
      .attr('x', d => d.y - 10) // Centrado en x con un poco de ajuste
      .attr('y', d => d.x - 35) // 10px encima del nodo
      .attr('width', 30) // Ancho de la imagen
      .attr('height', 30) // Alto de la imagen
      .attr('clip-path', 'circle(30px)') // Hacer la imagen redonda

    // Dibujar nodos con tamaño ajustado y texto centrado
    nodeGroup
      .selectAll('circle')
      .data(hierarchyData.descendants())
      .join('circle')
      .attr('cx', d => d.y)
      .attr('cy', d => d.x)
      .attr('r', 25)
      .attr('fill', d => d.data.color)

    // Etiquetas centradas en cada nodo
    nodeGroup
      .selectAll('text')
      .data(hierarchyData.descendants())
      .join('text')
      .attr('x', d => d.y)
      .attr('y', d => d.x)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-weight', 'bold')
      .text(d => d.data.id)

    // Añadir funcionalidad de arrastre y zoom
    const cZoom = zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', event => {
        svg.attr('transform', event.transform)
      })

    svg.call(cZoom as any)
  }, [])

  return (
    <div className='overflow-x-auto'>
      <svg ref={svgRef} className='svg'></svg>
    </div>
  )
}

export default memo(CodeView)
