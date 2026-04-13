import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { OrderDataInput } from "../order-data.model";

interface StepSummaryProps {
  orderData: OrderDataInput;
  onNext: () => void;
  onBack: () => void;
}

export function StepSummary({ orderData, onNext, onBack }: StepSummaryProps) {
  const stylePrice = orderData.style === "pencil" ? 8000 : 12000;
  const sizePrice =
    orderData.size === "A5"
      ? 0
      : orderData.size === "A4"
      ? 3000
      : orderData.size === "A3"
      ? 6000
      : orderData.size === "A2"
      ? 10000
      : 0;

  const extrasPrice =
    (orderData.wood_frame ? 4500 : 0) + (orderData.priority ? 2500 : 0);

  const shippingPrice = 2000;
  const total = stylePrice + sizePrice + extrasPrice + shippingPrice;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Resumen del pedido</h3>
        <p className="text-muted-foreground">
          Revisá los detalles antes de continuar con el pago
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <h4 className="font-semibold mb-3">Detalles del retrato</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estilo:</span>
              <span className="font-medium">
                {orderData.style === "pencil" ? "Lápiz" : "Color"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tamaño:</span>
              <span className="font-medium">{orderData.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fotos:</span>
              <span className="font-medium">
                {(orderData.examples_photos || []).length} archivo(s)
              </span>
            </div>
          </div>
        </div>

        {(orderData.wood_frame || orderData.priority || orderData.comments) && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold mb-3">Extras</h4>
              <div className="space-y-3 text-sm">
                {orderData.wood_frame && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Marco de madera
                    </span>
                    <span className="font-medium">$4.500</span>
                  </div>
                )}
                {orderData.priority && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Entrega prioritaria
                    </span>
                    <span className="font-medium">$2.500</span>
                  </div>
                )}
                {orderData.comments && (
                  <div className="space-y-1">
                    <span className="text-muted-foreground font-medium">
                      Comentarios y detalles:
                    </span>
                    <p className="text-foreground whitespace-pre-wrap bg-muted/50 p-3 rounded-md">
                      {orderData.comments}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <Separator />

        <div>
          <h4 className="font-semibold mb-3">Envío</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nombre:</span>
              <span className="font-medium">
                {orderData.order_user_fullname}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{orderData.order_user_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provincia:</span>
              <span className="font-medium">
                {orderData.order_user_province}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dirección:</span>
              <span className="font-medium text-right max-w-[200px]">
                {orderData.order_user_address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Código postal:</span>
              <span className="font-medium">
                {orderData.order_user_postal_code}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Costo de envío:</span>
              <span className="font-medium">$2.000</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span>${(stylePrice + sizePrice).toLocaleString("es-AR")}</span>
          </div>
          {extrasPrice > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Extras:</span>
              <span>${extrasPrice.toLocaleString("es-AR")}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Envío:</span>
            <span>${shippingPrice.toLocaleString("es-AR")}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
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
