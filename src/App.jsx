import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Routes
import 'react-toastify/dist/ReactToastify.css'; // Add this in your main file
import './App.css';
import Header from './Layout/Header';
import Home from './PAGES/Home/Home';
import Index from './PAGES/Write/Index';
import Update from './PAGES/Write/Update';
import Footer from './Layout/Footer';
import Write from './PAGES/Write/Write';
import SignIn from './PAGES/Home/Signin';
import SignUp from './PAGES/Home/Signup';
import ContactUs from './PAGES/Home/Contect';
import BookDetailsPage from './PAGES/Home/BookDetailsPage';
import BookShowPage from './PAGES/Home/BookShowPage';
import PrivateRoute from './PAGES/Home/PrivateRoute';
import { CssBaseline } from '@mui/material';


function App() {

  return (
    <>
      <Router>
      <CssBaseline /> 
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/Index" element={<PrivateRoute><Index /></PrivateRoute>} />
            <Route path="/BookDetails/:id" element={<PrivateRoute><BookDetailsPage /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><Update /></PrivateRoute>} />
            <Route path="/add" element={<PrivateRoute><Write /></PrivateRoute>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/BookShow/:id" element={<PrivateRoute><BookShowPage /></PrivateRoute>} />
          

        </Routes>
        <Footer />
      </Router >
    </>
  )
}

export default App

