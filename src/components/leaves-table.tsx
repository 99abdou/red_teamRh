import React from "react"
import { MdMoreHoriz } from "react-icons/md"
import { Button } from "./ui/button"

interface LeaveRecord {
  sno: number
  type: string
  from: string
  to: string
  days: string
  reason: string
  status: "En attente" | "Approuvée" | "Annulé" | "Refusé"
}

const leaveData: LeaveRecord[] = [
  {
    sno: 1,
    type: "Casual",
    from: "19 Feb 2020 - 9:00 AM",
    to: "19 Feb 2020 - 6:00 PM",
    days: "1 d",
    reason: "Friend's wedding celebration",
    status: "En attente",
  },
  {
    sno: 2,
    type: "Casual",
    from: "19 Feb 2020 - 9:00 AM",
    to: "19 Feb 2020 - 6:00 PM",
    days: "1 d",
    reason: "Friend's wedding celebration",
    status: "En attente",
  },
  {
    sno: 3,
    type: "Casual",
    from: "19 Feb 2020 - 9:00 AM",
    to: "19 Feb 2020 - 6:00 PM",
    days: "1 d",
    reason: "Friend's wedding celebration",
    status: "Approuvée",
  },
  {
    sno: 4,
    type: "Casual",
    from: "19 Feb 2020 - 9:00 AM",
    to: "19 Feb 2020 - 6:00 PM",
    days: "1 d",
    reason: "Friend's wedding celebration",
    status: "Refusé",
  },
  {
    sno: 5,
    type: "Casual",
    from: "19 Feb 2020 - 9:00 AM",
    to: "19 Feb 2020 - 6:00 PM",
    days: "1 d",
    reason: "Friend's wedding celebration",
    status: "Annulé",
  },
]

function StatusBadge({ status }: { status: LeaveRecord["status"] }) {
  const statusStyles = {
    'En attente': "text-gray-600",
    'Annulé': "text-gray-400",
    'Approuvée': "text-green-600",
    'Refusé': "text-blue-600",
  }

  return <span className={`font-medium ${statusStyles[status]}`}>{status}</span>
}

export function LeavesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">SNo</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Type</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">From</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">To</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Days</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">Reason</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leaveData.map((record) => (
            <tr key={record.sno} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.sno}</td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.type}</td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.from}</td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.to}</td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.days}</td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-32 truncate" title={record.reason}>{record.reason}</td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                <StatusBadge status={record.status} />
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Button variant="ghost" size="sm">
                  <MdMoreHoriz className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
