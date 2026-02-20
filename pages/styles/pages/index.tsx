  import Link from 'next/link';
  import { BookOpen, Search, GraduationCap } from 'lucide-react';

  export default function Home() {
    return (
      <div className="min-h-screen gradient-bg">
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">🇳🇴  </span>
              NorskMester
            </Link>
            <div className="flex gap-4">
              <Link href="/dictionary" className="flex items-center gap-2 text-white hover:text-blue-200">
                <BookOpen className="w-5 h-5" />
                Словарь
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Изучай норвежский
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Более 1000 норвежских слов с переводом, примерами и удобным поиском
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/dictionary"
              className="flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semib
  old hover:scale-105 transition-transform"
            >
              <Search className="w-5 h-5" />
              Открыть словарь
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-80">Слов в базе</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-sm opacity-80">Уровня (A1-B2)</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-sm opacity-80">Тем</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-80">Бесплатно</div>
            </div>
          </div>
        </main>
      </div>
    );
  }
