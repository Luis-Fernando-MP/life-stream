export enum DEV_MODE {
  PROD = 'production',
  DEV = 'development'
}
export const DEV_ENV = process.env.NODE_ENV ?? DEV_MODE.DEV

export const URL = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

export const GITHUB_REPOSITORY = 'https://github.com/Luis-Fernando-MP/life-stream'
