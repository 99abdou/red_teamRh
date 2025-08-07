import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

const DemandeConge = () => {
  const [formData, setFormData] = useState({
    type: '',
    debut: '',
    fin: '',
    motif: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
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
    
    if (!formData.type) {
      newErrors.type = 'Le type de congé est requis'
    }
    if (!formData.debut) {
      newErrors.debut = 'La date de début est requise'
    }
    if (!formData.fin) {
      newErrors.fin = 'La date de fin est requise'
    }
    if (formData.debut && formData.fin && new Date(formData.debut) > new Date(formData.fin)) {
      newErrors.fin = 'La date de fin doit être après la date de début'
    }
    if (!formData.motif.trim()) {
      newErrors.motif = 'Le motif est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Données soumises:', formData)
      
      // Réinitialiser le formulaire après succès
      setFormData({
        type: '',
        debut: '',
        fin: '',
        motif: '',
        description: ''
      })
      
      // Ici vous pouvez ajouter une notification de succès
      alert('Demande soumise avec succès!')
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      // Ici vous pouvez ajouter une notification d'erreur
      alert('Erreur lors de la soumission de la demande')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Demande de congé</h1>
        <p className="text-gray-600">Remplissez le formulaire ci-dessous pour soumettre votre demande de congé</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-200">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Type de congé */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de congé *
            </label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Sélectionner un type de congé" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annuel">Congé annuel</SelectItem>
                <SelectItem value="maladie">Congé maladie</SelectItem>
                <SelectItem value="maternite">Congé maternité</SelectItem>
                <SelectItem value="paternite">Congé paternité</SelectItem>
                <SelectItem value="formation">Congé formation</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
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
              placeholder="Raison de votre demande de congé"
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
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
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
                'Soumettre la demande'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DemandeConge
