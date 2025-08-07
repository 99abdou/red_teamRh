
import { 
    MdEmail, 
    MdLock, 
    MdMoreHoriz, 
    MdCheck,
    MdVisibility,
    MdVisibilityOff 
  } from 'react-icons/md'
  import { 
    FaGoogle, 
    FaFacebookF, 
    FaTwitter, 
    FaLinkedinIn,
    FaGithub 
  } from 'react-icons/fa'
  import { 
    HiOutlineDocumentText,
    HiOutlineMenu,
    HiOutlineX 
  } from 'react-icons/hi'
  
  // Icônes d'authentification
  export const AuthIcons = {
    Email: MdEmail,
    Lock: MdLock,
    Visibility: MdVisibility,
    VisibilityOff: MdVisibilityOff,
    Check: MdCheck
  }
  
  // Icônes de réseaux sociaux
  export const SocialIcons = {
    Google: FaGoogle,
    Facebook: FaFacebookF,
    Twitter: FaTwitter,
    LinkedIn: FaLinkedinIn,
    GitHub: FaGithub
  }
  
  // Icônes d'interface
  export const UIIcons = {
    Document: HiOutlineDocumentText,
    Menu: HiOutlineMenu,
    Close: HiOutlineX,
    MoreHorizontal: MdMoreHoriz
  }
  
  // Composant d'icône générique avec props communes
  interface IconProps {
    className?: string
    size?: number
  }
  
  export const Icon = {
    Email: ({ className = "w-5 h-5", ...props }: IconProps) => 
      <MdEmail className={className} {...props} />,
    
    Lock: ({ className = "w-5 h-5", ...props }: IconProps) => 
      <MdLock className={className} {...props} />,
      
    Google: ({ className = "w-5 h-5", ...props }: IconProps) => 
      <FaGoogle className={className} {...props} />,
      
    Facebook: ({ className = "w-5 h-5", ...props }: IconProps) => 
      <FaFacebookF className={className} {...props} />,
      
    Document: ({ className = "w-5 h-5", ...props }: IconProps) => 
      <HiOutlineDocumentText className={className} {...props} />
  }
  