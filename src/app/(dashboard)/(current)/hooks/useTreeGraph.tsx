import { select } from 'd3'
import { useEffect, useRef, useState } from 'react'

const useTreeGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  return { svgRef }
}

export default useTreeGraph
