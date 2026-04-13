import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { OrderDataInput } from "../order-data.model";
import { Check } from "lucide-react";

interface StepStyleProps {
  orderData: OrderDataInput;
  updateOrderData: (data: Partial<OrderDataInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepStyle({
  orderData,
  updateOrderData,
  onNext,
  onBack,
}: StepStyleProps) {
  const styles = [
    {
      id: "pencil" as const,
      name: "Lápiz",
      description:
        "Retrato clásico en blanco y negro con técnica de grafito. Elegante y atemporal.",
      image: "/pencil-portrait-drawing-black-and-white-realistic.jpg",
      price: 8000,
    },
    {
      id: "color" as const,
      name: "Color",
      description:
        "Retrato vibrante a todo color con técnicas mixtas. Lleno de vida y personalidad.",
      image: "/colorful-portrait-painting-vibrant-artistic.jpg",
      price: 12000,
    },
  ];

  const handleSelect = (styleId: "pencil" | "color") => {
    updateOrderData({ style: styleId });
  };

  const canProceed = orderData.style !== null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Elegí el estilo de tu retrato
        </h3>
        <p className="text-muted-foreground">
          Seleccioná la técnica que mejor se adapte a tu visión
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {styles.map((style) => (
          <Card
            key={style.id}
            className={`cursor-pointer transition-all duration-300 overflow-hidden ${
              orderData.style === style.id
                ? "ring-2 ring-primary shadow-lg"
                : "hover:shadow-md"
            }`}
            onClick={() => handleSelect(style.id)}
          >
            <div className="relative">
              <img
                src={style.image || "/placeholder.svg"}
                alt={style.name}
                className="w-full h-64 object-cover"
              />
              {orderData.style === style.id && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-2">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-2">{style.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {style.description}
              </p>
              <p className="text-xl font-semibold">
                ${style.price.toLocaleString("es-AR")}
              </p>
            </div>
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
