
import { useCounter } from "../hooks/useCounter"
import { useRequests } from "../contexts/RequestContext"

interface StatCardProps {
    number: string
    label: string
    sublabel: string
    color: "blue" | "purple" | "orange" | "red"
  }
  
    function StatCard({ number, label, sublabel, color, index }: StatCardProps & { index: number }) {
    const { count, isAnimating } = useCounter(parseInt(number), 2000, index * 200)
    
    const colorClasses = {
      blue: "text-indigo-600",
      purple: "text-purple-600",
      orange: "text-amber-600",
      red: "text-rose-600",
    }
  
    return (
      <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
        <div className={`text-2xl sm:text-3xl font-bold ${colorClasses[color]} mb-2 transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
          {count}
        </div>
        <div className="text-gray-900 font-medium text-sm sm:text-base">{label}</div>
        <div className="text-gray-500 text-xs sm:text-sm">{sublabel}</div>
      </div>
    )
  }
  
  export function StatsCards() {
    const { getRequestsByStatus, getRequestsByType } = useRequests()
    
    // Calculer les statistiques
    const pendingRequests = getRequestsByStatus('pending').length
    const declinedRequests = getRequestsByStatus('declined').length
    const cancelledRequests = getRequestsByStatus('cancelled').length
    
    // Calculer les congés disponibles (exemple: 20 jours par an)
    const totalLeaveDays = 20
    const usedLeaveDays = getRequestsByType('conge')
      .filter(req => req.status === 'approved')
      .reduce((total, req) => {
        const start = new Date(req.startDate)
        const end = new Date(req.endDate)
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
        return total + days
      }, 0)
    const remainingLeaveDays = totalLeaveDays - usedLeaveDays

    const stats = [
      { 
        number: remainingLeaveDays.toString(), 
        label: "Congés disponibles", 
        sublabel: "jours restants", 
        color: "blue" as const 
      },
      { 
        number: usedLeaveDays.toString(), 
        label: "Congés utilisés", 
        sublabel: "jours pris", 
        color: "purple" as const 
      },
      { 
        number: pendingRequests.toString(), 
        label: "Demandes en attente", 
        sublabel: "en cours de traitement", 
        color: "orange" as const 
      },
      { 
        number: (declinedRequests + cancelledRequests).toString(), 
        label: "Demandes rejetées", 
        sublabel: "refusées ou annulées", 
        color: "red" as const 
      },
    ]
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} index={index} />
        ))}
      </div>
    )
  }
  