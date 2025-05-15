"use client"

import { useState } from "react"
import DataTable from "@/components/data-table"
import FormModal from "@/components/form-modal"
import Navbar from "@/components/navbar"

// Mock data for demonstration
import {BonCommande, Contrat, Marche} from "@/types"

const mockBonsCommande: BonCommande[] = [
  {
    id: 1,
    anneeBudgetaire: "2023",
    numCompte: "123456",
    rubrique: "Fournitures de bureau",
    pmnNum: "PMN-2023-001",
    pmnObjet: "Achat de fournitures",
    numBC: "BC-2023-001",
    dateBC: "2023-02-10",
    attributaire: "Papeterie Centrale SARL",
    montant: 45000,
    dateNotificationBC: "2023-02-15",
    delaiExecution: "30 jours",
    situationBCs: [],
  },
  {
    id: 2,
    anneeBudgetaire: "2023",
    numCompte: "789012",
    rubrique: "Matériel technique",
    pmnNum: "PMN-2023-002",
    pmnObjet: "Équipement technique",
    numBC: "BC-2023-002",
    dateBC: "2023-03-05",
    attributaire: "Tech Équipement SA",
    montant: 75000,
    dateNotificationBC: "2023-03-10",
    delaiExecution: "45 jours",
    situationBCs: [],
  },
]

// Define columns for the data table - Respecter l'ordre des champs du modèle
const columns = [
  { key: "id", header: "ID" },
  { key: "anneeBudgetaire", header: "Année budgétaire" },
  { key: "numCompte", header: "N° Compte" },
  { key: "rubrique", header: "Rubrique" },
  { key: "pmnNum", header: "N° PMN" },
  { key: "numBC", header: "N° BC" },
  { key: "dateBC", header: "Date BC" },
  { key: "attributaire", header: "Attributaire" },
  {
    key: "montant",
    header: "Montant",
    render: (item: BonCommande) => `${item.montant.toLocaleString()} DH`,
  },
  { key: "dateNotificationBC", header: "Date notification" },
  { key: "delaiExecution", header: "Délai d'exécution" },
]

export default function BonsCommandePage() {
  const [bcs, setBCs] = useState(mockBonsCommande)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBC, setCurrentBC] = useState<BonCommande | null>(null)
  const [modalTitle, setModalTitle] = useState("")

  const handleAdd = () => {
    setCurrentBC(null)
    setModalTitle("Ajouter un bon de commande")
    setIsModalOpen(true)
  }

  const handleEdit = (bc: BonCommande) => {
    setCurrentBC(bc)
    setModalTitle("Modifier le bon de commande")
    setIsModalOpen(true)
  }

  const handleExport = () => {
    // Logic to export to Excel would go here
    console.log("Export to Excel")
  }

  const handleSubmit = (formData: BonCommande | Marche | Contrat) => {
    if (!('pmnNum' in formData)) return; // S'assurer que c'est un BonCommande
    const bcData = formData as BonCommande;

    if (currentBC) {
      // Update existing BC with its situations
      setBCs((prev) => prev.map((bc) => (bc.id === currentBC.id ? { ...bcData, id: bc.id } : bc)))
    } else {
      // Add new BC with its situations
      const newId = Math.max(...bcs.map((bc) => bc.id), 0) + 1
      setBCs((prev) => [...prev, { ...bcData, id: newId }])
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Navbar showBackButton backUrl="/menu" />

      <div className="container mx-auto py-6 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestion des bons de commande</h1>
          <p className="text-gray-600">
            Cette section vous permet de gérer l&apos;ensemble des bons de commande (BC) de votre organisation. Les bons de
            commande sont liés à des PMN et permettent de suivre les achats.
          </p>
        </div>

        <DataTable
          data={bcs}
          columns={columns}
          onAdd={handleAdd}
          onExport={handleExport}
          onEdit={handleEdit}
          title="Liste des bons de commande"
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType="bc"
          title={modalTitle}
          data={currentBC}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  )
}
