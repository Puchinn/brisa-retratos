import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { OrderDataInput } from "../order-data.model";

interface StepExtrasProps {
  orderData: OrderDataInput;
  updateOrderData: (data: Partial<OrderDataInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepExtras({
  orderData,
  updateOrderData,
  onNext,
  onBack,
}: StepExtrasProps) {
  const extras = [
    {
      id: "wood_frame" as const,
      name: "Marco de madera",
      description:
        "Marco artesanal de madera de alta calidad, listo para colgar",
      price: 4500,
    },
    {
      id: "priority" as const,
      name: "Entrega prioritaria",
      description: "Recibí tu obra en 7 días hábiles en lugar de 15",
      price: 2500,
    },
  ];

  const handleToggle = (extraId: keyof OrderDataInput) => {
    updateOrderData({
      [extraId]: !orderData[extraId],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Agregá extras opcionales</h3>
        <p className="text-muted-foreground">
          Personalizá aún más tu experiencia (opcional)
        </p>
      </div>

      <div className="space-y-4">
        {extras.map((extra) => (
          <Card key={extra.id} className="p-6">
            <div className="flex items-start gap-4">
              <Checkbox
                id={extra.id}
                checked={orderData[extra.id]}
                onCheckedChange={() => handleToggle(extra.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor={extra.id}
                  className="text-base font-semibold cursor-pointer block mb-1"
                >
                  {extra.name}
                </label>
                <p className="text-sm text-muted-foreground mb-2">
                  {extra.description}
                </p>
                <p className="text-lg font-semibold">
                  +${extra.price.toLocaleString("es-AR")}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-3">
          <Label htmlFor="comments" className="text-base font-semibold">
            Comentarios y detalles
          </Label>
          <p className="text-sm text-muted-foreground">
            Contanos sobre la obra: detalles, ideas, historia del retrato o
            cualquier información que consideres importante
          </p>
          <Textarea
            id="comments"
            placeholder="Ej: Me gustaría que el retrato tenga un estilo suave, es un regalo para mi madre..."
            value={orderData.comments || ""}
            onChange={(e) => updateOrderData({ comments: e.target.value })}
            className="min-h-[120px] resize-none"
          />
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Volver
        </Button>
        <Button onClick={onNext} size="lg">
          Continuar
        </Button>
      </div>
    </div>
  );
}
