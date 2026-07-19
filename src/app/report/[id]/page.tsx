import { getReportById, getAllReports } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const reports = getAllReports();
  return reports.map(r => ({ id: r.video_id }));
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReportById(id);
  if (!report) notFound();

  // 防御性处理缺失字段
  const categories = Array.isArray(report.categories) ? report.categories : [];
  const tags = Array.isArray(report.tags) ? report.tags : [];
  const keyPoints = Array.isArray(report.key_points) ? report.key_points : [];
  const resources = Array.isArray(report.resources) ? report.resources : [];
  const sources = report.deep_research?.original_sources && Array.isArray(report.deep_research.original_sources) 
    ? report.deep_research.original_sources : [];
  const techDetails = report.deep_research?.technical_details || '';
  const relatedWork = report.deep_research?.related_work || '';
  const summary = report.summary || '';
  const takeaways = report.takeaways || '';
  const duration = report.duration || '';
  const youtubeUrl = report.youtube_url || `https://www.youtube.com/watch?v=${report.video_id}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/reports" className="hover:text-gray-600">研究报告</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{report.title?.slice(0, 30) || '...'}...</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{report.title || '未命名'}</h1>
          <div className="flex gap-4 text-sm text-gray-400">
            {duration && <span>⏱️ {duration}</span>}
            <a href={youtubeUrl} target="_blank" className="underline hover:text-gray-600">📺 YouTube</a>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {categories.map(cat => (
              <Link key={cat} href={`/category/${encodeURIComponent(cat)}`} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                {cat}
              </Link>
            ))}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">📋 核心摘要</h2>
            <p className="text-gray-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">🎯 核心要点</h2>
            <ul className="space-y-2">
              {keyPoints.map((p, i) => (
                <li key={i} className="flex gap-2 text-gray-600">
                  <span className="text-gray-300 shrink-0">{i + 1}.</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Deep Research */}
        {(sources.length > 0 || techDetails || relatedWork) && (
          <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🔬 深度研究</h2>

            {sources.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">原始出处</h3>
                <div className="space-y-2">
                  {sources.map((src, i) => (
                    <a key={i} href={src.url} target="_blank" className="block text-sm text-gray-600 hover:text-black underline">
                      {src.name}
                      {src.description && ` — ${src.description.slice(0, 80)}...`}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {techDetails && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">技术细节</h3>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{techDetails}</div>
              </div>
            )}

            {relatedWork && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">相关工作</h3>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{relatedWork}</div>
              </div>
            )}
          </section>
        )}

        {/* Resources */}
        {resources.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">📚 相关资源</h2>
            <div className="space-y-2">
              {resources.map((res, i) => (
                <a key={i} href={res.url} target="_blank" className="flex items-center gap-3 text-sm p-3 border border-gray-100 rounded-lg hover:border-gray-300 transition-all">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">{res.type || 'link'}</span>
                  <span className="text-gray-700 hover:text-black">{res.title}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Takeaways */}
        {takeaways && (
          <section className="mb-8 p-6 border-l-4 border-gray-900 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">💡 关键启示</h2>
            <p className="text-gray-700 leading-relaxed">{takeaways}</p>
          </section>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <section>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className="text-xs px-2 py-0.5 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-50">
                  #{tag}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}