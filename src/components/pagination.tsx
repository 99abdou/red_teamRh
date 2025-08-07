import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { Button } from "./ui/button"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems = 0, 
  itemsPerPage = 10 
}: PaginationProps) {
  
  // Calculer les pages à afficher
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    // Si pas de pages ou pages invalides, retourner page 1
    if (totalPages <= 0 || isNaN(totalPages)) {
      return [1];
    }
    
    if (totalPages <= maxVisible) {
      // Si moins de 5 pages, afficher toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sinon, afficher une sélection intelligente
      if (currentPage <= 3) {
        // Début: 1, 2, 3, 4, ..., totalPages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        if (totalPages > 4) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Fin: 1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu: 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  
  // Calculer les informations d'affichage
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems > 0 ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  return (
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      {/* Informations sur les éléments affichés */}
      <div className="text-sm text-gray-600">
        {totalItems > 0 ? (
          `Affichage de ${startItem} à ${endItem} sur ${totalItems} éléments`
        ) : (
          "Aucun élément à afficher"
        )}
      </div>
      
      {/* Navigation des pages */}
      <div className="flex items-center space-x-2">
        {/* Bouton précédent */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages <= 0}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdKeyboardArrowLeft className="w-4 h-4" />
        </Button>

        {/* Numéros de pages */}
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Button 
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className={currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
              >
                {page}
              </Button>
            )}
          </div>
        ))}

        {/* Bouton suivant */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages <= 0}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdKeyboardArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
