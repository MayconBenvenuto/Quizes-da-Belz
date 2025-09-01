import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, Briefcase } from "lucide-react";

interface UserFormData {
  firstName: string;
  lastName: string;
  sector: string;
  role: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
}

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    sector: "",
    role: "",
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const validate = () => {
    const newErrors: Partial<UserFormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "Nome é obrigatório";
    if (!formData.lastName.trim()) newErrors.lastName = "Sobrenome é obrigatório";
    if (!formData.sector.trim()) newErrors.sector = "Setor é obrigatório";
    if (!formData.role.trim()) newErrors.role = "Cargo é obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof UserFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-corporate-blue">
              Dados Pessoais
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha seus dados para iniciar o quiz de ergonomia
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-corporate-blue font-medium">
                    Nome *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                    className={`border-2 transition-colors ${
                      errors.firstName 
                        ? "border-destructive focus:ring-destructive" 
                        : "border-border focus:ring-primary"
                    }`}
                    placeholder="Seu nome"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-corporate-blue font-medium">
                    Sobrenome *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                    className={`border-2 transition-colors ${
                      errors.lastName 
                        ? "border-destructive focus:ring-destructive" 
                        : "border-border focus:ring-primary"
                    }`}
                    placeholder="Seu sobrenome"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sector" className="text-corporate-blue font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Setor *
                </Label>
                <Input
                  id="sector"
                  value={formData.sector}
                  onChange={handleChange("sector")}
                  className={`border-2 transition-colors ${
                    errors.sector 
                      ? "border-destructive focus:ring-destructive" 
                      : "border-border focus:ring-primary"
                  }`}
                  placeholder="Ex: Recursos Humanos, TI, Financeiro..."
                />
                {errors.sector && (
                  <p className="text-sm text-destructive">{errors.sector}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role" className="text-corporate-blue font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Cargo Atual *
                </Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={handleChange("role")}
                  className={`border-2 transition-colors ${
                    errors.role 
                      ? "border-destructive focus:ring-destructive" 
                      : "border-border focus:ring-primary"
                  }`}
                  placeholder="Ex: Analista, Gerente, Coordenador..."
                />
                {errors.role && (
                  <p className="text-sm text-destructive">{errors.role}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Iniciar Quiz de Ergonomia
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserForm;