"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import MarcheForm from "./marche-form"
import BCForm from "./bc-form"
import ContratForm from "./contrat-form"
import type { Marche, BonCommande, Contrat } from "@/types"
import {JSX} from "react";

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  formType: "marche" | "bc" | "contrat"
  title: string
  data?: Marche | BonCommande | Contrat | null | undefined
  onSubmit: (data: any) => void
}

export default function FormModal({ isOpen, onClose, formType, title, data, onSubmit }: FormModalProps): JSX.Element {
  const handleSubmit = (formData: any): void => {
    onSubmit(formData)
    onClose()
  }

  const renderForm = (): JSX.Element | null => {
    switch (formType) {
      case "marche":
        return <MarcheForm marche={data as Marche} onSubmit={handleSubmit} onCancel={onClose} />
      case "bc":
        return <BCForm bc={data as BonCommande | null} onSubmit={handleSubmit} onCancel={onClose} />
      case "contrat":
        return <ContratForm contrat={data as Contrat | null} onSubmit={handleSubmit} onCancel={onClose} />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  )
}
