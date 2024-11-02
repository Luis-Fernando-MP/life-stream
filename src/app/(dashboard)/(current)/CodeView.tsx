import RedBlackTree, { ITreeNodeData, TreeColor, TreeNode } from '@/shared/tree/RedBlackTree'
import { hierarchy, tree, zoom } from 'd3'
import { select } from 'd3-selection'
import { memo, useEffect, useRef } from 'react'

const head = {
  root: 'life stream',
  trees: {
    tree1: [
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
    pacientes: [
      { id: 5, etc: 'n1', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 3, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 3, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 2, etc: 'n2', image: '/1.jpg' },
      { id: 14, etc: 'n3', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 3, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 12, etc: 'n8', image: '/1.jpg' },
      { id: 4, etc: 'n9', image: '/1.jpg' }
    ],
    tree2: [
      { id: 4, etc: 'n9', image: '/1.jpg' },
      { id: 1, etc: 'n4', image: '/1.jpg' },
      { id: 7, etc: 'n5', image: '/1.jpg' },
      { id: 3, etc: 'n6', image: '/1.jpg' },
      { id: 5, etc: 'n7', image: '/1.jpg' },
      { id: 12, etc: 'n8', image: '/1.jpg' },
      { id: 4, etc: 'n9', image: '/1.jpg' }
    ]
  }
}

const CodeView = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1200
    const height = 1000
    const margin = 100

    const handleClick = node => {
      console.log(node)
    }

    const createTree = data => {
      if (!data || data.length === 0) return null

      const redBlackTree = RedBlackTree.fromArray(data)

      const createHierarchy = node => {
        if (node === redBlackTree.nullNode) return null

        return {
          id: node.data?.id ?? 0,
          color: node.color,
          etc: node.data?.etc,
          image: node.data?.image,
          children: [createHierarchy(node.left), createHierarchy(node.right)].filter(Boolean)
        }
      }

      return createHierarchy(redBlackTree.root)
    }

    const treesData = Object.entries(head.trees)
      .map(([name, data]) => ({ name, data: createTree(data) }))
      .filter(tree => tree.data)

    if (treesData.length === 0) {
      select(svgRef.current).selectAll('*').remove()
      return
    }

    const mainNode = {
      id: head.root,
      color: 'green',
      children: treesData.map(tree => ({
        id: tree.name,
        color: 'blue',
        children: [tree.data]
      }))
    }

    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height + 200)
      .attr('viewBox', [-margin, -margin, width + margin * 2, height + 200])
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;')

    svg.selectAll('*').remove()

    const g = svg.append('g').attr('class', 'tree-group')

    const treeLayout = tree()
      .size([width - margin * 2, height - margin * 2])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2.5))

    const hierarchyData = hierarchy(mainNode)
    treeLayout(hierarchyData)

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
          `M${d.source.x},${d.source.y}C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`
      )

    const nodeGroup = g.append('g')

    nodeGroup
      .selectAll('circle')
      .data(hierarchyData.descendants())
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 25)
      .attr('fill', d => d.data.color)

    nodeGroup
      .selectAll('image')
      .data(hierarchyData.descendants().filter(d => d.data.image))
      .join('image')
      .attr('xlink:href', d => d.data.image)
      .attr('x', d => d.x - 15)
      .attr('y', d => d.y - 45)
      .attr('width', 30)
      .attr('height', 30)
      .attr('style', 'object-fit: cover;')
      .on('click', (...d) => {
        console.log(d)
      })

    nodeGroup
      .selectAll('text')
      .data(hierarchyData.descendants())
      .join('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-weight', 'bold')
      .text(d => d.data.id)

    const cZoom = zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', event => {
        g.attr('transform', event.transform)
      })

    svg.call(cZoom)
  }, [])

  return (
    <div className='overflow-x-auto'>
      <svg ref={svgRef} className='svg'></svg>
    </div>
  )
}

export default memo(CodeView)
