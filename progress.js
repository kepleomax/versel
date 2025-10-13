window.addEventListener('scroll', () => {
	const scrollTop = window.scrollY || document.documentElement.scrollTop
	const scrollHeight = document.body.scrollHeight - window.innerHeight

	// Вычисляем процент прокрутки
	const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0

	// Находим .progress-thumb
	const progressThumb = document.querySelector('.progress-thumb')

	if (progressThumb) {
		// Обновляем ширину
		progressThumb.style.width = scrollPercent + '%'

		// Убираем border-radius на 100%
		if (scrollPercent >= 99) {
			progressThumb.style.borderRadius = '0'
		} else {
			// Возвращаем, если нужно (например, был скролл вверх)
			progressThumb.style.borderRadius = '' // сброс до значения из CSS
		}
	}
})
