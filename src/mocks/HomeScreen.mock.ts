import { images } from "@/src/constants/images";


// Mock Data - Continue de onde parou
export const CONTINUE_WATCHING = [
  {
    id: "1",
    title: "Inteligência Artificial para Negócios",
    author: "Dr. Ana Paula Santos",
    progress: 65,
    duration: "45 min",
    image: images.business,
    type: "Vídeo",
    category: "Negócios",
    content:
      "Aprenda como a Inteligência Artificial está transformando o mundo dos negócios.",
    videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
  },
  {
    id: "2",
    title: "Blockchain e Web3",
    author: "Prof. Ricardo Lima",
    progress: 40,
    duration: "1h 15min",
    image: images.blockchain,
    type: "Artigo",
    category: "Tecnologia",
    content: "Explore os fundamentos da tecnologia blockchain.",
    articleUrl: "https://www.cnnbrasil.com.br/tecnologia/",
  },
];

// Mock Data - Conteúdo Destacado (categorias)
export const FEATURED_CATEGORIES = [
  { id: "1", name: "Todos", active: true },
  { id: "2", name: "Tecnologia", active: false },
  { id: "3", name: "Negócios", active: false },
  { id: "4", name: "Design", active: false },
];

export const FEATURED_CONTENT = [
  {
    id: "1",
    title: "IA Generativa: Fundamentos",
    category: "Tecnologia",
    duration: '45 min',
    author: 'Dr. Roberto Almeida',
    image: images.ai,
  },
  {
    id: "2",
    title: "Liderança Moderna",
    category: "Negócios",
    duration: '45 min',
    author: 'Profa. Amanda Souza',
    image: images.business,
  },
  {
    id: "3",
    title: "Fundamentos de Design Gráfico",
    category: "Tecnologia",
    duration: '45 min',
    author: 'Prof. Lucas Martins',
    image: images.uxDesign,
  },
  {
    id: "4",
    title: "Arquitetura de Software",
    category: "Tecnologia",
    duration: '45 min',
    author: 'Dr. Paulo Henrique',
    image: images.programming,
  },
];