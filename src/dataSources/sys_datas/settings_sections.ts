import {
    Bell,
    FileText,
    Globe,
    HelpCircle,
    LucideIcon,
    Moon,
    Shield,
} from 'lucide-react-native';

export interface SettingsItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  type: 'navigation' | 'toggle' | string;
  badge?: string;
}

export interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

export  const SETTINGS_SECTIONS: SettingsSection[] = [
    {
      title: 'Preferências',
      items: [
        {
          id: 'notifications',
          icon: Bell,
          title: 'Notificações',
          subtitle: 'Gerencie suas notificações',
          type: 'navigation',
        },
        {
          id: 'language',
          icon: Globe,
          title: 'Idioma',
          subtitle: 'Português (Brasil)',
          type: 'navigation',
        },
        {
          id: 'theme',
          icon: Moon,
          title: 'Tema',
          subtitle: 'Modo claro',
          type: 'navigation',
          badge: 'Em breve',
        },
      ],
    },
    {
      title: 'Privacidade e Segurança',
      items: [
        {
          id: 'privacy',
          icon: Shield,
          title: 'Privacidade',
          subtitle: 'Controle seus dados',
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          id: 'help',
          icon: HelpCircle,
          title: 'Central de Ajuda',
          subtitle: 'FAQ e suporte',
          type: 'navigation',
        },
        {
          id: 'terms',
          icon: FileText,
          title: 'Termos de Uso',
          type: 'navigation',
        },
        {
          id: 'privacy-policy',
          icon: FileText,
          title: 'Política de Privacidade',
          type: 'navigation',
        },
      ],
    },
  ];