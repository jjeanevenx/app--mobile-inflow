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
      "Aprenda como a Inteligência Artificial está transformando o mundo dos negócios e descubra estratégias práticas para implementar IA em sua empresa.",
    videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
  },
  {
    id: "2",
    title: "Blockchain e Web3: Fundamentos",
    author: "Prof. Ricardo Lima",
    progress: 40,
    duration: "1h 15min",
    image: images.blockchain,
    type: "Artigo",
    category: "Tecnologia",
    content: "Explore os fundamentos da tecnologia blockchain, NFTs e como a Web3 está revolucionando a economia digital.",
    articleUrl: "https://medium.com/@ricardolima/blockchain-web3-fundamentos",
  },
  {
    id: "3",
    title: "UX Design Moderno: Princípios Essenciais",
    author: "Marina Costa",
    progress: 80,
    duration: "30 min",
    image: images.designSystem,
    type: "Vídeo",
    category: "Design",
    content: "Aprenda os princípios modernos de UX Design e como criar interfaces que encantam os usuários.",
    videoUrl: "https://www.youtube.com/watch?v=ux-design-moderno",
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
    title: "IA Generativa: Fundamentos e Aplicações",
    category: "Tecnologia",
    duration: '45 min',
    author: 'Dr. Roberto Almeida',
    image: images.ai,
    content: 'Descubra como a IA generativa está transformando criatividade e produtividade em diversas indústrias.',
    videoUrl: 'https://www.youtube.com/watch?v=ia-generativa',
  },
  {
    id: "2",
    title: "Estratégias de Liderança Moderna",
    category: "Negócios",
    duration: '1h 20min',
    author: 'Profa. Amanda Souza',
    image: images.business,
    content: 'Aprenda técnicas modernas de liderança para gerenciar equipes remotas e aumentar a produtividade.',
    videoUrl: 'https://www.youtube.com/watch?v=lideranca-moderna',
  },
  {
    id: "3",
    title: "UI/UX Design: Princípios Essenciais",
    category: "Design",
    duration: '2h 15min',
    author: 'Lucas Martins',
    image: images.uxDesign,
    content: 'Domine os princípios fundamentais de UI/UX Design e crie interfaces intuitivas e atraentes.',
    articleUrl: 'https://medium.com/@lucasmartins/ui-ux-principios',
  },
  {
    id: "4",
    title: "Arquitetura de Software: Padrões Modernos",
    category: "Tecnologia",
    duration: '1h 45min',
    author: 'Dr. Paulo Henrique',
    image: images.programming,
    content: 'Explore os padrões de arquitetura de software mais utilizados na indústria e quando aplicá-los.',
    articleUrl: 'https://medium.com/@paulohenrique/arquitetura-software',
  },
];
