import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Pricing configuration (kept local for extracted component)
const PRICING = {
  styles: {
    pencil: 5000,
    color: 8000,
  },
  sizes: {
    a5: 3000,
    a4: 5000,
    a3: 8000,
    a2: 12000,
  },
  extras: {
    frame: 2000,
    priority: 1500,
  },
  shipping: 1000,
};

export function OrderButtonComplete() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Form data
  const [photos, setPhotos] = useState<File[]>([]);
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [hasFrame, setHasFrame] = useState(false);
  const [hasPriority, setHasPriority] = useState(false);
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalSteps = 8;

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    if (style)
      total += PRICING.styles[style as keyof typeof PRICING.styles] || 0;
    if (size) total += PRICING.sizes[size as keyof typeof PRICING.sizes] || 0;
    if (hasFrame) total += PRICING.extras.frame;
    if (hasPriority) total += PRICING.extras.priority;
    total += PRICING.shipping;
    return total;
  };

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + photos.length <= 2) {
      setPhotos([...photos, ...files]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Validate current step
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return photos.length > 0;
      case 2:
        return style !== "";
      case 3:
        return size !== "";
      case 4:
        return true;
      case 5:
        return name && email && province && address && postalCode;
      case 6:
        return true;
      case 7:
        return paymentMethod !== "";
      default:
        return false;
    }
  };

  // Submit order (kept as a client-side example using local stub or external integration)
  const submitOrder = async () => {
    setLoading(true);
    try {
      // In the extracted package replace this with your API call.
      const orderNum = `ORD-${Date.now()}`;
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 700));
      setOrderNumber(orderNum);
      setCurrentStep(8);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(
        "Hubo un error al guardar tu pedido. Por favor, intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 7) {
      submitOrder();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const resetForm = () => {
    setCurrentStep(1);
    setPhotos([]);
    setStyle("");
    setSize("");
    setHasFrame(false);
    setHasPriority(false);
    setComments("");
    setName("");
    setEmail("");
    setProvince("");
    setAddress("");
    setPostalCode("");
    setPaymentMethod("");
    setOrderNumber("");
    setOpen(false);
  };

  return (
    <>
      <Button
        size="lg"
        onClick={() => setOpen(true)}
        className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        Encargá tu obra
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {currentStep === 8
                ? "¡Pedido Confirmado!"
                : "Encargá tu retrato personalizado"}
            </DialogTitle>
          </DialogHeader>

          {/* Content omitted for brevity in extracted version. Use `OrderWizard` for the full wizard flow. */}

          <div className="p-6">
            <p className="text-sm text-muted-foreground">
              Este botón abre un wizard compacto. Para la versión completa usa{" "}
              <code>OrderWizard</code>.
            </p>
            <div className="pt-4">
              <Button
                onClick={() => {
                  setOpen(false);
                  setOrderNumber("ORD-EXTRACTED");
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
