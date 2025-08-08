
import { MdMoreHoriz } from "react-icons/md"
import { Button } from "./ui/button"
import type { Request } from "../contexts/RequestContext"

interface LeavesTableProps {
  requests: Request[];
}

function StatusBadge({ status }: { status: Request["status"] }) {
  const statusStyles = {
    'pending': "text-yellow-600 bg-yellow-100",
    'approved': "text-green-600 bg-green-100",
    'declined': "text-red-600 bg-red-100",
    'cancelled': "text-gray-600 bg-gray-100",
  }

  const statusLabels = {
    'pending': 'En attente',
    'approved': 'Approuvée',
    'declined': 'Refusé',
    'cancelled': 'Annulé',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  )
}

function TypeBadge({ type }: { type: Request["type"] }) {
  const typeStyles = {
    'conge': "text-blue-600 bg-blue-100",
    'absence': "text-orange-600 bg-orange-100",
    'formation': "text-purple-600 bg-purple-100",
    'autre': "text-gray-600 bg-gray-100",
  }

  const typeLabels = {
    'conge': 'Congé',
    'absence': 'Absence',
    'formation': 'Formation',
    'autre': 'Autre',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[type]}`}>
      {typeLabels[type]}
    </span>
  )
}

export function LeavesTable({ requests }: LeavesTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays} j`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">#</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Type</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">De</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">À</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Jours</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">Motif</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Statut</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-3 sm:px-6 py-8 text-center text-gray-500">
                Aucune demande trouvée
              </td>
            </tr>
          ) : (
            requests.map((request, index) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                  <TypeBadge type={request.type} />
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(request.startDate)}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(request.endDate)}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {calculateDays(request.startDate, request.endDate)}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-32 truncate" title={request.reason}>
                  {request.reason}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Button variant="ghost" size="sm">
                    <MdMoreHoriz className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
