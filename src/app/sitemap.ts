import { ROUTES } from '@/shared/routes'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map(route => ({
    url: `https://life-stream.vercel.app${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route.requiredRoles.length > 0 ? 0.8 : 1
  }))
}
