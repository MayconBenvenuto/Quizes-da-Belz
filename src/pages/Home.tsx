import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <Layout hideHeader>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background responsivo com overlay corporativo */}
        <img
          src="/colaboradores-belz.png"
          alt="Fundo ergonomia desktop"
          className="absolute inset-0 w-full h-full object-cover hidden sm:block opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue-dark/75 via-corporate-blue/70 to-corporate-blue-light/80" />

        {/* Conteúdo */}
        <div className="relative z-10 container mx-auto px-6 py-16 sm:py-24 max-w-5xl">
          <header className="text-center sm:text-left space-y-3 sm:space-y-2 mb-10">
            <img 
              src="Conecta-Saude.png"
              alt="Belz Conecta Saúde"
              className="mx-auto sm:mx-0 w-60 h-auto "
            />
            <p className="text-xs tracking-widest uppercase text-white/70">powered by Belz Conecta Saúde</p>
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Central de Experiências
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl">
              Explore nossos quizzes e o diagnóstico corporativo. Baseado no design system Belz, rápido e responsivo.
            </p>
          </header>

          {/* Grid de ações em cards profissionais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card Quizzes */}
            <Card className="h-full bg-white/5 border-white/15 backdrop-blur-md text-white shadow-xl hover:shadow-2xl hover:bg-white/10 transition-[transform,box-shadow,background] duration-300 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Quizzes</CardTitle>
                <CardDescription className="text-white/75">Avalie seus conhecimentos</CardDescription>
              </CardHeader>
              <CardContent className="pt-0" />
              <CardFooter>
                <Link to="/quizzes" className="w-full">
                  <Button className="w-full bg-white text-corporate-blue hover:bg-white/90">Abrir</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Card Diagnóstico */}
            <Card className="h-full bg-white/5 border-white/15 backdrop-blur-md text-white shadow-xl hover:shadow-2xl hover:bg-white/10 transition-[transform,box-shadow,background] duration-300 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Diagnóstico</CardTitle>
                <CardDescription className="text-white/75">Autoavaliação corporativa</CardDescription>
              </CardHeader>
              <CardContent className="pt-0" />
              <CardFooter>
                <Link to="/diagnostico" className="w-full">
                  <Button className="w-full bg-white text-corporate-blue hover:bg-white/90">Abrir</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Card Pesquisa de Satisfação */}
            <Card className="h-full bg-white/5 border-white/15 backdrop-blur-md text-white shadow-xl hover:shadow-2xl hover:bg-white/10 transition-[transform,box-shadow,background] duration-300 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl break-words leading-tight">Pesquisa de Satisfação</CardTitle>
                <CardDescription className="text-white/75">Abrir formulário externo</CardDescription>
              </CardHeader>
              <CardContent className="pt-0" />
              <CardFooter>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfDWisIu8dqclpJ7Lg9QgvyMCFEfIFf963b_3RCBqGdMGQIbA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full bg-white text-corporate-blue hover:bg-white/90">Abrir</Button>
                </a>
              </CardFooter>
            </Card>

            {/* Card Administrador com Dialog */}
            <Card className="h-full bg-white/5 border-white/15 backdrop-blur-md text-white shadow-xl hover:shadow-2xl hover:bg-white/10 transition-[transform,box-shadow,background] duration-300 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Administrador</CardTitle>
                <CardDescription className="text-white/75">Gerenciar conteúdo</CardDescription>
              </CardHeader>
              <CardContent className="pt-0" />
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-white text-corporate-blue hover:bg-white/90">Abrir</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Escolha uma área</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      <Link to="/admin" className="w-full">
                        <Button variant="default" className="w-full">Admin do Quiz</Button>
                      </Link>
                      <Link to="/diagnostico/admin" className="w-full">
                        <Button variant="outline" className="w-full">Admin do Diagnóstico</Button>
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
