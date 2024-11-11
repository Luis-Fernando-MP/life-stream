import type { JSX } from 'react'

import './style.scss'

interface IBoldText {
  className?: string
  bold: string
  middle: string
  desc: string
}

const BoldText = ({ className, bold, desc, middle }: IBoldText): JSX.Element => {
  return (
    <div className={`boldText ${className}`}>
      <div>
        <h1>{bold}</h1>
        <h4>{middle}</h4>
      </div>
      <h4>{desc}</h4>
    </div>
  )
}

export default BoldText
