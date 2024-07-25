import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import  Signin  from './pages/signin'
import  Blogs  from './pages/blogs'
import  Blog from './pages/blog'
import Publish from './pages/publish'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App