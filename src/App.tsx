import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Code splitting das páginas para reduzir payload inicial
const Home = lazy(() => import("./pages/Home"));
const Index = lazy(() => import("./pages/Index"));
const Results = lazy(() => import("./pages/Results"));
const Pesquisa = lazy(() => import("./pages/Pesquisa"));
const Quizzes = lazy(() => import("./pages/Quizzes"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-sm text-gray-500">Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz" element={<Index />} />
          <Route path="/resultados" element={<Results />} />
          <Route path="/pesquisa" element={<Pesquisa />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
