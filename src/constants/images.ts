export const images = {
  // AI & Technology
  ai: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI5MjIzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  aiGenerative: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  
  blockchain: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTk5NzgxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  
  reactNative: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  
  programming: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGV8ZW58MXx8fHwxNzU5OTc4MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  
  machineLearning: 'https://images.unsplash.com/photo-1581093199592-d3c46ae94f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1OTk3ODEyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  
  // Design
  uxDesign: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTk5NzgxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  
  designSystem: 'https://images.unsplash.com/photo-1644375391877-0ae77eeed8fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjcmVhdGl2aXR5fGVufDF8fHx8MTc1OTkwNzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  
  designThinking: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
  
  // Business & Marketing
  business: 'https://images.unsplash.com/photo-1637633765266-a064c026b9aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYXJuaW5nJTIwYm9va3xlbnwxfHx8fDE3NTk5NzgxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  
  marketing: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
  
  digitalMarketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  
  // Data Science
  dataScience: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  
  dataPython: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
  
  analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  
  // General Education
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  
  learning: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  
  books: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
  
  // Workspace & Creativity
  workspace: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
  
  creativity: 'https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80',
  
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  
  // News & Articles
  news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
  
  // Achievements & Success
  achievement: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  
  trophy: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
} as const;

/**
 * Mapeamento de categorias para imagens
 */
export const categoryImages = {
  tecnologia: images.ai,
  design: images.uxDesign,
  negócios: images.business,
  marketing: images.marketing,
  dados: images.dataScience,
  ciência: images.education,
} as const;

/**
 * Helper para pegar imagem aleatória de uma categoria
 */
export function getCategoryImage(category: string): string {
  const normalized = category.toLowerCase();
  
  if (normalized.includes('tecnologia') || normalized.includes('tech')) {
    return images.ai;
  }
  if (normalized.includes('design')) {
    return images.uxDesign;
  }
  if (normalized.includes('negócio') || normalized.includes('business')) {
    return images.business;
  }
  if (normalized.includes('marketing')) {
    return images.marketing;
  }
  if (normalized.includes('dados') || normalized.includes('data')) {
    return images.dataScience;
  }
  
  // Default
  return images.learning;
}

export type ImageKey = keyof typeof images;
