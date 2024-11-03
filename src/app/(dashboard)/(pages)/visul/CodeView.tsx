import RedBlackTree, { ITreeNodeData, TreeColor, TreeNode } from '@/shared/tree/RedBlackTree'
import { parseTreeToD3 } from '@/shared/tree/parse'
import { hierarchy, tree, zoom } from 'd3'
import { select } from 'd3-selection'
import { memo, useEffect, useRef } from 'react'

const head = {
  root: 'life stream',
  trees: {
    tree1: [
      { id: 11 },
      { id: 2 },
      { id: 14 },
      { id: 1 },
      { id: 7 },
      { id: 15 },
      { id: 5 },
      { id: 8 },
      { id: 4 }
    ],
    tree2: [{ id: 50 }, { id: 30 }, { id: 70 }, { id: 80 }, { id: 60 }, { id: 40 }, { id: 20 }],
    tree3: [
      { id: 18 },
      { id: 42 },
      { id: 80 },
      { id: 37 },
      { id: 22 },
      { id: 15 },
      { id: 35 },
      { id: 39 },
      { id: 41 },
      { id: 38 },
      { id: 36 },
      { id: 2 },
      { id: 12 },
      { id: 6 },
      { id: 10 },
      { id: 16 },
      { id: 17 },
      { id: 20 },
      { id: 24 },
      { id: 21 }
    ]
  }
}

const CodeView = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    const treesData = Object.entries(head.trees)
      .map(([name, data]) => {
        return {
          id: name,
          color: '#555',
          children: [parseTreeToD3(data)]
        }
      })
      .filter(tree => !tree.children.includes(null))

    if (treesData.length === 0) {
      select(svgRef.current).selectAll('*').remove()
      return
    }

    const mainNode = {
      id: 'Life Stream',
      color: '#4747dc',
      children: treesData
    }

    const hierarchyData = hierarchy(mainNode)

    const nodeCount = hierarchyData.descendants().length
    const depthSpacing = 200 // Espaciado entre niveles del árbol
    const siblingSpacing = 40 // Espaciado entre nodos hermanos
    const margin = 50
    const width = Math.max(1200, nodeCount * siblingSpacing)
    const height = Math.max(800, hierarchyData.height * depthSpacing)

    const treeLayout = tree()
      .size([width - margin * 2, height - margin * 2])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2.5))
    treeLayout(hierarchyData)

    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-margin, -margin, width + margin * 2, height + margin * 2])
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;')

    svg.selectAll('*').remove()

    // Grupo para los enlaces
    const g = svg.append('g').attr('class', 'tree-group')
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
      .attr('d', d => {
        console.log(d)

        return ` M${d.source.x},${d.source.y}C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`
      })

    // Grupo general de nodos
    const nodeGroup = g.append('g')

    nodeGroup
      .selectAll('rect')
      .data(hierarchyData.descendants().filter(d => d.data.color))
      .join('rect')
      .attr('x', d => d.x - 50)
      .attr('y', d => d.y - 25)
      .attr('width', 100)
      .attr('height', 50)
      .attr('rx', 10)
      // .attr('ry', 10)
      .attr('fill', d => d.data.color)

    nodeGroup
      .selectAll('text')
      .data(hierarchyData.descendants().filter(d => d.data.color))
      .join('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-weight', 'bold')
      .text(d => d.data?.id ?? '')

    // grupo para los nodos
    const widthNodeImage = 30
    nodeGroup
      .selectAll('g')
      .data(hierarchyData.descendants().filter(d => d.data?.node?.data))
      .join('g')
      .attr('transform', d => `translate(${d.x - widthNodeImage / 2}, ${d.y - widthNodeImage / 2})`)
      .style('cursor', 'pointer')
      .attr('class', 'tree-node')
      .on('click', (...d) => {
        console.log(d)
      })
      .each(function (d, i) {
        const group = select(this)
        // Cuadrado con border
        group
          .append('rect')
          .attr('x', -1)
          .attr('y', -1)
          .attr('width', widthNodeImage)
          .attr('height', widthNodeImage)
          .attr('fill', d.data?.node?.color ?? TreeColor.BLACK)
          .attr('rx', 5)

        group
          .append('text')
          .attr('x', widthNodeImage / 2)
          .attr('y', -5)
          .attr('text-anchor', 'middle')
          .attr('font-weight', '900')
          .style('font-size', '16')
          .attr('fill', d.data?.node?.color ?? TreeColor.BLACK)
          .text(d.data?.node?.data?.id ?? '')

        const maxImg = 5
        const imgSize = widthNodeImage - maxImg
        const imgCenter = maxImg / 3
        group
          .append('clipPath')
          .attr('id', `clip-${i}`)
          .append('rect')
          .attr('width', imgSize)
          .attr('height', imgSize)
          .attr('rx', imgSize)
          .attr('x', imgCenter)
          .attr('y', imgCenter)
        // Image
        group
          .append('image')
          .attr('xlink:href', d.data?.node?.data?.image)
          .attr('x', imgCenter)
          .attr('y', imgCenter)
          .attr('width', imgSize)
          .attr('height', imgSize)
          .attr('preserveAspectRatio', 'xMidYMid slice')
          .attr('clip-path', `url(#clip-${i})`)
      })

    const cZoom = zoom()
      .scaleExtent([0.5, 20])
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
