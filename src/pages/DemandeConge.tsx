import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { useRequests } from '../contexts/RequestContext'
import { useNavigate } from 'react-router-dom'

type FormType = 'conge' | 'absence' | 'formation' | 'autre'

const DemandeConge = () => {
  const { addRequest } = useRequests()
  const navigate = useNavigate()
  const [activeForm, setActiveForm] = useState<FormType>('conge')
  const [formData, setFormData] = useState({
    type: '',
    debut: '',
    fin: '',
    motif: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!(formData as { type?: string }).type) {
      (newErrors as Record<string, string>).type = 'Le type est requis'
    }
    if (!(formData as { debut?: string }).debut) {
      (newErrors as Record<string, string>).debut = 'La date de début est requise'
    }
    if (!(formData as { fin?: string }).fin) {
      (newErrors as Record<string, string>).fin = 'La date de fin est requise'
    }
    if (
      (formData as { debut?: string }).debut &&
      (formData as { fin?: string }).fin &&
      new Date((formData as { debut: string }).debut) > new Date((formData as { fin: string }).fin)
    ) {
      (newErrors as Record<string, string>).fin = 'La date de fin doit être après la date de début'
    }
    if (!(formData as { motif?: string }).motif || !(formData as { motif: string }).motif.trim()) {
      (newErrors as Record<string, string>).motif = 'Le motif est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      // Ajouter la demande au contexte
      addRequest({
        type: activeForm,
        subtype: formData.type,
        startDate: formData.debut,
        endDate: formData.fin,
        reason: formData.motif,
        description: formData.description,
        employeeName: 'Moussa Diatta', // À remplacer par les vraies données utilisateur
        employeeEmail: 'moussa.diatta@example.com' // À remplacer par les vraies données utilisateur
      })
      
      // Réinitialiser le formulaire après succès
      setFormData({
        type: '',
        debut: '',
        fin: '',
        motif: '',
        description: ''
      })
      
      // Rediriger vers le dashboard
      navigate('/employe/dashboard')
      
      // Ici vous pouvez ajouter une notification de succès
      alert(`${getFormTitle()} soumise avec succès!`)
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      // Ici vous pouvez ajouter une notification d'erreur
      alert('Erreur lors de la soumission de la demande')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFormTitle = () => {
    switch (activeForm) {
      case 'conge': return 'Demande de congé'
      case 'absence': return 'Demande d\'absence'
      case 'formation': return 'Demande de formation'
      case 'autre': return 'Demande'
      default: return 'Demande'
    }
  }

  const getTypeOptions = () => {
    switch (activeForm) {
      case 'conge':
        return [
          { value: 'annuel', label: 'Congé annuel' },
          { value: 'maladie', label: 'Congé maladie' },
          { value: 'maternite', label: 'Congé maternité' },
          { value: 'paternite', label: 'Congé paternité' },
          { value: 'formation', label: 'Congé formation' },
          { value: 'autre', label: 'Autre' }
        ]
      case 'absence':
        return [
          { value: 'medicale', label: 'Absence médicale' },
          { value: 'personnelle', label: 'Absence personnelle' },
          { value: 'familiale', label: 'Absence familiale' },
          { value: 'autre', label: 'Autre' }
        ]
      case 'formation':
        return [
          { value: 'interne', label: 'Formation interne' },
          { value: 'externe', label: 'Formation externe' },
          { value: 'certification', label: 'Certification' },
          { value: 'autre', label: 'Autre' }
        ]
      case 'autre':
        return [
          { value: 'autorisation', label: 'Autorisation spéciale' },
          { value: 'deplacement', label: 'Déplacement professionnel' },
          { value: 'autre', label: 'Autre' }
        ]
      default:
        return []
    }
  }

  const tabs = [
    { id: 'conge', label: 'Demande de congé', icon: '🏖️' },
    { id: 'absence', label: 'Demande d\'absence', icon: '⏰' },
    { id: 'formation', label: 'Demande de formation', icon: '📚' },
    { id: 'autre', label: 'Autre demande', icon: '📝' }
  ]

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Demandes</h1>
        <p className="text-gray-600">Sélectionnez le type de demande et remplissez le formulaire correspondant</p>
      </div>

      {/* Onglets */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveForm(tab.id as FormType)}
                className={`
                  py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
                  ${activeForm === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{getFormTitle()}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder={`Sélectionner un type de ${activeForm === 'conge' ? 'congé' : activeForm === 'absence' ? 'd\'absence' : activeForm === 'formation' ? 'de formation' : 'demande'}`} />
              </SelectTrigger>
              <SelectContent>
                {getTypeOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début *
              </label>
              <Input
                type="date"
                value={formData.debut}
                onChange={(e) => handleInputChange('debut', e.target.value)}
                className={errors.debut ? 'border-red-500' : ''}
              />
              {errors.debut && (
                <p className="text-red-500 text-sm mt-1">{errors.debut}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin *
              </label>
              <Input
                type="date"
                value={formData.fin}
                onChange={(e) => handleInputChange('fin', e.target.value)}
                className={errors.fin ? 'border-red-500' : ''}
              />
              {errors.fin && (
                <p className="text-red-500 text-sm mt-1">{errors.fin}</p>
              )}
            </div>
          </div>

          {/* Motif */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motif *
            </label>
            <Input
              placeholder={`Raison de votre ${activeForm === 'conge' ? 'demande de congé' : activeForm === 'absence' ? 'demande d\'absence' : activeForm === 'formation' ? 'demande de formation' : 'demande'}`}
              value={formData.motif}
              onChange={(e) => handleInputChange('motif', e.target.value)}
              className={errors.motif ? 'border-red-500' : ''}
            />
            {errors.motif && (
              <p className="text-red-500 text-sm mt-1">{errors.motif}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optionnel)
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Description détaillée de votre demande..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  type: '',
                  debut: '',
                  fin: '',
                  motif: '',
                  description: ''
                })
                setErrors({})
              }}
              disabled={isSubmitting}
            >
              Réinitialiser
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                `Soumettre la ${activeForm === 'conge' ? 'demande de congé' : activeForm === 'absence' ? 'demande d\'absence' : activeForm === 'formation' ? 'demande de formation' : 'demande'}`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DemandeConge
