import { redirect } from "next/navigation"
import LoginForm from "@/components/login-form"
import { FileText } from "lucide-react"

export default function Home() {
  // Redirect to dashboard if already logged in
  // This would be replaced with actual auth check
  const isLoggedIn = false

  if (isLoggedIn) {
    redirect("/menu")
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Barre de navigation */}
      <header className="w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Gestion des marchés</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
