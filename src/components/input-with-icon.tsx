import { Input } from './ui/input'
import type { ReactNode } from 'react'

interface InputWithIconProps {
  icon: ReactNode
  label: string
  id: string
  type?: string
  placeholder?: string
  className?: string
}

export default function InputWithIcon({ 
  icon, 
  label, 
  id, 
  type = "text", 
  placeholder,
  className = ""
}: InputWithIconProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <Input
          id={id}
          type={type}
          className={`pl-10 h-12 border-gray-300 ${className}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
