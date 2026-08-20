// src/navigation/RootNavigator.tsx
// Tab Navigator raíz con Stack anidado en la pestaña Home.
// El badge del tab "Guardados" refleja el conteo del store Zustand.

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { DetailScreen } from '../screens/DetailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SavedScreen } from '../screens/SavedScreen';
import { COLORS } from '../theme';
import type { HomeStackParamList, RootTabParamList } from './types';
import { useSavedStore } from '../stores/savedStore';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator(): React.JSX.Element {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.surface },
                headerTintColor: COLORS.accent,
                headerTitleStyle: { fontWeight: 'bold' as const },
            }}
        >
            <HomeStack.Screen
                name="HomeList"
                component={HomeScreen}
                options={{ title: 'Concesiones' }}
            />
            <HomeStack.Screen
                name="HomeDetail"
                component={DetailScreen}
                // Lee el nombre del ítem dinámicamente desde los params
                options={({ route }) => ({ title: route.params.name })}
            />
        </HomeStack.Navigator>
    );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator(): React.JSX.Element {
    const savedCount = useSavedStore((state) => state.items.length);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.accent,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: { backgroundColor: COLORS.surface },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;
                    if (route.name === 'Home') {
                        iconName = focused ? 'fast-food' : 'fast-food-outline';
                    } else {
                        iconName = focused ? 'bookmark' : 'bookmark-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{ tabBarLabel: 'Concesiones' }}
            />
            <Tab.Screen
                name="Saved"
                component={SavedScreen}
                options={{
                    tabBarLabel: 'Guardados',
                    tabBarBadge: savedCount > 0 ? savedCount : undefined,
                }}
            />
        </Tab.Navigator>
    );
}