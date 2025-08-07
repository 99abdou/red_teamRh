import React from 'react'
import { Button } from './ui/button'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'

interface SocialButtonProps {
  provider: 'google' | 'facebook'
  onClick: () => void
}

export default function SocialButton({ provider, onClick }: SocialButtonProps) {
  const baseClasses = "flex-1 h-12 border-2 font-semibold"
  
  const providerConfig = {
    google: {
      icon: <FaGoogle className="w-5 h-5" />,
      styles: "border-gray-300 text-gray-700 hover:bg-gray-50"
    },
    facebook: {
      icon: <FaFacebookF className="w-5 h-5" />,
      styles: "border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
    }
  }

  const config = providerConfig[provider]

  return (
    <Button
      variant="outline"
      className={`${baseClasses} ${config.styles}`}
      onClick={onClick}
    >
      {config.icon}
    </Button>
  )
}
