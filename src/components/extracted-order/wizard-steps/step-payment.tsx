// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import type { OrderData } from "../order-wizard";
// import { Check, QrCode, Receipt } from "lucide-react";
// import Turnstile, { useTurnstile } from "react-turnstile";

// interface StepPaymentProps {
//   orderData: OrderData;
//   updateOrderData: (data: Partial<OrderData>) => void;
//   onNext: () => void;
//   onBack: () => void;
// }

// export function StepPayment({
//   orderData,
//   updateOrderData,
//   onNext,
//   onBack,
// }: StepPaymentProps) {
//   const paymentMethods = [
//     {
//       id: "mercadopago" as const,
//       name: "MercadoPago",
//       description: "Escaneá el código QR y pagá al instante",
//       icon: QrCode,
//     },
//     {
//       id: "pagofacil" as const,
//       name: "PagoFácil / Rapipago",
//       description: "Generá un código para pagar en efectivo",
//       icon: Receipt,
//     },
//   ];

//   const handleConfirm = () => {
//     // Generate order number
//     const orderNumber = `RP-${Date.now().toString().slice(-8)}`;
//     updateOrderData({ orderNumber });
//     onNext();
//   };

//   const canProceed = orderData.payment !== null;

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Confirmar pedido</h3>
//         <p className="text-muted-foreground">Verificar captcha</p>
//       </div>

//       <Turnstile
//         sitekey="3x00000000000000000000FF"
//         onVerify={(token) => console.log(orderData)}
//       />

//       <div className="flex justify-between pt-4">
//         <Button onClick={onBack} variant="outline" size="lg">
//           Volver
//         </Button>
//         <Button onClick={handleConfirm} disabled={!canProceed} size="lg">
//           Confirmar pedido
//         </Button>
//       </div>
//     </div>
//   );
// }
