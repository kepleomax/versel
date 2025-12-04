import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Валидация
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Заполните все обязательные поля" }, { status: 400 })
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("[v0] Missing Telegram credentials:", {
        hasToken: !!TELEGRAM_BOT_TOKEN,
        hasChatId: !!TELEGRAM_CHAT_ID,
      })
      return NextResponse.json(
        {
          error: "Telegram не настроен. Проверьте переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Sending to Telegram, chat_id:", TELEGRAM_CHAT_ID)

    // Форматирование сообщения для Telegram
    const telegramMessage = `
🔔 <b>Новое сообщение с формы обратной связи</b>

👤 <b>Имя:</b> ${name}
📧 <b>Email:</b> ${email}
${phone ? `📱 <b>Телефон:</b> ${phone}\n` : ""}
💬 <b>Сообщение:</b>
${message}

⏰ <b>Время:</b> ${new Date().toLocaleString("ru-RU")}
    `.trim()

    // Отправка в Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const telegramResponse = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    })

    const responseData = await telegramResponse.json()

    if (!telegramResponse.ok) {
      console.error("[v0] Telegram API error:", {
        status: telegramResponse.status,
        error: responseData,
        chatId: TELEGRAM_CHAT_ID,
      })

      if (responseData.description?.includes("chat not found")) {
        return NextResponse.json(
          {
            error: `CHAT_ID ${TELEGRAM_CHAT_ID} не найден. Проверьте правильность TELEGRAM_CHAT_ID. Это должен быть ваш личный ID или ID чата/канала.`,
          },
          { status: 400 },
        )
      }

      if (responseData.description?.includes("bot was blocked")) {
        return NextResponse.json(
          {
            error: "Бот заблокирован. Разблокируйте бота в Telegram и попробуйте снова.",
          },
          { status: 400 },
        )
      }

      return NextResponse.json(
        {
          error: `Ошибка Telegram API: ${responseData.description || "Неизвестная ошибка"}`,
        },
        { status: 400 },
      )
    }

    console.log("[v0] Message sent successfully to Telegram")

    return NextResponse.json({
      success: true,
      message: "Сообщение успешно отправлено",
    })
  } catch (error) {
    console.error("[v0] Error sending message:", error)
    return NextResponse.json({ error: "Ошибка отправки сообщения" }, { status: 500 })
  }
}
