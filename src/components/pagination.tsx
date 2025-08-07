import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { Button } from "./ui/button"
import React from "react"

export function Pagination() {
  return (
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <MdKeyboardArrowLeft className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
          1
        </Button>
        <Button variant="ghost" size="sm">
          2
        </Button>
        <Button variant="ghost" size="sm">
          3
        </Button>
        <Button variant="ghost" size="sm">
          10
        </Button>

        <Button variant="ghost" size="sm">
          <MdKeyboardArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
