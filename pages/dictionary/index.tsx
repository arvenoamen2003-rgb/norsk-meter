  import { useState, useEffect } from 'react';
  import Link from 'next/link';
  import { Search, Filter, BookOpen, ArrowLeft } from 'lucide-react';
  import wordsData from '../../public/words.json';

  interface Word {
    word: string;
    type: string;
    level: string;
    translationRu: string;
    translationEn: string;
    example: string;
    topic: string;
  }

  export default function Dictionary() {
    const [words, setWords] = useState<Word[]>([]);
    const [filteredWords, setFilteredWords] = useState<Word[]>([]);
    const [search, setSearch] = useState('');
    const [level, setLevel] = useState('');
    const [topic, setTopic] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const wordsPerPage = 12;

    useEffect(() => {
      setWords(wordsData);
      setFilteredWords(wordsData);
    }, []);

    useEffect(() => {
      let filtered = words;

      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(w =>
          w.word.toLowerCase().includes(searchLower) ||
          w.translationRu.toLowerCase().includes(searchLower)
        );
      }

      if (level) {
        filtered = filtered.filter(w => w.level === level);
      }

      if (topic) {
        filtered = filtered.filter(w => w.topic === topic);
      }

      setFilteredWords(filtered);
      setCurrentPage(1);
    }, [search, level, topic, words]);

    const topics = [...new Set(words.map(w => w.topic))].sort();
    const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
    const currentWords = filteredWords.slice(
      (currentPage - 1) * wordsPerPage,
      currentPage * wordsPerPage
    );

    const getLevelColor = (level: string) => {
      const colors: Record<string, string> = {
        A1: 'bg-green-500',
        A2: 'bg-blue-500',
        B1: 'bg-yellow-500',
        B2: 'bg-orange-500'
      };
      return colors[level] || 'bg-gray-500';
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="gradient-bg shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/" className="text-white hover:text-blue-200">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Словарь
            </h1>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск слова..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-bl
  ue-500"
                />
              </div>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              >
                <option value="">Все уровни</option>
                <option value="A1">A1 - Начальный</option>
                <option value="A2">A2 - Элементарный</option>
                <option value="B1">B1 - Средний</option>
                <option value="B2">B2 - Продвинутый</option>
              </select>

              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              >
                <option value="">Все темы</option>
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <button
                onClick={() => { setSearch(''); setLevel(''); setTopic(''); }}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-g
  ray-50"
              >
                <Filter className="w-5 h-5" />
                Сбросить
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6 text-gray-600">
            Показано {currentWords.length} из {filteredWords.length} слов
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWords.map((word, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{word.word}</h3>
                  <span className={`${getLevelColor(word.level)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {word.level}
                  </span>
                </div>

                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">{word.type}</p>

                <p className="text-blue-600 font-semibold text-lg mb-2">{word.translationRu}</p>
                <p className="text-gray-400 text-sm mb-4">{word.translationEn}</p>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-gray-600 italic">"{word.example}"</p>
                </div>

                <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {word.topic}
                </span>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Назад
              </button>
              <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Вперед
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
