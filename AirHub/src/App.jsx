import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React from 'react';
import { Navbar } from "@/widgets/layout";
import { QueryClient, QueryClientProvider } from 'react-query';
import routes from "@/routes";
import NewReservation from './pages/new-reservation';
import AdminUsersPage from './pages/admin';
import Details from './pages/details';
import { UserProvider } from "@/UserProvider";

const queryClient = new QueryClient();


function App() {
  const { pathname } = useLocation();

   return (
    <QueryClientProvider client={queryClient}>
      <UserProvider> {/* Utiliser UserProvider pour envelopper l'ensemble de l'application */}
         {(pathname !== '/sign-in' && pathname !== '/sign-up'  && pathname !== '/admin' && pathname !== '/profile' && pathname !== '/details') && (
          <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
            <Navbar routes={routes} />
          </div>
        )}
        <Routes>
          {routes.map(({ path, element }, key) => (
            element && <Route key={key} exact path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/home" replace />} />
           <Route path="/new-reservation" element={<NewReservation />} />
           <Route path="/admin" element={<AdminUsersPage/>} />
            <Route path="/details/:userId" element={<Details />} />
        </Routes>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
