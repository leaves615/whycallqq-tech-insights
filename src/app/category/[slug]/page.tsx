import { getReportsByCategory, getCategoryStats, getSiteConfig } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const categories = getCategoryStats();
  return categories.map(c => ({ slug: c.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getSiteConfig();
  const catDef = config.categories.find(c => c.id === slug);
  if (!catDef) notFound();

  const reports = getReportsByCategory(catDef.name);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{catDef.icon} {catDef.name}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{catDef.icon} {catDef.name}</h1>
          <p className="text-gray-500">{catDef.description}</p>
          <p className="text-sm text-gray-400 mt-2">{reports.length} 篇研究报告</p>
        </header>

        {reports.length === 0 ? (
          <p className="text-gray-400 py-8 text-center">该分类下暂无报告</p>
        ) : (
          <div className="grid gap-4">
            {reports.map(report => (
              <Link
                key={report.video_id}
                href={`/report/${report.video_id}`}
                className="block p-5 border border-gray-100 rounded-lg hover:border-gray-300 transition-all"
              >
                <h3 className="font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{report.summary}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {report.tags.slice(0, 5).map(tag => (
                    <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}