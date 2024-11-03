import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

import { useDataStore } from './store'

export const TreeView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { data } = useDataStore()

  useEffect(() => {
    if (!svgRef.current) return

    const width = 1200
    const height = 800
    const nodeRadius = 5

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height)

    svg.selectAll('*').remove()

    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`)

    // Función para crear un árbol binario rojo-negro
    function createRedBlackTree(items: any[]) {
      const root = { name: 'Root', children: [], color: 'black' }

      function insert(node: any, item: any, depth: number = 0) {
        if (!node.children) {
          node.children = []
        }

        if (node.children.length < 2) {
          const newNode = { name: item.id, data: item, color: depth % 2 === 0 ? 'red' : 'black' }
          node.children.push(newNode)
          return newNode
        }

        const childIndex = Math.floor(Math.random() * 2)
        return insert(node.children[childIndex], item, depth + 1)
      }

      items.forEach(item => insert(root, item))
      return root
    }

    // Crear árboles rojo-negro para cada modelo
    const trees = Object.entries(data).map(([key, items]) => ({
      name: key,
      children: [createRedBlackTree(items as any[])]
    }))

    const treeData = {
      name: 'Life Stream',
      children: trees
    }

    const tree = d3.tree().size([2 * Math.PI, Math.min(width, height) / 2 - 100])
    const root = d3.hierarchy(treeData)
    tree(root)

    const link = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr(
        'd',
        d3
          .linkRadial()
          .angle((d: any) => d.x)
          .radius((d: any) => d.y)
      )

    const node = g
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr(
        'transform',
        (d: any) => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
      )

    node
      .append('circle')
      .attr('fill', (d: any) => d.data.color || (d.children ? '#555' : '#999'))
      .attr('r', nodeRadius)

    node
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', (d: any) => (d.x < Math.PI === !d.children ? 6 : -6))
      .attr('text-anchor', (d: any) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
      .attr('transform', (d: any) => (d.x >= Math.PI ? 'rotate(180)' : null))
      .text((d: any) => d.data.name)
      .clone(true)
      .lower()
      .attr('stroke', 'white')

    node.append('title').text((d: any) => JSON.stringify(d.data.data || {}, null, 2))

    // Añadir funcionalidad de arrastre y zoom
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', event => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom as any)
  }, [data])

  return (
    <div className='overflow-x-auto'>
      <h3>SVG</h3>
      <svg ref={svgRef} style={{ width: '100%', height: '800px' }}></svg>
    </div>
  )
}
