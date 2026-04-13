import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { StepPhotos } from "./wizard-steps/step-photos";
import { StepStyle } from "./wizard-steps/step-style";
import { StepSize } from "./wizard-steps/step-size";
import { StepExtras } from "./wizard-steps/step-extras";
import { StepShipping } from "./wizard-steps/step-shipping";
import { StepSummary } from "./wizard-steps/step-summary";
import { StepConfirmation } from "./wizard-steps/step-confirmation";
import { StepCaptcha } from "./wizard-steps/step-captcha";
import type { OrderDataInput } from "./order-data.model";
import { useSubmitForm } from "./wizard-steps/hooks/useSubmitForm";

interface OrderWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderWizard({ open, onOpenChange }: OrderWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderDataInput>({
    examples_photos: [],
    style: null,
    size: null,
    priority: false,
    wood_frame: false,
    comments: null,
    order_user_fullname: "",
    order_user_email: "",
    order_user_province: "",
    order_user_address: "",
    order_user_postal_code: 0,
  });
  const [token, setToken] = useState<string>("");

  const { error, loading, submit, sucess } = useSubmitForm({
    orderData,
    token,
  });

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setOrderData({
      examples_photos: [],
      style: null,
      size: null,
      priority: false,
      wood_frame: false,
      comments: null,
      order_user_fullname: "",
      order_user_email: "",
      order_user_province: "",
      order_user_address: "",
      order_user_postal_code: 0,
    });
    onOpenChange(false);
  };

  const updateOrderData = (data: Partial<OrderDataInput>) => {
    setOrderData({ ...orderData, ...data });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 bg-card z-10 border-b border-border">
          <div className="p-8 pb-6">
            <h2 className="text-3xl  font-bold mb-2">Encargá tu obra</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Paso {currentStep} de {totalSteps}
            </p>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="p-8">
          {currentStep === 1 && (
            <StepPhotos
              orderData={orderData}
              updateOrderData={updateOrderData}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <StepStyle
              orderData={orderData}
              updateOrderData={updateOrderData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <StepSize
              orderData={orderData}
              updateOrderData={updateOrderData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <StepExtras
              orderData={orderData}
              updateOrderData={updateOrderData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 5 && (
            <StepShipping
              orderData={orderData}
              updateOrderData={updateOrderData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 6 && (
            <StepSummary
              orderData={orderData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 7 && (
            <StepCaptcha
              onNext={() => {
                setCurrentStep(currentStep + 1);
                submit();
              }}
              onBack={handleBack}
              setToken={setToken}
            />
          )}
          {currentStep === 8 && (
            <StepConfirmation
              loading={loading}
              error={error}
              sucess={sucess}
              onClose={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
