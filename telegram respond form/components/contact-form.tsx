"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, CheckCircle2, Dices } from "lucide-react"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Ошибка отправки")
      }

      setIsSuccess(true)
      toast({
        title: "Сообщение отправлено!",
        description: "Спасибо за ваш интерес к настольным играм. Свяжемся с вами в ближайшее время!",
      })

      // Очистка формы
      event.currentTarget.reset()

      // Сброс успеха через 3 секунды
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <Dices className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Связаться со мной</CardTitle>
        </div>
        <CardDescription className="text-base">
          Если есть интересные мысли о статье, хотите просто поблагодарить или предложить что-либо
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя *</Label>
            <Input id="name" name="name" placeholder="Иван Иванов" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" placeholder="ivan@example.com" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+7 (999) 123-45-67" disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Ваш вопрос или совет *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Поделитесь своими мыслями, благодарностью или предложениями..."
              required
              disabled={isLoading}
              rows={5}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Отправлено!
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Отправить сообщение
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
