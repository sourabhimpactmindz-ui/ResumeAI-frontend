import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import { LenisProvider } from "./hooks/useLenis";
import Cursor from "./components/Cursor";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <LenisProvider>
      {/* 3-4% Noise Overlay for tactile human feel */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Weightless Interactive Custom Cursor */}
      <Cursor />

      {/* Deep-Space Slate Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-c-800 !border !border-c-700 !text-c-100 !rounded-2xl !font-sans !shadow-[0_16px_36px_rgba(6,20,27,0.8)]"
      />

      <RouterProvider router={router} />
    </LenisProvider>
  );
}

export default App;
