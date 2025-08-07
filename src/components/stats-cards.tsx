import React from "react"
import { useCounter } from "../hooks/useCounter"

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
    const stats = [
      { number: "16", label: "invalide", sublabel: "congés", color: "blue" as const },
      { number: "08", label: "Précédente", sublabel: "congés inutilisées", color: "purple" as const },
      { number: "02", label: "Congés en attente", sublabel: "Demandes", color: "orange" as const },
      { number: "02", label: "Rejetée", sublabel: "Congés", color: "red" as const },
    ]
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} index={index} />
        ))}
      </div>
    )
  }
  