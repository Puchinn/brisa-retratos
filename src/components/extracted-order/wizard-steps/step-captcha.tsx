import Turnstile from "react-turnstile";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface StepChaptchaProps {
  onBack: () => void;
  onNext: () => void;
  setToken: (token: string) => void;
}

export function StepCaptcha({ onBack, onNext, setToken }: StepChaptchaProps) {
  const [canProceed, setCanProceed] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Confirmar pedido</h3>
        <p className="text-muted-foreground">Verificar captcha</p>
      </div>

      <Turnstile
        sitekey="0x4AAAAAACFcZjkXnIZJzzRF"
        onVerify={(token) => {
          setToken(token);
          setCanProceed(true);
        }}
      />

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Volver
        </Button>
        <Button onClick={() => onNext()} disabled={!canProceed} size="lg">
          Confirmar pedido
        </Button>
      </div>
    </div>
  );
}
