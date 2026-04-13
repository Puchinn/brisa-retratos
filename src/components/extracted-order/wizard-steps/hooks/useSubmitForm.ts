import type { OrderData } from "../../order-data.model";
import { useState } from "react";
import { createUploadUrl, createOrder } from "@/services/edge-functions";
import { uploadToPrivateBucket } from "@/services/database";

interface HookProps {
  orderData: OrderData;
  token: string;
}

export function useSubmitForm({ orderData, token }: HookProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sucess, setSuccess] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const has_images_to_upload = orderData.examples_photos.length > 0;
      let images_to_upload: string[] = [];

      if (has_images_to_upload) {
        const urls_to_upload = await Promise.all(
          orderData.examples_photos.map((file) => createUploadUrl(file)),
        );
        const uploaded_images = await Promise.all(
          urls_to_upload.map(({ path, token, file }) =>
            uploadToPrivateBucket(path, token, file),
          ),
        );
        images_to_upload = uploaded_images.map(({ fullPath }) => fullPath);
      }

      const response = await createOrder(
        {
          ...orderData,
          examples_photos: images_to_upload,
        },
        token,
      );

      if (!response.success) {
        setLoading(false);
        setSuccess(false);
        setError("Ocurrio un error al intentar crear la consulta");
        return;
      }

      setLoading(false);
      setError("");
      setSuccess(true);
    } catch {
      setLoading(false);
      setError("Ocurrio un error al hacer la solicitud");
      setSuccess(false);
    }
  };

  return {
    sucess,
    loading,
    error,
    submit,
  };
}
