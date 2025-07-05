import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FetchMe } from './redux/slices/authSlice';

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
      </Routes>
    </Router>
  );
}

export default App;
