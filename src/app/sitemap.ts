import type { MetadataRoute } from 'next'
import { labs } from '@/data/labs'
import { mentors } from '@/data/mentors'
import { publications } from '@/data/publications'
import { siteUrl } from '@/lib/site-url'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/tim-kiem`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/tru-cot`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/giang-vien`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/lab`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/thong-bao`, changeFrequency: 'weekly', priority: 0.6 },
  ]

  const detailRoutes: MetadataRoute.Sitemap = [
    ...publications.map((item) => ({
      url: `${siteUrl}/cong-trinh/${item.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...mentors.map((item) => ({
      url: `${siteUrl}/giang-vien/${item.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...labs.map((item) => ({
      url: `${siteUrl}/lab/${item.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]

  return [...staticRoutes, ...detailRoutes]
}
