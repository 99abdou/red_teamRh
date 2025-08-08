import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import logo from '../../assets/redTeam.png'

import BackgroundShapes from '../../components/background-shapes'
import { Icon } from '../../components/icons'
import InputWithIcon from '../../components/input-with-icon'
import { Link } from 'react-router'


export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Login Form */}


        {/* Right Side - Welcome Section */}
        <div className="flex-1 bg-gradient-to-br from-red-800 to-red-400 flex items-center justify-center p-8 relative">
          <div className="text-center space-y-8 max-w-md">
            <div>
              <h2 className="text-sm font-semibold text-white tracking-wider mb-4">
                BIENVENUE!
              </h2>
              <p className="text-2xl font-bold text-white leading-relaxed">
                {"Vous êtes juste à un pas de la qualité de l'expérience."}
              </p>
            </div>

            {/* Document Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <img src={logo} alt="logo" className="w-32 h-32" />

              </div>
            </div>
          </div>
        </div>


        <div className="flex-1 flex items-center justify-center p-8">
            <div className="shadow-lg bg-white rounded-lg p-4">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <div className=" rounded-xl p-3 flex items-center space-x-2">
                <img src={logo} alt="logo" className="w-32 h-32" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-normal text-gray-900">Connectez-vous à votre compte</h1>
            </div>





            {/* Login Form */}
            <BackgroundShapes />
            <form className="space-y-6">
              <div>
                <InputWithIcon
                  icon={<Icon.Email />}
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                />
              </div>

              <div>
                <InputWithIcon
                  icon={<Icon.Lock />}
                  label="Mot de passe"
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Se souvenir de moi
                  </label>
                </div>
                <a href="#" className="text-sm text-rose-500 hover:text-rose-600">
                  Mot de passe oublié?
                </a>
              </div>

              <Link to="employe/dashboard">
              <Button className="w-full h-12  bg-red-700 hover:bg-[#abaaa9] text-white">
                Se connecter
              </Button>
              </Link>
            </form>

            {/* Sign up link */}
            <div className="text-center">
              <span className="text-gray-600">{"Vous n'avez pas de compte? "}</span>
              <a href="#" className="text-rose-500 hover:text-rose-600 font-medium">
                Envoi un message de demande de compte
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
