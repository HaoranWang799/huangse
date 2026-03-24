import { createBrowserRouter, Outlet } from 'react-router';
import AppHeader from './components/AppHeader';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
}
import Home from './pages/Home';
import CreateScenario from './pages/CreateScenario';
import ScenarioResult from './pages/ScenarioResult';
import ImmersiveSession from './pages/ImmersiveSession';
import DeviceConnect from './pages/DeviceConnect';
import HardwareControl from './pages/HardwareControl';
import Explore from './pages/Explore';
import Community from './pages/Community';
import Insights from './pages/Insights';
import HealthData from './pages/HealthData';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';
import Referral from './pages/Referral';
import Help from './pages/Help';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import Saved from './pages/Saved';
import Downloads from './pages/Downloads';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/create',
        element: <CreateScenario />,
      },
      {
        path: '/result',
        element: <ScenarioResult />,
      },
      {
        path: '/session',
        element: <ImmersiveSession />,
      },
      {
        path: '/device',
        element: <DeviceConnect />,
      },
      {
        path: '/hardware',
        element: <HardwareControl />,
      },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/community',
        element: <Community />,
      },
      {
        path: '/insights',
        element: <Insights />,
      },
      {
        path: '/health',
        element: <HealthData />,
      },
      {
        path: '/subscription',
        element: <Subscription />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/saved',
        element: <Saved />,
      },
      {
        path: '/downloads',
        element: <Downloads />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/referral',
        element: <Referral />,
      },
      {
        path: '/help',
        element: <Help />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);