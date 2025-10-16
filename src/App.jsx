import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import Support from './pages/Support';
import Otplogin from './auth/otplogin';
import OtpVerification from './auth/otpVerification';
import StartPlay from './auth/startPlay';
import Question from './quiz/Question';
import Login from './pages/Login';
import Register from './pages/Register';
import PurchasePlan from './quiz/PurchasePlan';
import './App.css';

import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import AdminLoginPage from "./admin/AdminLoginPage";
import AdminLayout from "./admin/AdminLayout";
import DashboardPage from "./admin/DashboardPage";
import AddQuizPage from "./admin/AddQuizPage";
import QuizListPage from "./admin/QuizListPage";
import Product from './pages/Product';
import LeaderboardTable from './pages/Leaderboard';
import { AuthProvider } from './auth/AuthContext';

function Layout() {
  const location = useLocation();

  const hideHeaderRoutes = ['/login','/register','/purchase/plan'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname) || location.pathname.startsWith("/admin");

  return (
    <main>
      <div className="container-fluid m-0 p-0">
        {!shouldHideHeader && <Header />}
      </div>

      <div className="container-fluid m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/otp/login" element={<Otplogin />} />
          <Route path="/otp/verify" element={<OtpVerification />} />
          <Route path="/start/play" element={<StartPlay />} />
          <Route path="/quiz" element={<Question />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/purchase/plan" element={<PurchasePlan />} />
          <Route path="/product" element={<Product />} />
          <Route path="/leaderboard" element={<LeaderboardTable />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<ProtectedAdminRoute><DashboardPage /></ProtectedAdminRoute>} />
            <Route path="add-quiz" element={<ProtectedAdminRoute><AddQuizPage /></ProtectedAdminRoute>} />
            <Route path="quizzes" element={<ProtectedAdminRoute><QuizListPage /></ProtectedAdminRoute>} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
