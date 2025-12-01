import { COLLECTIONS, db } from '@/src/services/firebase';
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from './useAuth';

export interface RecommendedContent {
  title: string;
  url: string;
  author: string;
  publishedAt: string;
  readTime: string;
  type: string;
  temperature: number;
  category: string;
  summary: string;
}

export interface RecommendedContentDocument {
  userId: string;
  contents: RecommendedContent[];
}

/**
 * Mapeamento de categorias subordinadas para categorias principais
 */
const CATEGORY_MAPPING: Record<string, string> = {
  // Tecnologia
  'desenvolvimento': 'Tecnologia',
  'development': 'Tecnologia',
  'dev': 'Tecnologia',
  'programação': 'Tecnologia',
  'programacao': 'Tecnologia',
  'programming': 'Tecnologia',
  'cybersegurança': 'Tecnologia',
  'cyberseguranca': 'Tecnologia',
  'cybersecurity': 'Tecnologia',
  'segurança da informação': 'Tecnologia',
  'seguranca da informacao': 'Tecnologia',
  'ciência de dados': 'Tecnologia',
  'ciencia de dados': 'Tecnologia',
  'data science': 'Tecnologia',
  'data science e business intelligence': 'Tecnologia',
  'dados': 'Tecnologia',
  'data': 'Tecnologia',
  'tecnologia': 'Tecnologia',
  'technology': 'Tecnologia',
  'tech': 'Tecnologia',
  'computação': 'Tecnologia',
  'computacao': 'Tecnologia',
  'computing': 'Tecnologia',
  'software': 'Tecnologia',
  'inteligência artificial': 'Tecnologia',
  'inteligencia artificial': 'Tecnologia',
  'ia': 'Tecnologia',
  'ai': 'Tecnologia',
  'machine learning': 'Tecnologia',
  'ml': 'Tecnologia',
  
  // Educação
  'educação': 'Educação',
  'educacao': 'Educação',
  'education': 'Educação',
  'ensino': 'Educação',
  'aprendizado': 'Educação',
  'aprendizagem': 'Educação',
  'learning': 'Educação',
  
  // Negócios
  'negócios': 'Negócios',
  'negocios': 'Negócios',
  'business': 'Negócios',
  'gestão': 'Negócios',
  'gestao': 'Negócios',
  'management': 'Negócios',
  'empreendedorismo': 'Negócios',
  'estratégia': 'Negócios',
  'estrategia': 'Negócios',
  'strategy': 'Negócios',
  
  // Design
  'design': 'Design',
  'ux': 'Design',
  'ui': 'Design',
  'design gráfico': 'Design',
  'design grafico': 'Design',
  'graphic design': 'Design',
  'user experience': 'Design',
  'user interface': 'Design',
  
  // Marketing
  'marketing': 'Marketing',
  'marketing digital': 'Marketing',
  'digital marketing': 'Marketing',
  'publicidade': 'Marketing',
  'advertising': 'Marketing',
  'growth hacking': 'Marketing',
  
  // Saúde
  'saúde': 'Saúde',
  'saude': 'Saúde',
  'health': 'Saúde',
  'medicina': 'Saúde',
  'medicine': 'Saúde',
  'bem-estar': 'Saúde',
  'bem estar': 'Saúde',
  'wellness': 'Saúde',
  
  // Ciência
  'ciência': 'Ciência',
  'ciencia': 'Ciência',
  'science': 'Ciência',
  'pesquisa': 'Ciência',
  'research': 'Ciência',
  'biologia': 'Ciência',
  'biology': 'Ciência',
  'química': 'Ciência',
  'quimica': 'Ciência',
  'chemistry': 'Ciência',
  'física': 'Ciência',
  'fisica': 'Ciência',
  'physics': 'Ciência',
};

/**
 * Normaliza o nome da categoria para uma categoria principal
 */
function normalizeCategory(category: string): string {
  if (!category) return 'Outros';
  
  const normalized = category.toLowerCase().trim();
  
  // Verificar mapeamento direto
  if (CATEGORY_MAPPING[normalized]) {
    return CATEGORY_MAPPING[normalized];
  }
  
  // Verificar se a categoria contém alguma palavra-chave
  for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  // Se não encontrou mapeamento, capitalizar primeira letra
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
}

/**
 * Mapeia os dados brutos do Firestore para o formato RecommendedContent
 */
function mapToRecommendedContent(item: any): RecommendedContent | null {
  // Validar campos obrigatórios
  if (!item || typeof item !== 'object') {
    return null;
  }

  if (!item.title || !item.url) {
    return null;
  }

  // Mapear para o formato esperado
  const rawCategory = String(item.category || 'Outros');
  const normalizedCategory = normalizeCategory(rawCategory);
  
  return {
    title: String(item.title || ''),
    url: String(item.url || ''),
    author: String(item.author || 'Autor desconhecido'),
    publishedAt: String(item.publishedAt || item.published_at || ''),
    readTime: String(item.readTime || item.read_time || item.duration || ''),
    type: String(item.type || 'article'),
    temperature: typeof item.temperature === 'number' ? item.temperature : 0.5,
    category: normalizedCategory,
    summary: String(item.summary || item.description || ''),
  };
}

export function useRecommendedContent() {
  const { user } = useAuth();
  const [contents, setContents] = useState<RecommendedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const userId = user?.uid;
    
    if (!userId) {
      setContents([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchRecommendedContent() {
      if (!userId || !isMounted) {
        return;
      }
      
      try {
        setLoading(true);
        setError(null);

        console.log('[useRecommendedContent] Fetching recommended content for user:', userId);

        // Buscar documentos filtrados por userId no servidor
        const q = query(
          collection(db, COLLECTIONS.RECOMMENDED_CONTENT),
          where('userId', '==', userId)
        );

        const querySnapshot = await getDocs(q);
        
        if (!isMounted) return;
        
        console.log('[useRecommendedContent] Documents found:', querySnapshot.size);
        
        const allContents: RecommendedContent[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('[useRecommendedContent] Document ID:', doc.id);
          console.log('[useRecommendedContent] Document keys:', Object.keys(data));
          
          // Função helper para verificar se uma chave é numérica (índice de array)
          const isNumericKey = (key: string): boolean => {
            return /^\d+$/.test(key);
          };
          
          // Função helper para converter objeto com chaves numéricas em array
          const convertNumericKeysToArray = (obj: any): any[] => {
            const keys = Object.keys(obj).filter(k => isNumericKey(k));
            if (keys.length === 0) return [];
            
            // Ordenar chaves numéricas
            keys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
            
            return keys.map(k => obj[k]);
          };
          
          // Estratégia 1: Array na chave 'contents'
          if (data.contents && Array.isArray(data.contents)) {
            console.log('[useRecommendedContent] Found contents array with', data.contents.length, 'items');
            const mappedContents = data.contents
              .map((item: any) => mapToRecommendedContent(item))
              .filter((item: RecommendedContent | null): item is RecommendedContent => item !== null);
            
            console.log('[useRecommendedContent] Mapped', mappedContents.length, 'valid contents from contents array');
            allContents.push(...mappedContents);
          } 
          // Estratégia 2: Verificar se há chaves numéricas (Firestore array como objeto)
          else {
            const numericKeys = Object.keys(data).filter(k => k !== 'userId' && isNumericKey(k));
            
            if (numericKeys.length > 0) {
              console.log('[useRecommendedContent] Found numeric keys (array-like object):', numericKeys);
              const arrayData = convertNumericKeysToArray(data);
              console.log('[useRecommendedContent] Converted to array with', arrayData.length, 'items');
              
              const mappedItems = arrayData
                .map((item: any) => mapToRecommendedContent(item))
                .filter((item: RecommendedContent | null): item is RecommendedContent => item !== null);
              
              console.log('[useRecommendedContent] Mapped', mappedItems.length, 'valid contents from numeric keys');
              allContents.push(...mappedItems);
            }
            // Estratégia 3: Conteúdo único no documento
            else if (data.title && data.url) {
              console.log('[useRecommendedContent] Found single content item');
              const mappedContent = mapToRecommendedContent(data);
              if (mappedContent) {
                allContents.push(mappedContent);
              }
            }
            // Estratégia 4: Buscar arrays em outras chaves (não userId, não numéricas)
            else {
              console.log('[useRecommendedContent] Searching for content arrays in document keys...');
              let foundAny = false;
              
              Object.keys(data).forEach((key) => {
                if (key === 'userId' || isNumericKey(key)) return;
                
                const value = data[key];
                
                // Verificar se é um array
                if (Array.isArray(value)) {
                  console.log('[useRecommendedContent] Found array in key:', key, 'with', value.length, 'items');
                  
                  if (value.length > 0 && value[0] && typeof value[0] === 'object' && (value[0].title || value[0].url)) {
                    const mappedItems = value
                      .map((item: any) => mapToRecommendedContent(item))
                      .filter((item: RecommendedContent | null): item is RecommendedContent => item !== null);
                    
                    console.log('[useRecommendedContent] Mapped', mappedItems.length, 'valid contents from key:', key);
                    allContents.push(...mappedItems);
                    foundAny = true;
                  }
                }
                // Verificar se é um objeto que parece ser um conteúdo individual
                else if (value && typeof value === 'object' && (value.title || value.url)) {
                  console.log('[useRecommendedContent] Found content-like object in key:', key);
                  const mappedContent = mapToRecommendedContent(value);
                  if (mappedContent) {
                    allContents.push(mappedContent);
                    foundAny = true;
                  }
                }
              });
              
              if (!foundAny) {
                console.warn('[useRecommendedContent] No content found in document. Available keys:', Object.keys(data));
                console.warn('[useRecommendedContent] Document data:', JSON.stringify(data, null, 2).substring(0, 1000));
              }
            }
          }
        });

        console.log('[useRecommendedContent] Total contents collected:', allContents.length);

        if (isMounted) {
          setContents(allContents);
        }
      } catch (err: any) {
        if (!isMounted) return;
        
        console.error('[useRecommendedContent] Error fetching recommended content:', err);
        console.error('[useRecommendedContent] Error code:', err.code);
        console.error('[useRecommendedContent] Error message:', err.message);
        
        setError(err as Error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRecommendedContent();

    return () => {
      isMounted = false;
    };
  }, [user?.uid]);

  const refresh = useCallback(async () => {
    const userId = user?.uid;
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.RECOMMENDED_CONTENT),
        where('userId', '==', userId)
      );

      const querySnapshot = await getDocs(q);
      const allContents: RecommendedContent[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Função helper para verificar se uma chave é numérica (índice de array)
        const isNumericKey = (key: string): boolean => {
          return /^\d+$/.test(key);
        };
        
        // Função helper para converter objeto com chaves numéricas em array
        const convertNumericKeysToArray = (obj: any): any[] => {
          const keys = Object.keys(obj).filter(k => isNumericKey(k));
          if (keys.length === 0) return [];
          
          // Ordenar chaves numéricas
          keys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
          
          return keys.map(k => obj[k]);
        };
        
        if (data.contents && Array.isArray(data.contents)) {
          const mappedContents = data.contents
            .map((item: any) => mapToRecommendedContent(item))
            .filter((item: RecommendedContent | null): item is RecommendedContent => item !== null);
          
          allContents.push(...mappedContents);
        } 
        else {
          const numericKeys = Object.keys(data).filter(k => k !== 'userId' && isNumericKey(k));
          
          if (numericKeys.length > 0) {
            const arrayData = convertNumericKeysToArray(data);
            const mappedItems = arrayData
              .map((item: any) => mapToRecommendedContent(item))
              .filter((item: RecommendedContent | null): item is RecommendedContent => item !== null);
            
            allContents.push(...mappedItems);
          }
          else if (data.title && data.url) {
            const mappedContent = mapToRecommendedContent(data);
            if (mappedContent) {
              allContents.push(mappedContent);
            }
          }
          else {
            Object.keys(data).forEach((key) => {
              if (key === 'userId' || isNumericKey(key)) return;
              
              const value = data[key];
              
              if (Array.isArray(value)) {
                if (value.length > 0 && value[0] && typeof value[0] === 'object' && (value[0].title || value[0].url)) {
                  const mappedItems = value
                    .map((item: any) => mapToRecommendedContent(item))
                    .filter((item: RecommendedContent | null): item is RecommendedContent => item !== null);
                  
                  allContents.push(...mappedItems);
                }
              }
              else if (value && typeof value === 'object' && (value.title || value.url)) {
                const mappedContent = mapToRecommendedContent(value);
                if (mappedContent) {
                  allContents.push(mappedContent);
                }
              }
            });
          }
        }
      });

      setContents(allContents);
    } catch (err: any) {
      console.error('[useRecommendedContent] Error fetching recommended content:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  // Agrupar conteúdos por categoria (memorizado para evitar recálculos)
  // As categorias já foram normalizadas no mapToRecommendedContent
  const contentsByCategory = useMemo(() => {
    return contents.reduce((acc, content) => {
      const category = content.category || 'Outros';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(content);
      return acc;
    }, {} as Record<string, RecommendedContent[]>);
  }, [contents]);

  return { contents, contentsByCategory, loading, error, refresh };
}
