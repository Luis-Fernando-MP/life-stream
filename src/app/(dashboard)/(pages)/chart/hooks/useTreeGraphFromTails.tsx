import RedBlackTree, { ITreeNodeData, TreeColor } from '@/shared/tree/RedBlackTree'
import { TCreateHierarchy, parseTreeToD3 } from '@/shared/tree/parse'
import { hierarchy, select, tree, zoom } from 'd3'
import { MouseEvent, useEffect, useRef, useState } from 'react'

interface INodeDataResponse {
  node: TreeNode
  children: INodeDataResponse[]
}

interface INodeResponse {
  data: INodeDataResponse
  parent: INodeDataResponse
}

interface TreeNode extends ITreeNodeData {
  [key: string]: any
}

export interface ILinearTreeData {
  [key: string]: TreeNode[]
}

interface TreeGraphParams {
  trees?: ILinearTreeData
  onNodeClick: (data: INodeResponse, click: MouseEvent) => void
}

const useTreeGraph = ({ trees = {}, onNodeClick }: TreeGraphParams) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [treeState, setTrees] = useState(trees)

  useEffect(() => {
    if (!svgRef.current) return

    const treesData = Object.entries(treeState)
      .map(([name, values]) => {
        let children: (TCreateHierarchy | null)[] = []
        if (values && values.length > 0) {
          const redBlackTree = RedBlackTree.fromArray(values)
          children = [parseTreeToD3(redBlackTree)]
        }
        return {
          id: name,
          color: '#555',
          children
        }
      })
      .filter(tree => !tree.children.includes(null))

    if (treesData.length === 0) {
      select(svgRef.current).selectAll('*').remove()
      return
    }

    const head = {
      id: 'Life Stream',
      color: '#4747dc',
      children: treesData
    }

    const hierarchyData = hierarchy(head)
    const nodeCount = hierarchyData.descendants().length
    // Espaciado entre niveles del árbol
    const depthSpacing = 200
    // Espaciado entre nodos hermanos
    const siblingSpacing = 40
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
      .attr('style', 'width: 100%; height: 100%; font: 10px sans-serif;')

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
      .attr('d', (d: any) => {
        return ` M${d.source.x},${d.source.y}C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`
      })

    // Grupo general de nodos
    const nodeGroup = g.append('g')
    // Contenedor de los títulos
    nodeGroup
      .selectAll('rect')
      .data(hierarchyData.descendants().filter((d: any) => d.data.color))
      .join('rect')
      .attr('x', (d: any) => d.x - 50)
      .attr('y', (d: any) => d.y - 25)
      .attr('width', 100)
      .attr('height', 50)
      .attr('rx', 10)
      .attr('fill', (d: any) => d.data.color)
    // Títulos de cada árbol
    nodeGroup
      .selectAll('text')
      .data(hierarchyData.descendants().filter((d: any) => d.data.color))
      .join('text')
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-weight', 'bold')
      .text((d: any) => d.data?.id ?? '')

    // grupo para los nodos de los árboles
    const widthNodeImage = 30
    nodeGroup
      .selectAll('g')
      .data(hierarchyData.descendants().filter((d: any) => d.data?.node?.data))
      .join('g')
      .attr(
        'transform',
        (d: any) => `translate(${d.x - widthNodeImage / 2}, ${d.y - widthNodeImage / 2})`
      )
      .style('cursor', 'pointer')
      .attr('class', 'treeGraph')
      .on('click', function (e, d) {
        onNodeClick(d as any, e)
        const node = select(this)
        const ripple = node.select('.ripple-effect')
        ripple
          .attr('r', 0)
          .style('opacity', 1)
          .transition()
          .duration(600)
          .attr('r', 50)
          .style('opacity', 0)
          .on('end', () => {
            ripple.classed('animate', false)
          })
      })
      .each(function (d: any, i: number) {
        const group = select(this)
        // Círculo para la onda expansiva
        group
          .append('circle')
          .attr('class', 'ripple-effect')
          .attr('cx', widthNodeImage / 2)
          .attr('cy', widthNodeImage / 2)
          .attr('r', 0)
          .attr('fill', d.data?.node?.color ?? TreeColor.BLACK)

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
    svg.call(cZoom as any)
  }, [onNodeClick, treeState])

  return { svgRef, setTrees }
}

export default useTreeGraph
