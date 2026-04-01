
import { Routes , Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
import {Toaster} from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
const App = () => {

  const location = useLocation();
  


  return (
    <div>
    <Toaster/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/ai"
            element={
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Layout />
              </motion.div>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="write-article" element={<WriteArticle />} />
            <Route path="blog-titles" element={<BlogTitles/>}/>
            <Route path="generate-images" element={<GenerateImages/>} />
            <Route path="remove-background" element={<RemoveBackground/>} />
            <Route path="remove-object" element={<RemoveObject/>} />
            <Route path="review-resume" element={<ReviewResume/>} />
            <Route path="community" element={<Community/>} />
          </Route>
        </Routes>
      </AnimatePresence>
    
    </div>
  )
}

export default App