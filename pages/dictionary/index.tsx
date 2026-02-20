 import { useState, useEffect } from 'react';
  import Link from 'next/link';
  import { ArrowLeft } from 'lucide-react';

  export default function Dictionary() {
    const [words, setWords] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      fetch('/words.json')
        .then(res => res.json())
        .then(data => setWords(data))
        .catch(err => console.error(err));
    }, []);

    const filtered = words.filter(w =>
      w.word?.toLowerCase().includes(search.toLowerCase()) ||
      w.translationRu?.toLowerCase().includes(search.toLowerCase())
    );

    const pageWords = filtered.slice((currentPage - 1) * 12, currentPage * 12);
    const totalPages = Math.ceil(filtered.length / 12) || 1;

    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Link href="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Словарь</h1>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto p-4">
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
          />

          <p className="mb-4 text-gray-600">Найдено: {filtered.length} слов</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageWords.map((word, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{word.word}</h3>
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    {word.level}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-1">{word.type}</p>
                <p className="text-blue-600 font-semibold mb-2">{word.translationRu}</p>
                <p className="text-gray-600 text-sm italic bg-gray-100 p-2 rounded">
                  "{word.example}"
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border rounded disabled:opacity-50"
              >
                Назад
              </button>
              <span className="px-4 py-2 bg-white border rounded">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border rounded disabled:opacity-50"
              >
                Вперед
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

