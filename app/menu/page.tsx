import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart, FileText, ShoppingCart, FileCodeIcon as FileContract, Settings } from "lucide-react"
import Navbar from "@/components/navbar"

export default function MenuPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu principal</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bienvenue dans votre application de gestion. Cette plateforme vous permet de gérer efficacement vos
              marchés, bons de commande et contrats, ainsi que leurs situations respectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <BarChart className="w-12 h-12 mx-auto text-blue-600" />
                <CardTitle className="text-gray-900">Tableau de bord</CardTitle>
                <CardDescription className="text-gray-600">
                  Visualisez les statistiques et l&apos;état global
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/tableau-de-bord">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <FileText className="w-12 h-12 mx-auto text-blue-600" />
                <CardTitle className="text-gray-900">Marchés</CardTitle>
                <CardDescription className="text-gray-600">Gérez les marchés et leurs situations</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/marches">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <ShoppingCart className="w-12 h-12 mx-auto text-blue-600" />
                <CardTitle className="text-gray-900">Bons de Commande</CardTitle>
                <CardDescription className="text-gray-600">
                  Gérez les bons de commande et leurs situations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/bons-commande">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <FileContract className="w-12 h-12 mx-auto text-blue-600" />
                <CardTitle className="text-gray-900">Contrats</CardTitle>
                <CardDescription className="text-gray-600">Suivez vos contrats et leurs échéances</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contrats">Accéder</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-gray-200">
              <CardHeader className="text-center">
                <Settings className="w-12 h-12 mx-auto text-blue-600" />
                <CardTitle className="text-gray-900">Paramétrage</CardTitle>
                <CardDescription className="text-gray-600">
                  Configurez les types de budget, rubriques et PMN
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/parametrage">Accéder</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
