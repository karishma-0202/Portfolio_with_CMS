import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout() {
const location = useLocation()

useEffect(() => {
window.scrollTo({ top: 0, behavior: 'instant' })
}, [location.pathname])

return ( <div className="flex min-h-screen flex-col"> <Header /> <main className="flex-1"> <Outlet /> </main> <Footer /> </div>
)
}

export default Layout
