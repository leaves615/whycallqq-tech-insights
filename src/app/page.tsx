import { getSiteConfig, getCategoryStats, getAllReports, getAllTags } from '@/lib/data';
import Link from 'next/link';

export default function HomePage() {
  const config = getSiteConfig();
  const categories = getCategoryStats();
  const reports = getAllReports();
  const tags = getAllTags().slice(0, 20);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-sm text-gray-400 mb-3 font-mono">
            基于 <a href={config.source} target="_blank" className="underline hover:text-gray-600">@whycallqq</a> 频道的深度技术知识库
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{config.name}</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">{config.description}</p>
          <div className="flex gap-4 mt-6">
            <span className="text-sm text-gray-400">
              📹 {reports.length} 个研究报告
            </span>
            <span className="text-sm text-gray-400">
              🏷️ {tags.length} 个技术标签
            </span>
            <span className="text-sm text-gray-400">
              📂 {categories.length} 个分类
            </span>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">知识分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="block p-5 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all group"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-black">{cat.name}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {cat.count > 0 ? `${cat.count} 篇报告` : '即将上线'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Reports */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">最新研究报告</h2>
        {reports.length === 0 ? (
          <p className="text-gray-400">研究报告正在生成中...</p>
        ) : (
          <div className="grid gap-4">
            {reports.slice(0, 10).map(report => (
              <Link
                key={report.video_id}
                href={`/report/${report.video_id}`}
                className="block p-5 border border-gray-100 rounded-lg hover:border-gray-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 hover:text-black">{report.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{report.summary}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {report.categories.map(cat => (
                        <span key={cat} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {cat}
                        </span>
                      ))}
                      {report.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-300 whitespace-nowrap shrink-0">{report.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Tags Cloud */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">热门标签</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="text-sm px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 hover:text-black transition-colors"
            >
              {tag} <span className="text-gray-300 ml-1">{count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-300">
        <p>{config.name} · {config.description}</p>
        <p className="mt-1">数据来源：<a href={config.source} target="_blank" className="underline">YouTube @whycallqq</a></p>
      </footer>
    </div>
  );
}