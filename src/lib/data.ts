import * as fs from 'fs';
import * as path from 'path';

export interface VideoReport {
  video_id: string;
  title: string;
  youtube_url: string;
  duration: string;
  summary: string;
  key_points: string[];
  categories: string[];
  tags: string[];
  deep_research: {
    original_sources: { name: string; url: string; description: string }[];
    technical_details: string;
    related_work: string;
  };
  resources: { title: string; url: string; type: string }[];
  takeaways: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  source: string;
  version: string;
  categories: { id: string; name: string; icon: string; description: string }[];
  comparisons: {
    id: string;
    title: string;
    items: string[];
    dimensions: string[];
  }[];
}

const reportsDir = path.join(process.cwd(), 'src/data/reports');
const configPath = path.join(process.cwd(), 'src/data/site-config.json');

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(raw);
}

export function getAllReports(): VideoReport[] {
  if (!fs.existsSync(reportsDir)) return [];
  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.json'));
  return files
    .map(f => {
      const raw = fs.readFileSync(path.join(reportsDir, f), 'utf-8');
      return JSON.parse(raw) as VideoReport;
    })
    .sort((a, b) => {
      // 按视频ID排序（YouTube ID近似按时间倒序）
      return 0;
    });
}

export function getReportById(videoId: string): VideoReport | null {
  const filePath = path.join(reportsDir, `${videoId}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function getReportsByCategory(category: string): VideoReport[] {
  return getAllReports().filter(r => r.categories.includes(category));
}

export function getReportsByTag(tag: string): VideoReport[] {
  return getAllReports().filter(r => r.tags.includes(tag));
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagCount: Record<string, number> = {};
  getAllReports().forEach(r => {
    r.tags.forEach(t => {
      tagCount[t] = (tagCount[t] || 0) + 1;
    });
  });
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCategoryStats(): { id: string; name: string; icon: string; count: number }[] {
  const config = getSiteConfig();
  const reports = getAllReports();
  return config.categories.map(cat => {
    const count = reports.filter(r => r.categories.includes(cat.name)).length;
    return { ...cat, count };
  });
}