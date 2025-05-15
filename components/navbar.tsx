import Link from "next/link"
import { FileText, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {JSX} from "react";

interface NavbarProps {
  showBackButton?: boolean
  backUrl?: string
}

export default function Navbar({ showBackButton = false, backUrl = "/menu" }: NavbarProps): JSX.Element {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">Gestion des marchés</h1>
        </div>

        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Link href={backUrl}>Retour</Link>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <User className="h-5 w-5 mr-2" />
                <span>Mon compte</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
