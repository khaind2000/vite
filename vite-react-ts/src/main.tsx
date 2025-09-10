// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from "virtual:pwa-register"

registerSW({ immediate: true });  //PWA để có app hoạt động khu đang không có internet

// // CSR
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App name='Vite + React + Ts' />
//   </StrictMode>,
// )

// SSR
ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <BrowserRouter>
    <App name='Vite + React + Ts' />
  </BrowserRouter>
);