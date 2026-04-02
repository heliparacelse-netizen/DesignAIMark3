import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://design-ai-mark3.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://design-ai-mark3.vercel.app/studio', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://design-ai-mark3.vercel.app/register', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://design-ai-mark3.vercel.app/login', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
