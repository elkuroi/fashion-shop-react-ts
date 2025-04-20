import { Outlet } from 'react-router-dom'
import { Header } from '../components/header'

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}