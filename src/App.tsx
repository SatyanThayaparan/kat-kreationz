import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BookNow } from './pages/BookNow'
import { Home } from './pages/Home'
import { Inventory } from './pages/Inventory'
import { Packages } from './pages/Packages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="book" element={<BookNow />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="packages" element={<Packages />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
