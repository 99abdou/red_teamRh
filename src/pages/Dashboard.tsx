import { useState } from "react"
import { Button } from "../components/ui/button.js"
import { Input } from "../components/ui/input.js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.js"
import { LeavesTable } from "../components/leaves-table.js"
import { Pagination } from "../components/pagination.js"
import { StatsCards } from "../components/stats-cards.js"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog.js"
import { LeaveRequestForm } from "../components/leave-request-form"

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [status, setStatus] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1)
  const totalItems = 0 // À remplacer par vos vraies données depuis l'API
  const itemsPerPage = 10
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  return (
    <>
    <StatsCards />
      <div className="bg-white mt-4 rounded-lg border border-gray-200">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">Leaves</h2>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Nouvelle demande
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <Input
              placeholder="Leave Type or Reason"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
            <Input placeholder="dd / MMM / yyyy" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
            <Input placeholder="dd / MMM / yyyy" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Choisir un" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending"> En attente</SelectItem>
                <SelectItem value="approved">Approuvée</SelectItem>
                <SelectItem value="declined">Refusé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row items-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="outline" className="w-full sm:w-auto">Supprimé</Button>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full sm:w-auto">Filtre</Button>
          </div>
        </div>
      </div>

      <LeavesTable />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>

    {/* Modal pour nouvelle demande */}
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle demande de congé</DialogTitle>
        </DialogHeader>
        <LeaveRequestForm
          onSubmit={async (data) => {
            setIsSubmitting(true)
            try {
              // Ici vous pouvez ajouter l'appel API pour soumettre la demande
              console.log("Données de la demande:", data)
              // Simuler un délai d'API
              await new Promise(resolve => setTimeout(resolve, 1000))
              setIsModalOpen(false)
              // Vous pouvez ajouter une notification de succès ici
            } catch (error) {
              console.error("Erreur lors de la soumission:", error)
              // Vous pouvez ajouter une notification d'erreur ici
            } finally {
              setIsSubmitting(false)
            }
          }}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isSubmitting}
        />
      </DialogContent>
    </Dialog>
    </>
    
  )
}

export default Dashboard;
