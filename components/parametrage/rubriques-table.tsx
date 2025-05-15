"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import RubriqueForm from "./rubrique-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data
const mockRubriques = [
  { id: 1, nCompte: "123456", rubrique: "Équipement informatique" },
  { id: 2, nCompte: "789012", rubrique: "Mobilier de bureau" },
  { id: 3, nCompte: "345678", rubrique: "Fournitures de bureau" },
]

export default function RubriquesTable() {
  const [rubriques, setRubriques] = useState(mockRubriques)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentRubrique, setCurrentRubrique] = useState<Rubrique | null>(null)
  const [formTitle, setFormTitle] = useState("")

  const handleAdd = () => {
    setCurrentRubrique(null)
    setFormTitle("Ajouter une rubrique")
    setIsFormOpen(true)
  }

interface Rubrique {
  id: number;
  nCompte: string;
  rubrique: string;
}

  const handleEdit = (rubrique: Rubrique) => {
    setCurrentRubrique(rubrique)
    setFormTitle("Modifier la rubrique")
    setIsFormOpen(true)
  }

  const handleDelete = (rubrique: Rubrique) => {
    setCurrentRubrique(rubrique)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setRubriques((prev) => prev.filter((item) => item.id !== currentRubrique?.id))
    setIsDeleteDialogOpen(false)
  }

  const handleSubmit = (formData: Omit<Rubrique, 'id'>) => {
    if (currentRubrique) {
      // Update
      setRubriques((prev) => prev.map((item) => (item.id === currentRubrique.id ? { ...formData, id: item.id } : item)))
    } else {
      // Add
      const newId = Math.max(...rubriques.map((item) => item.id), 0) + 1
      setRubriques((prev) => [...prev, { ...formData, id: newId }])
    }
    setIsFormOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-800">Rubriques</h2>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <div className="border border-blue-200 rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-blue-50">
            <TableRow>
              <TableHead className="text-blue-700 font-medium">ID</TableHead>
              <TableHead className="text-blue-700 font-medium">N° Compte</TableHead>
              <TableHead className="text-blue-700 font-medium">Rubrique</TableHead>
              <TableHead className="text-right text-blue-700 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rubriques.length > 0 ? (
              rubriques.map((rubrique) => (
                <TableRow key={rubrique.id} className="hover:bg-blue-50">
                  <TableCell>{rubrique.id}</TableCell>
                  <TableCell>{rubrique.nCompte}</TableCell>
                  <TableCell>{rubrique.rubrique}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(rubrique)}
                      className="text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(rubrique)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-blue-500">
                  Aucune rubrique trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="border-blue-200">
          <DialogHeader>
            <DialogTitle className="text-blue-800">{formTitle}</DialogTitle>
          </DialogHeader>
          <RubriqueForm rubrique={currentRubrique} onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="border-blue-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-blue-800">
              Êtes-vous sûr de vouloir supprimer cette rubrique ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-blue-600">
              Cette action est irréversible. Cette rubrique sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-blue-200 text-blue-600">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
