import { RouterProvider } from 'react-router';
import { router } from './routes';
import AppHeader from './components/AppHeader';

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-[430px] h-screen bg-background overflow-y-auto scrollbar-hide flex flex-col">
        <AppHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}