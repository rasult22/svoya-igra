import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Index from './routes/index';
import GameStart from './routes/game-start';
import GameEnd from './routes/game-end';
const AnimatedRoutes: React.FC = () => {
  const location = useLocation()
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/game-start" element={<GameStart />} />
          <Route path="/game-end" element={<GameEnd />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
export default AnimatedRoutes