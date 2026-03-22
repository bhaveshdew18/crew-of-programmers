import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default MainLayout;