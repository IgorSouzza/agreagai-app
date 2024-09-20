import '../styles/global.css'
import { StatusBar } from 'expo-status-bar'
import { Tabs } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Text, View } from 'react-native'

const queryClient = new QueryClient()

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Tabs>
          <Tabs.Screen name='index' options={{ title: 'Início', headerShown: false }} />
          <Tabs.Screen name='config' options={{ title: 'Configurações', headerTitle: 'Atualizar a tela principal' }} />
        </Tabs>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
