import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { OrderDataInput } from "../order-data.model";
import { Check } from "lucide-react";

interface StepSizeProps {
  orderData: OrderDataInput;
  updateOrderData: (data: Partial<OrderDataInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepSize({
  orderData,
  updateOrderData,
  onNext,
  onBack,
}: StepSizeProps) {
  const sizes = [
    {
      id: "A5" as const,
      name: "Pequeño",
      format: "A5",
      dimensions: "14.8 × 21 cm",
      reference: "Media hoja A4",
      description: "Bocetos, retratos simples",
      price: 0,
    },
    {
      id: "A4" as const,
      name: "Mediano",
      format: "A4",
      dimensions: "21 × 29.7 cm",
      reference: "Hoja común de impresora",
      description: "Obras detalladas, retratos",
      price: 5000,
    },
    {
      id: "A3" as const,
      name: "Grande",
      format: "A3",
      dimensions: "29.7 × 42 cm",
      reference: "Doble hoja A4",
      description: "Dibujos completos o composiciones",
      price: 10000,
    },
    {
      id: "A2" as const,
      name: "Extra Grande",
      format: "A2",
      dimensions: "42 × 59.4 cm",
      reference: "",
      description: "Obras de alto detalle o exposición",
      price: 15000,
    },
  ];

  const handleSelect = (sizeId: "A5" | "A4" | "A3" | "A2") => {
    updateOrderData({ size: sizeId });
  };

  const canProceed = orderData.size !== null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Elegí el tamaño</h3>
        <p className="text-muted-foreground">
          Seleccioná el tamaño que mejor se adapte a tu espacio
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sizes.map((size) => (
          <Card
            key={size.id}
            className={`cursor-pointer transition-all duration-300 p-6 ${
              orderData.size === size.id
                ? "ring-2 ring-primary shadow-lg"
                : "hover:shadow-md hover:border-foreground/20"
            }`}
            onClick={() => handleSelect(size.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-xl font-bold mb-1">{size.name}</h4>
                <p className="text-sm font-medium text-foreground/70">
                  {size.format}
                </p>
              </div>
              {orderData.size === size.id && (
                <div className="bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-muted-foreground">{size.dimensions}</p>
              {size.reference && (
                <p className="text-xs text-muted-foreground italic">
                  {size.reference}
                </p>
              )}
              <p className="text-sm text-foreground/80">{size.description}</p>
            </div>
            <p className="text-lg font-semibold">
              {size.price === 0
                ? "Incluido"
                : `+$${size.price.toLocaleString("es-AR")}`}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Volver
        </Button>
        <Button onClick={onNext} disabled={!canProceed} size="lg">
          Continuar
        </Button>
      </div>
    </div>
  );
}
