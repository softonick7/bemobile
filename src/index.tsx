import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, useRoutes, } from 'react-router-dom';
// import Routes from './app/routes';
import Details from './pages/Details/Details';
import List from './pages/List/List';

const container = document.getElementById('root')!;
const root = createRoot(container);

const rElements = [
  {path:"/detail", name:"Detail", element: <Details/>},
  {path:"/list", name:"List", element: <List/>},
  {path:"/", name:"Home", element: <App /> }
];

const RoutesRouter = () => useRoutes(rElements); 

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <RoutesRouter/>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
