import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Index from './routes/index';
const AnimatedRoutes: React.FC = () => {
  const location = useLocation()
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
export default AnimatedRoutes