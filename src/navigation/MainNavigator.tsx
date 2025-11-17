import { DiscoverScreen } from '@/src/screens/DiscoverScreen';
import { HomeScreen } from '@/src/screens/HomeScreen';
import { LearnScreen } from '@/src/screens/LearnScreen';
import { ProfileScreen } from '@/src/screens/ProfileScreen';
import { colors } from '@/src/utils/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BookOpen, Compass, Home, User } from 'lucide-react-native';
import React from 'react';

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused, color }) => {
          const size = 20;
          
          if (route.name === 'Home') {
            return <Home size={size} color={color} fill={focused ? color : 'transparent'} />;
          } else if (route.name === 'Discover') {
            return <Compass size={size} color={color} fill={focused ? color : 'transparent'} />;
          } else if (route.name === 'Learn') {
            return <BookOpen size={size} color={color} fill={focused ? color : 'transparent'} />;
          } else if (route.name === 'Profile') {
            return <User size={size} color={color} fill={focused ? color : 'transparent'} />;
          }
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Início' }} 
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen} 
        options={{ title: 'Descobrir' }} 
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen} 
        options={{ title: 'Aprender' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
}