import { useState } from 'react'
import { Button } from '../components/ui/button'
import { useCounter } from '../hooks/useCounter'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'

// Données simulées plus complètes
const soldes = [
  { 
    type: 'Annuel', 
    restant: 10, 
    total: 25, 
    utilise: 15,
    couleur: 'blue',
    icone: '🏖️',
    description: 'Congés payés annuels'
  },
  { 
    type: 'Maladie', 
    restant: 5, 
    total: 10, 
    utilise: 5,
    couleur: 'red',
    icone: '🏥',
    description: 'Congés maladie'
  },
  { 
    type: 'Maternité', 
    restant: 0, 
    total: 0, 
    utilise: 0,
    couleur: 'pink',
    icone: '👶',
    description: 'Congé maternité'
  },
  { 
    type: 'Formation', 
    restant: 8, 
    total: 12, 
    utilise: 4,
    couleur: 'purple',
    icone: '📚',
    description: 'Congés formation'
  },
  { 
    type: 'RTT', 
    restant: 3, 
    total: 8, 
    utilise: 5,
    couleur: 'orange',
    icone: '⏰',
    description: 'Récupération temps de travail'
  },
  { 
    type: 'Autre', 
    restant: 2, 
    total: 5, 
    utilise: 3,
    couleur: 'gray',
    icone: '📋',
    description: 'Autres types de congés'
  }
] as const

type AnimatedCounterProps = {
  value: number
  delay?: number
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, delay = 0 }) => {
  const { count, isAnimating } = useCounter(value, 2000, delay)
  
  return (
    <span className={`transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
      {count}
    </span>
  )
}

const SoldeConge = () => {
  const [selectedType, setSelectedType] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Calcul des statistiques globales
  const statsGlobales = soldes.reduce(
    (acc, solde) => {
      acc.totalRestant += solde.restant
      acc.totalUtilise += solde.utilise
      acc.totalDisponible += solde.total
      return acc
    },
    { totalRestant: 0, totalUtilise: 0, totalDisponible: 0 }
  )

  const getCouleurClasses = (couleur: string, type: 'bg' | 'text' = 'bg') => {
    const couleurs: Record<string, string> = {
      blue: type === 'bg' ? 'bg-blue-500' : 'text-blue-600',
      red: type === 'bg' ? 'bg-red-500' : 'text-red-600',
      pink: type === 'bg' ? 'bg-pink-500' : 'text-pink-600',
      purple: type === 'bg' ? 'bg-purple-500' : 'text-purple-600',
      orange: type === 'bg' ? 'bg-orange-500' : 'text-orange-600',
      gray: type === 'bg' ? 'bg-gray-500' : 'text-gray-600'
    }
    return couleurs[couleur] || (type === 'bg' ? 'bg-gray-500' : 'text-gray-600')
  }

  const getProgressColor = (pourcentage: number): string => {
    if (pourcentage >= 80) return 'bg-green-500'
    if (pourcentage >= 60) return 'bg-yellow-500'
    if (pourcentage >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Pour éviter les appels multiples à .find
  const selectedSolde = soldes.find(s => s.type === selectedType)

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Solde de congés</h1>
        <p className="text-gray-600">Consultez vos soldes de congés et vos droits restants</p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total restant</p>
              <p className="text-2xl font-bold text-indigo-600">
                <AnimatedCounter value={statsGlobales.totalRestant} delay={0} /> jours
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisé cette année</p>
              <p className="text-2xl font-bold text-green-600">
                <AnimatedCounter value={statsGlobales.totalUtilise} delay={200} /> jours
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taux d'utilisation</p>
              <p className="text-2xl font-bold text-purple-600">
                <AnimatedCounter 
                  value={
                    statsGlobales.totalDisponible > 0
                      ? Math.round((statsGlobales.totalUtilise / statsGlobales.totalDisponible) * 100)
                      : 0
                  }
                  delay={400}
                />%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cartes de soldes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {soldes.map((solde) => {
          const pourcentageRestant = solde.total > 0 ? (solde.restant / solde.total) * 100 : 0

          return (
            <div
              key={solde.type}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedType(solde.type as any)
                setIsModalOpen(true)
              }}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{solde.icone}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{solde.type}</h3>
                      <p className="text-sm text-gray-500">{solde.description}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getCouleurClasses(solde.couleur, 'bg')}`}></div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Restant</span>
                    <span className="text-sm font-bold text-gray-900">{solde.restant} / {solde.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(pourcentageRestant)}`}
                      style={{ width: `${Math.min(pourcentageRestant, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Utilisé</p>
                    <p className="font-semibold text-red-600">{solde.utilise} jours</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Restant</p>
                    <p className={`font-semibold ${solde.restant > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {solde.restant} jours
                    </p>
                  </div>
                </div>

                {solde.restant === 0 && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-xs text-red-600 font-medium">Aucun jour restant</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de détails */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <span className="text-2xl mr-3">{selectedSolde?.icone}</span>
              Détails - {selectedType}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Historique récent</h3>
              <div className="space-y-3">
                {[
                  { date: '2025-07-15', duree: 3, motif: "Vacances d'été" },
                  { date: '2025-06-20', duree: 1, motif: 'Rendez-vous médical' },
                  { date: '2025-05-10', duree: 2, motif: 'Formation' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium text-gray-900">{item.motif}</p>
                      <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{item.duree} jour(s)</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Informations</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total annuel :</span>
                  <span className="font-semibold">{(selectedSolde as any)?.total ?? 0} jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Utilisé :</span>
                  <span className="font-semibold text-red-600">{(selectedSolde as any)?.utilise ?? 0} jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Restant :</span>
                  <span className="font-semibold text-green-600">{selectedSolde?.restant ?? 0} jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taux d'utilisation :</span>
                  <span className="font-semibold">
                    {selectedSolde && selectedSolde.total > 0
                      ? Math.round((selectedSolde.utilise / selectedSolde.total) * 100)
                      : 0
                    }%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Actions rapides */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            📋 Nouvelle demande
          </Button>
          <Button variant="outline">
            📊 Voir l&apos;historique
          </Button>
          <Button variant="outline">
            📅 Calendrier des congés
          </Button>
          <Button variant="outline">
            📧 Contacter RH
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SoldeConge
