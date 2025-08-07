import { useState, useMemo } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { useCounter } from '../hooks/useCounter'

// Données simulées plus complètes
const demandes = [
  { 
    id: 1, 
    type: 'Annuel', 
    debut: '2025-08-01', 
    fin: '2025-08-05', 
    statut: 'Approuvé',
    motif: 'Vacances d\'été',
    dateDemande: '2025-07-15',
    duree: 5
  },
  { 
    id: 2, 
    type: 'Maladie', 
    debut: '2025-07-10', 
    fin: '2025-07-11', 
    statut: 'Rejeté',
    motif: 'Grippe',
    dateDemande: '2025-07-09',
    duree: 2
  },
  { 
    id: 3, 
    type: 'Annuel', 
    debut: '2025-08-10', 
    fin: '2025-08-15', 
    statut: 'En attente',
    motif: 'Congé familial',
    dateDemande: '2025-07-20',
    duree: 6
  },
  { 
    id: 4, 
    type: 'Formation', 
    debut: '2025-09-01', 
    fin: '2025-09-03', 
    statut: 'Approuvé',
    motif: 'Formation professionnelle',
    dateDemande: '2025-08-15',
    duree: 3
  },
  { 
    id: 5, 
    type: 'Maternité', 
    debut: '2025-10-01', 
    fin: '2025-12-31', 
    statut: 'Approuvé',
    motif: 'Congé maternité',
    dateDemande: '2025-09-01',
    duree: 92
  },
  { 
    id: 6, 
    type: 'Autre', 
    debut: '2025-07-25', 
    fin: '2025-07-25', 
    statut: 'En attente',
    motif: 'Rendez-vous médical',
    dateDemande: '2025-07-20',
    duree: 1
  }
]

interface AnimatedCounterProps {
  value: number;
  delay: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, delay }) => {
  const { count, isAnimating } = useCounter(value, 2000, delay)
  
  return (
    <span className={`transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
      {count}
    </span>
  )
}

const Historique = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Fonction pour formater les dates
  const formatDate = (dateString : string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Fonction pour calculer la durée en jours
  const calculateDuration = (debut : string, fin : string) => {
    const start = new Date(debut)
    const end = new Date(fin)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays + 1 // +1 car on compte le jour de début
  }

  // Filtrage des données
  const filteredDemandes = useMemo(() => {
    return demandes.filter(demande => {
      const matchesSearch = demande.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           demande.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !statusFilter || statusFilter === 'all' || demande.statut === statusFilter
      const matchesType = !typeFilter || typeFilter === 'all' || demande.type === typeFilter
      
      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, statusFilter, typeFilter])

  // Pagination
  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDemandes = filteredDemandes.slice(startIndex, startIndex + itemsPerPage)

  // Statistiques
  const stats = useMemo(() => {
    const total = demandes.length
    const approuvees = demandes.filter(d => d.statut === 'Approuvé').length
    const rejetees = demandes.filter(d => d.statut === 'Rejeté').length
    const enAttente = demandes.filter(d => d.statut === 'En attente').length
    
    return { total, approuvees, rejetees, enAttente }
  }, [])

  const getStatusColor = (statut : string) => {
    switch (statut) {
      case 'Approuvé':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Rejeté':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Historique des demandes</h1>
        <p className="text-gray-600">Consultez l'historique de toutes vos demandes de congé</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-indigo-600">
            <AnimatedCounter value={stats.total} delay={0} />
          </div>
          <div className="text-sm text-gray-600">Total des demandes</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            <AnimatedCounter value={stats.approuvees} delay={200} />
          </div>
          <div className="text-sm text-gray-600">Approuvées</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            <AnimatedCounter value={stats.rejetees} delay={400} />
          </div>
          <div className="text-sm text-gray-600">Rejetées</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            <AnimatedCounter value={stats.enAttente} delay={600} />
          </div>
          <div className="text-sm text-gray-600">En attente</div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <Input
              placeholder="Rechercher par motif ou type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Approuvé">Approuvé</SelectItem>
                <SelectItem value="Rejeté">Rejeté</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Annuel">Annuel</SelectItem>
                <SelectItem value="Maladie">Maladie</SelectItem>
                <SelectItem value="Formation">Formation</SelectItem>
                <SelectItem value="Maternité">Maternité</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end sm:col-span-2 lg:col-span-1">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
                setTypeFilter('all')
                setCurrentPage(1)
              }}
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motif
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date demande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedDemandes.map(demande => (
                <tr key={demande.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{demande.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={demande.motif}>
                      {demande.motif}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(demande.debut)} - {formatDate(demande.fin)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {calculateDuration(demande.debut, demande.fin)} jour(s)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(demande.dateDemande)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(demande.statut)}`}>
                      {demande.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
                    <span className="font-medium">
                      {Math.min(startIndex + itemsPerPage, filteredDemandes.length)}
                    </span>{' '}
                    sur <span className="font-medium">{filteredDemandes.length}</span> résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex gap-3 rounded-md shadow-sm -space-x-px">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="rounded-l-md"
                    >
                      Précédent
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className="rounded-none"
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-r-md"
                    >
                      Suivant
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message si aucun résultat */}
        {filteredDemandes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Aucune demande trouvée</div>
            <div className="text-gray-400 text-sm mt-2">
              Essayez de modifier vos critères de recherche
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Historique
