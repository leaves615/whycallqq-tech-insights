import { getAllReports } from '@/lib/data';
import Link from 'next/link';

export default function ReportsPage() {
  const reports = getAllReports();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">全部研究报告</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">📚 全部研究报告</h1>
          <p className="text-gray-400">{reports.length} 篇深度研究报告</p>
        </header>

        <div className="grid gap-4">
          {reports.map(report => (
            <Link
              key={report.video_id}
              href={`/report/${report.video_id}`}
              className="block p-5 border border-gray-100 rounded-lg hover:border-gray-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{report.summary}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {report.categories.map(cat => (
                      <span key={cat} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{cat}</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-300 shrink-0">{report.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}