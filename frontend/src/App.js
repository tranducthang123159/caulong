import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultComponent from './components/DefaultComponent/DefaultComponent'; // Component chứa Header, Sidebar
import DefaultComponent1 from './components/DefaultComponent1'; // Component chứa Header, Sidebar

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;

            // Kiểm tra nếu route là trang chủ '/' thì dùng DefaultComponent, còn các route bắt đầu bằng '/admin' thì dùng DefaultComponent1
            const Layout = route.path === '/' ? DefaultComponent : (route.path.startsWith('/admin') ? DefaultComponent1 : Fragment);

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
