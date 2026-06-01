import type {
  Campaign,
  Product,
  Pharmacy,
  ActivityItem,
} from './types'

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Ibuprofeno 400mg',
    laboratory: 'Bayer',
    category: 'analgesicos',
    sku: 'IBU-400-30',
    image: '/placeholder.svg?height=200&width=200',
    price: 2500,
    description: 'Antiinflamatorio no esteroideo para el alivio del dolor y la fiebre.',
    stock: 1500,
  },
  {
    id: 'prod-2',
    name: 'Amoxicilina 500mg',
    laboratory: 'Roemmers',
    category: 'antibioticos',
    sku: 'AMX-500-21',
    image: '/placeholder.svg?height=200&width=200',
    price: 4800,
    description: 'Antibiótico de amplio espectro para infecciones bacterianas.',
    stock: 800,
  },
  {
    id: 'prod-3',
    name: 'Vitamina D3 1000UI',
    laboratory: 'Bagó',
    category: 'vitaminas',
    sku: 'VTD-1000-60',
    image: '/placeholder.svg?height=200&width=200',
    price: 3200,
    description: 'Suplemento de vitamina D para huesos y sistema inmune.',
    stock: 2000,
  },
  {
    id: 'prod-4',
    name: 'Crema Hidratante Facial',
    laboratory: 'La Roche-Posay',
    category: 'dermocosmetica',
    sku: 'CRM-HID-50',
    image: '/placeholder.svg?height=200&width=200',
    price: 8500,
    description: 'Crema hidratante para pieles sensibles con ácido hialurónico.',
    stock: 500,
  },
  {
    id: 'prod-5',
    name: 'Paracetamol 500mg',
    laboratory: 'Genomma Lab',
    category: 'otc',
    sku: 'PAR-500-20',
    image: '/placeholder.svg?height=200&width=200',
    price: 1800,
    description: 'Analgésico y antipirético de venta libre.',
    stock: 3000,
  },
  {
    id: 'prod-6',
    name: 'Omeprazol 20mg',
    laboratory: 'Elea',
    category: 'receta',
    sku: 'OMP-20-28',
    image: '/placeholder.svg?height=200&width=200',
    price: 5500,
    description: 'Inhibidor de la bomba de protones para tratamiento de úlceras.',
    stock: 1200,
  },
  {
    id: 'prod-7',
    name: 'Loratadina 10mg',
    laboratory: 'Raffo',
    category: 'otc',
    sku: 'LOR-10-30',
    image: '/placeholder.svg?height=200&width=200',
    price: 2100,
    description: 'Antihistamínico para el alivio de alergias.',
    stock: 1800,
  },
  {
    id: 'prod-8',
    name: 'Complejo B Forte',
    laboratory: 'Bagó',
    category: 'vitaminas',
    sku: 'CMB-F-30',
    image: '/placeholder.svg?height=200&width=200',
    price: 4200,
    description: 'Complejo vitamínico B para el sistema nervioso.',
    stock: 900,
  },
  {
    id: 'prod-9',
    name: 'Protector Solar FPS 50',
    laboratory: 'Avène',
    category: 'dermocosmetica',
    sku: 'PSO-50-100',
    image: '/placeholder.svg?height=200&width=200',
    price: 12000,
    description: 'Protección solar muy alta para pieles sensibles.',
    stock: 400,
  },
  {
    id: 'prod-10',
    name: 'Azitromicina 500mg',
    laboratory: 'Pfizer',
    category: 'antibioticos',
    sku: 'AZI-500-3',
    image: '/placeholder.svg?height=200&width=200',
    price: 6800,
    description: 'Antibiótico macrólido de amplio espectro.',
    stock: 600,
  },
  {
    id: 'prod-11',
    name: 'Diclofenac 75mg',
    laboratory: 'Novartis',
    category: 'analgesicos',
    sku: 'DIC-75-20',
    image: '/placeholder.svg?height=200&width=200',
    price: 3100,
    description: 'Antiinflamatorio para dolor muscular y articular.',
    stock: 1100,
  },
  {
    id: 'prod-12',
    name: 'Atorvastatina 20mg',
    laboratory: 'Gador',
    category: 'receta',
    sku: 'ATV-20-30',
    image: '/placeholder.svg?height=200&width=200',
    price: 7200,
    description: 'Estatina para el control del colesterol.',
    stock: 850,
  },
]

// Mock Pharmacies
export const mockPharmacies: Pharmacy[] = [
  {
    id: 'pha-1',
    name: 'Farmacia del Centro',
    address: 'Av. Corrientes 1234',
    city: 'Buenos Aires',
    province: 'CABA',
    category: 'A',
    contactName: 'María González',
    contactPhone: '+54 11 4567-8900',
    contactEmail: 'contacto@farmaciadelcentro.com',
    status: 'activa',
    monthlyVolume: 850000,
    joinedDate: '2022-03-15',
  },
  {
    id: 'pha-2',
    name: 'Farmacia San Martín',
    address: 'San Martín 567',
    city: 'Córdoba',
    province: 'Córdoba',
    category: 'A',
    contactName: 'Carlos Rodríguez',
    contactPhone: '+54 351 456-7890',
    contactEmail: 'info@farmaciasanmartin.com.ar',
    status: 'activa',
    monthlyVolume: 720000,
    joinedDate: '2021-08-20',
  },
  {
    id: 'pha-3',
    name: 'Farmacia Nueva Era',
    address: 'Belgrano 890',
    city: 'Rosario',
    province: 'Santa Fe',
    category: 'B',
    contactName: 'Ana Martínez',
    contactPhone: '+54 341 234-5678',
    contactEmail: 'ventas@nuevaera.com',
    status: 'activa',
    monthlyVolume: 450000,
    joinedDate: '2023-01-10',
  },
  {
    id: 'pha-4',
    name: 'Farmacia del Pueblo',
    address: 'Mitre 234',
    city: 'Mendoza',
    province: 'Mendoza',
    category: 'B',
    contactName: 'Roberto Silva',
    contactPhone: '+54 261 345-6789',
    contactEmail: 'roberto@farmadelpueblo.com',
    status: 'activa',
    monthlyVolume: 380000,
    joinedDate: '2022-06-05',
  },
  {
    id: 'pha-5',
    name: 'Farmacia Central',
    address: 'España 456',
    city: 'San Miguel de Tucumán',
    province: 'Tucumán',
    category: 'B',
    contactName: 'Laura Fernández',
    contactPhone: '+54 381 456-7890',
    contactEmail: 'central@farmaceuticatuc.com',
    status: 'activa',
    monthlyVolume: 320000,
    joinedDate: '2023-04-18',
  },
  {
    id: 'pha-6',
    name: 'Farmacia Norte',
    address: 'Rivadavia 789',
    city: 'Salta',
    province: 'Salta',
    category: 'C',
    contactName: 'Pedro López',
    contactPhone: '+54 387 567-8901',
    contactEmail: 'norte@farmasalta.com',
    status: 'activa',
    monthlyVolume: 180000,
    joinedDate: '2023-07-22',
  },
  {
    id: 'pha-7',
    name: 'Farmacia del Sol',
    address: 'Independencia 321',
    city: 'Mar del Plata',
    province: 'Buenos Aires',
    category: 'A',
    contactName: 'Gabriela Torres',
    contactPhone: '+54 223 678-9012',
    contactEmail: 'sol@farmadelsol.com.ar',
    status: 'activa',
    monthlyVolume: 680000,
    joinedDate: '2021-11-30',
  },
  {
    id: 'pha-8',
    name: 'Farmacia Moderna',
    address: 'San Juan 654',
    city: 'La Plata',
    province: 'Buenos Aires',
    category: 'B',
    contactName: 'Diego Ramírez',
    contactPhone: '+54 221 789-0123',
    contactEmail: 'moderna@farmalp.com',
    status: 'activa',
    monthlyVolume: 420000,
    joinedDate: '2022-09-14',
  },
  {
    id: 'pha-9',
    name: 'Farmacia Esperanza',
    address: 'Moreno 987',
    city: 'Neuquén',
    province: 'Neuquén',
    category: 'C',
    contactName: 'Silvia Acosta',
    contactPhone: '+54 299 890-1234',
    contactEmail: 'esperanza@farmanqn.com',
    status: 'inactiva',
    monthlyVolume: 150000,
    joinedDate: '2023-02-28',
  },
  {
    id: 'pha-10',
    name: 'Farmacia Plaza',
    address: 'Urquiza 543',
    city: 'Paraná',
    province: 'Entre Ríos',
    category: 'C',
    contactName: 'Martín Gómez',
    contactPhone: '+54 343 901-2345',
    contactEmail: 'plaza@farmaparana.com',
    status: 'activa',
    monthlyVolume: 210000,
    joinedDate: '2023-05-09',
  },
  {
    id: 'pha-11',
    name: 'Farmacia Familiar',
    address: 'Sarmiento 876',
    city: 'San Juan',
    province: 'San Juan',
    category: 'C',
    contactName: 'Valeria Muñoz',
    contactPhone: '+54 264 012-3456',
    contactEmail: 'familiar@farmasanjuan.com',
    status: 'activa',
    monthlyVolume: 175000,
    joinedDate: '2023-08-15',
  },
  {
    id: 'pha-12',
    name: 'Farmacia Bienestar',
    address: 'Lavalle 210',
    city: 'Resistencia',
    province: 'Chaco',
    category: 'B',
    contactName: 'Fernando Castro',
    contactPhone: '+54 362 123-4567',
    contactEmail: 'bienestar@farmachaco.com',
    status: 'activa',
    monthlyVolume: 290000,
    joinedDate: '2022-12-01',
  },
]

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Campaña Invierno Saludable',
    description: 'Promoción de vitaminas y suplementos para reforzar el sistema inmune durante el invierno.',
    type: 'promocion',
    status: 'activa',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    products: ['prod-3', 'prod-8'],
    pharmacySegment: {
      provinces: ['CABA', 'Buenos Aires', 'Córdoba', 'Santa Fe'],
      categories: ['A', 'B'],
    },
    reach: 8,
    participation: 75,
    createdAt: '2026-05-15',
    updatedAt: '2026-05-28',
  },
  {
    id: 'camp-2',
    name: 'Lanzamiento Nuevo Protector Solar',
    description: 'Introducción del nuevo protector solar FPS 50 de Avène en la red de farmacias.',
    type: 'lanzamiento',
    status: 'activa',
    startDate: '2026-05-15',
    endDate: '2026-07-15',
    products: ['prod-9'],
    pharmacySegment: {
      provinces: [],
      categories: ['A', 'B', 'C'],
    },
    reach: 11,
    participation: 82,
    createdAt: '2026-05-01',
    updatedAt: '2026-05-20',
  },
  {
    id: 'camp-3',
    name: 'Descuento Analgésicos 20%',
    description: 'Descuento especial del 20% en toda la línea de analgésicos durante el mes.',
    type: 'descuento',
    status: 'finalizada',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    products: ['prod-1', 'prod-11'],
    pharmacySegment: {
      provinces: ['CABA', 'Buenos Aires'],
      categories: ['A'],
    },
    reach: 3,
    participation: 100,
    createdAt: '2026-03-20',
    updatedAt: '2026-05-01',
  },
  {
    id: 'camp-4',
    name: 'Programa Fidelización Premium',
    description: 'Programa de puntos y beneficios exclusivos para farmacias categoría A.',
    type: 'fidelizacion',
    status: 'activa',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    products: [],
    pharmacySegment: {
      provinces: [],
      categories: ['A'],
    },
    reach: 3,
    participation: 100,
    createdAt: '2025-12-15',
    updatedAt: '2026-05-10',
  },
  {
    id: 'camp-5',
    name: 'Promoción Dermocosmética Verano',
    description: 'Campaña de productos de cuidado de la piel para la temporada de verano.',
    type: 'promocion',
    status: 'borrador',
    startDate: '2026-11-01',
    endDate: '2027-02-28',
    products: ['prod-4', 'prod-9'],
    pharmacySegment: {
      provinces: ['CABA', 'Buenos Aires', 'Córdoba', 'Mendoza'],
      categories: ['A', 'B'],
    },
    reach: 0,
    participation: 0,
    createdAt: '2026-05-25',
    updatedAt: '2026-05-25',
  },
  {
    id: 'camp-6',
    name: 'Antibióticos - Actualización de Stock',
    description: 'Comunicación sobre nuevos lotes de antibióticos disponibles.',
    type: 'lanzamiento',
    status: 'finalizada',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    products: ['prod-2', 'prod-10'],
    pharmacySegment: {
      provinces: [],
      categories: ['A', 'B', 'C'],
    },
    reach: 11,
    participation: 91,
    createdAt: '2026-02-20',
    updatedAt: '2026-04-02',
  },
]

// Mock Activity Feed
export const mockActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'campaign_created',
    description: 'Se creó la campaña "Promoción Dermocosmética Verano"',
    timestamp: '2026-05-25T14:30:00',
    relatedId: 'camp-5',
  },
  {
    id: 'act-2',
    type: 'campaign_started',
    description: 'Comenzó la campaña "Lanzamiento Nuevo Protector Solar"',
    timestamp: '2026-05-15T08:00:00',
    relatedId: 'camp-2',
  },
  {
    id: 'act-3',
    type: 'pharmacy_joined',
    description: 'Farmacia Familiar se unió a la red',
    timestamp: '2026-05-10T11:15:00',
    relatedId: 'pha-11',
  },
  {
    id: 'act-4',
    type: 'campaign_ended',
    description: 'Finalizó la campaña "Descuento Analgésicos 20%"',
    timestamp: '2026-04-30T23:59:00',
    relatedId: 'camp-3',
  },
  {
    id: 'act-5',
    type: 'product_added',
    description: 'Se agregó Atorvastatina 20mg al catálogo',
    timestamp: '2026-04-25T16:45:00',
    relatedId: 'prod-12',
  },
  {
    id: 'act-6',
    type: 'campaign_started',
    description: 'Comenzó la campaña "Campaña Invierno Saludable"',
    timestamp: '2026-06-01T00:00:00',
    relatedId: 'camp-1',
  },
]

// Helper functions
export function getCampaignById(id: string): Campaign | undefined {
  return mockCampaigns.find((c) => c.id === id)
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id)
}

export function getPharmacyById(id: string): Pharmacy | undefined {
  return mockPharmacies.find((p) => p.id === id)
}

export function getProductsByIds(ids: string[]): Product[] {
  return mockProducts.filter((p) => ids.includes(p.id))
}

export function getActiveCampaigns(): Campaign[] {
  return mockCampaigns.filter((c) => c.status === 'activa')
}

export function getUpcomingCampaigns(limit: number = 5): Campaign[] {
  const today = new Date()
  return mockCampaigns
    .filter((c) => c.status === 'activa' && new Date(c.endDate) > today)
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, limit)
}

export function getCampaignsByDateRange(start: Date, end: Date): Campaign[] {
  return mockCampaigns.filter((c) => {
    const campaignStart = new Date(c.startDate)
    const campaignEnd = new Date(c.endDate)
    return (
      (campaignStart >= start && campaignStart <= end) ||
      (campaignEnd >= start && campaignEnd <= end) ||
      (campaignStart <= start && campaignEnd >= end)
    )
  })
}

export function getUniqueProvinces(): string[] {
  return [...new Set(mockPharmacies.map((p) => p.province))].sort()
}

export function getUniqueLaboratories(): string[] {
  return [...new Set(mockProducts.map((p) => p.laboratory))].sort()
}

// Format helpers
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
