export enum DEV_MODE {
  PROD = 'production',
  DEV = 'development'
}
export const DEV_ENV = process.env.NODE_ENV ?? DEV_MODE.DEV

export const URL = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

export const GITHUB_REPOSITORY = 'https://github.com/Luis-Fernando-MP/life-stream'

export const FIGMA_URL = 'https://www.figma.com/design/M6clGXGFX5vB9G2Mdfp7XY/life-stream?node-id=1-25&t=78tx6BiTvqWERla6-1'
