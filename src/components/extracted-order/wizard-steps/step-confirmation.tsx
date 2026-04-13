import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Mail } from "lucide-react";

interface StepConfirmationProps {
  loading: boolean;
  error: string;
  sucess: boolean;
  onClose: () => void;
}

export function StepConfirmation({
  error,
  loading,
  onClose,
  sucess,
}: StepConfirmationProps) {
  if (loading && !sucess) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-foreground"></div>
        </div>
        <p className="text-muted-foreground">Procesando tu pedido...</p>
      </div>
    );
  }

  if (!loading && !sucess && error) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Error</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
        <Button onClick={onClose} size="lg">
          Volver al inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center py-8">
      <div className="flex justify-center">
        <CheckCircle2 className="w-20 h-20 text-green-600" />
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-2">¡Pedido confirmado!</h3>
        <p className="text-muted-foreground">
          Tu retrato personalizado está en curso
        </p>
      </div>

      <Card className="p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>Te enviamos un email a con toda la informacion</span>
          </div>
        </div>
      </Card>

      <div className="space-y-3 max-w-md mx-auto text-sm text-muted-foreground">
        <p>
          Recibirás un correo electrónico con todos los detalles de tu pedido y
          el seguimiento del mismo.
        </p>
        <p>
          Nuestro equipo comenzará a trabajar en tu retrato en las próximas 24
          horas.
        </p>
      </div>

      <div className="pt-6">
        <Button onClick={onClose} size="lg" className="px-12">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
