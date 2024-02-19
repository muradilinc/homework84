import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/LoginPage/RegisterPage';

const App = () => {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/register'} element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;