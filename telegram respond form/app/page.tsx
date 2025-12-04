import { ContactForm } from "@/components/contact-form"
import { BackButton } from "@/components/back-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent/10 flex items-center justify-center p-4 relative">
      <BackButton />
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-5xl font-bold mb-3 text-balance text-foreground">Мир настольных игр</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-xl mx-auto">
            Есть вопросы о настольных играх? Хотите поделиться советом? Заполните форму ниже!
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  )
}
