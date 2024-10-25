import { ascending, cluster, hierarchy, linkRadial, max, scaleLinear, tree, zoom } from 'd3'
import { type Selection, select } from 'd3-selection'
import { type JSX, useEffect, useRef, useState } from 'react'

import { redBlackTree } from './Tree'
import { useDataStore } from './store'

const CodeView = (): JSX.Element => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { data } = useDataStore()
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement,
    unknown,
    null,
    undefined
  >>(null)

  useEffect(() => {
    if (!svgRef.current) return
    if (!selection) {
      return setSelection(select(svgRef.current) as any)
    }

    const width = 928
    const height = width
    const cx = width * 0.5 // adjust as needed to fit
    const cy = height * 0.54 // adjust as needed to fit
    const radius = Math.min(width, height) / 2 - 80

    const trees = Object.entries(data).map(([key, items]) => ({
      name: key,
      children: [redBlackTree(items as any[])]
    }))

    const treeData = {
      name: 'Life Stream',
      children: trees
    }

    // Create a radial cluster layout. The layout’s first dimension (x)
    // is the angle, while the second (y) is the radius.
    const tree = cluster()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)

    // Sort the tree and apply the layout.
    const root = hierarchy(treeData).sort((a, b) => ascending(a.data.name, b.data.name))
    tree(root)

    // Creates the SVG container.
    const svg = selection
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-cx, -cy, width, height])
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;')
    const group = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`)

    // Append links.
    group
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll()
      .data(root.links())
      .join('path')
      .attr(
        'd',
        linkRadial()
          .angle(d => d.x)
          .radius(d => d.y)
      )

    // Append nodes.
    group
      .append('g')
      .selectAll()
      .data(root.descendants())
      .join('circle')
      .attr('transform', (d: any) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`)
      .attr('fill', d => (d.children ? '#555' : '#999'))

      .attr('fill', (d: any) => d.data.color || (d.children ? '#555' : '#999'))
      .attr('r', 2.5)

    // Append labels.
    group
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll()
      .data(root.descendants())
      .join('text')
      .attr(
        'transform',
        (d: any) =>
          `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`
      )
      .attr('dy', '0.31em')
      .attr('x', (d: any) => (d.x < Math.PI === !d.children ? 6 : -6))
      .attr('text-anchor', (d: any) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
      .attr('paint-order', 'stroke')
      .attr('stroke', 'white')
      .attr('fill', 'currentColor')
      .text(d => d.data.name)

    // Añadir funcionalidad de arrastre y zoom
    const cZoom = zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', event => {
        group.attr('transform', event.transform)
      })

    svg.call(cZoom as any)
  }, [data, selection])

  return (
    <div className='overflow-x-auto'>
      <h3>S CODE</h3>
      <svg ref={svgRef} className='svg'></svg>
    </div>
  )
}

export default CodeView
