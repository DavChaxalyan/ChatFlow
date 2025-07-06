import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FetchMe } from './redux/slices/authSlice';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      dispatch(FetchMe());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
