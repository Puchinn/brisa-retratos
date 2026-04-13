import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OrderDataInput } from "../order-data.model";

interface StepShippingProps {
  orderData: OrderDataInput;
  updateOrderData: (data: Partial<OrderDataInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepShipping({
  orderData,
  updateOrderData,
  onNext,
  onBack,
}: StepShippingProps) {
  const handleChange = (field: keyof OrderDataInput, value: string) => {
    updateOrderData({
      [field]: value,
    });
  };

  const canProceed =
    orderData.order_user_fullname && orderData.order_user_email;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Datos de envío</h3>
        <p className="text-muted-foreground">
          Completá tus datos para que podamos enviarte tu obra
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo *</Label>
          <Input
            id="name"
            value={orderData.order_user_fullname}
            onChange={(e) =>
              handleChange("order_user_fullname", e.target.value)
            }
            placeholder="Juan Pérez"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={orderData.order_user_email}
            onChange={(e) => handleChange("order_user_email", e.target.value)}
            placeholder="juan@ejemplo.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="province">Provincia</Label>
          <Input
            id="province"
            value={orderData.order_user_province}
            onChange={(e) =>
              handleChange("order_user_province", e.target.value)
            }
            placeholder="Buenos Aires"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            value={orderData.order_user_address}
            onChange={(e) => handleChange("order_user_address", e.target.value)}
            placeholder="Av. Corrientes 1234, Piso 5, Depto B"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Código postal</Label>
          <Input
            id="postalCode"
            value={orderData.order_user_postal_code}
            onChange={(e) =>
              handleChange("order_user_postal_code", e.target.value)
            }
            placeholder="C1043"
          />
        </div>
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
