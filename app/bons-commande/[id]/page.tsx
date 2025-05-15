"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import DetailView from "@/components/detail-view"
import FormModal from "@/components/form-modal"

// Mock data for demonstration - would be replaced with API call
const mockBonsCommande = [
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
    situationBCs: [
      {
        id: 1,
        dateLivraison: "2023-03-01",
        dateReceptionProvisoire: "2023-03-05",
        numFacture: "F2023-056",
        dateEnregistrement: "2023-03-07",
        dateServiceFait: "2023-03-10",
        dateLiquidation: "2023-03-15",
        montantFacture: 45000,
        paye: true,
        observation: "Livraison complète",
      },
    ],
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

export default function BCDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [bc, setBC] = useState<{
    id: number;
    anneeBudgetaire: string;
    numCompte: string;
    rubrique: string;
    pmnNum: string;
    pmnObjet: string;
    numBC: string;
    dateBC: string;
    attributaire: string;
    montant: number;
    dateNotificationBC: string;
    delaiExecution: string;
    situationBCs: {
      id: number;
      dateLivraison: string;
      dateReceptionProvisoire: string;
      numFacture: string;
      dateEnregistrement: string;
      dateServiceFait: string;
      dateLiquidation: string;
      montantFacture: number;
      paye: boolean;
      observation: string;
    }[];
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const id = Number(params.id)
    const foundBC = mockBonsCommande.find((b) => b.id === id)

    if (foundBC) {
      setBC(foundBC)
    } else {
      // Redirect to list if not found
      router.push("/bons-commande")
    }
  }, [params.id, router])

  const handleEdit = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    // In a real app, this would be an API call
    //setBC({ ...formData, id: bc.id })
    setIsModalOpen(false)
  }

  if (!bc) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <div className="container mx-auto py-6 px-4">Chargement...</div>
      </div>
    )
  }

  return (
    <>
      <DetailView type="bc" data={bc} backUrl="/bons-commande" onEdit={handleEdit} />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType="bc"
        title="Modifier le bon de commande"
        data={bc}
        onSubmit={handleSubmit}
      />
    </>
  )
}
