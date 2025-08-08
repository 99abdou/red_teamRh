import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Request {
  id: string;
  type: 'conge' | 'absence' | 'formation' | 'autre';
  subtype: string;
  startDate: string;
  endDate: string;
  reason: string;
  description?: string;
  status: 'pending' | 'approved' | 'declined' | 'cancelled';
  submittedAt: string;
  employeeName: string;
  employeeEmail: string;
}

interface RequestContextType {
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'submittedAt' | 'status'>) => void;
  updateRequestStatus: (id: string, status: Request['status']) => void;
  deleteRequest: (id: string) => void;
  getRequestsByStatus: (status: Request['status']) => Request[];
  getRequestsByType: (type: Request['type']) => Request[];
  getPendingRequests: () => Request[];
  getTotalRequests: () => number;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};

interface RequestProviderProps {
  children: ReactNode;
}

export const RequestProvider: React.FC<RequestProviderProps> = ({ children }) => {
  const [requests, setRequests] = useState<Request[]>([
    // Données d'exemple
    {
      id: '1',
      type: 'conge',
      subtype: 'Congé annuel',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      reason: 'Vacances familiales',
      description: 'Vacances en famille',
      status: 'approved',
      submittedAt: '2024-01-10T10:00:00Z',
      employeeName: 'Moussa Diatta',
      employeeEmail: 'moussa.diatta@example.com'
    },
    {
      id: '2',
      type: 'absence',
      subtype: 'Absence médicale',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      reason: 'Rendez-vous médical',
      status: 'pending',
      submittedAt: '2024-01-20T14:30:00Z',
      employeeName: 'Moussa Diatta',
      employeeEmail: 'moussa.diatta@example.com'
    },
    {
      id: '3',
      type: 'formation',
      subtype: 'Formation externe',
      startDate: '2024-02-01',
      endDate: '2024-02-03',
      reason: 'Formation React avancé',
      description: 'Formation pour améliorer les compétences en développement',
      status: 'pending',
      submittedAt: '2024-01-22T09:15:00Z',
      employeeName: 'Moussa Diatta',
      employeeEmail: 'moussa.diatta@example.com'
    }
  ]);

  const addRequest = (requestData: Omit<Request, 'id' | 'submittedAt' | 'status'>) => {
    const newRequest: Request = {
      ...requestData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const updateRequestStatus = (id: string, status: Request['status']) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(request => request.id !== id));
  };

  const getRequestsByStatus = (status: Request['status']) => {
    return requests.filter(request => request.status === status);
  };

  const getRequestsByType = (type: Request['type']) => {
    return requests.filter(request => request.type === type);
  };

  const getPendingRequests = () => {
    return requests.filter(request => request.status === 'pending');
  };

  const getTotalRequests = () => {
    return requests.length;
  };

  const value: RequestContextType = {
    requests,
    addRequest,
    updateRequestStatus,
    deleteRequest,
    getRequestsByStatus,
    getRequestsByType,
    getPendingRequests,
    getTotalRequests
  };

  return (
    <RequestContext.Provider value={value}>
      {children}
    </RequestContext.Provider>
  );
}; 