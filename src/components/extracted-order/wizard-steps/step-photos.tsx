import type React from "react";

import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import type { OrderDataInput } from "../order-data.model";
import { useRef, useState } from "react";

interface StepPhotosProps {
  orderData: OrderDataInput;
  updateOrderData: (data: Partial<OrderDataInput>) => void;
  onNext: () => void;
}

function maxSize(files: File[]) {
  const maxSizeInMB = 10;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return files.some((file) => file.size > maxSizeInBytes);
}

export function StepPhotos({
  orderData,
  updateOrderData,
  onNext,
}: StepPhotosProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (maxSize(files)) {
      setMessage("Archivo muy pesado, maximo 10mb");
      return;
    }

    setMessage("");

    const newPhotos = [
      ...(orderData.examples_photos as File[]),
      ...files,
    ].slice(0, 2);

    updateOrderData({ examples_photos: newPhotos });

    // Generate previews
    const newPreviews = newPhotos.map((file) =>
      URL.createObjectURL(file as File),
    );
    setPreviews(newPreviews);
  };

  const removePhoto = (index: number) => {
    const newPhotos = (orderData.examples_photos as File[]).filter(
      (_, i) => i !== index,
    );
    const newPreviews = previews.filter((_, i) => i !== index);

    updateOrderData({ examples_photos: newPhotos });
    setPreviews(newPreviews);
  };

  const canProceed = orderData.examples_photos.length > 0;

  return (
    <div className="space-y-6">
      {message && <p className="text-center text-red-500">{message}</p>}
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Subí tus fotos de referencia
        </h3>
        <p className="text-muted-foreground">
          Podés subir hasta 2 fotos que usaremos como referencia para tu retrato
        </p>
      </div>

      <div className="space-y-4">
        {previews.length < 2 && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Hacé clic para seleccionar fotos
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG o WEBP (máx. 10MB)
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-x-1 justify-end pt-4">
        <Button onClick={onNext} size="lg">
          Omitir
        </Button>
        <Button onClick={onNext} disabled={!canProceed} size="lg">
          Continuar
        </Button>
      </div>
    </div>
  );
}
