"use client"

export function BackButton() {
  const handleBack = () => {
    // Определяем базовый URL главной страницы
    // Если форма на localhost:3000, то главная страница обычно на другом порту или в корне
    const currentOrigin = window.location.origin
    let mainPageUrl: string

    if (currentOrigin.includes('localhost:3000') || currentOrigin.includes('127.0.0.1:3000')) {
      // Для локальной разработки - главная страница обычно на порту 80 или в файловой системе
      // Можно настроить под вашу конфигурацию
      mainPageUrl = 'http://localhost/index.html'
    } else if (currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1')) {
      // Если другой порт localhost, используем тот же origin
      const baseUrl = currentOrigin.replace(/:\d+$/, '')
      mainPageUrl = `${baseUrl}/index.html`
    } else {
      // Для продакшена - используем тот же домен
      const baseUrl = currentOrigin.replace(/:\d+$/, '')
      mainPageUrl = `${baseUrl}/index.html`
    }

    window.location.href = mainPageUrl
  }

  return (
    <button
      onClick={handleBack}
      className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/90 hover:bg-gray-100 border-2 border-gray-800 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm text-gray-900"
    >
      ← Вернуться к статье
    </button>
  )
}

