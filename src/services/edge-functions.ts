import type { OrderDataFinal } from "@/components/extracted-order/order-data.model";
import supabase from "@/supabase/supabase";

const dummyTestEdgeFunction = async (name: string) => {
  const { data } = await supabase.functions.invoke("hyper-responder", {
    body: { name: name },
  });

  return data;
};

const createUploadUrl = async (file: File) => {
  const { data } = await supabase.functions.invoke("create-upload-url", {
    body: JSON.stringify({ fileType: file.type.split("/")[1] }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    path: data.data.path || "",
    token: data.data.token || "",
    file,
  };
};

// la edge function se llama create-form

const createOrder = async (orderData: OrderDataFinal, token: string) => {
  const { data, error } = await supabase.functions.invoke("create-form", {
    body: JSON.stringify({
      token,
      data_form: orderData,
    }),
  });

  if (error) throw "Ocurrio un error";

  return {
    success: data.success,
  };
};

export { dummyTestEdgeFunction, createOrder, createUploadUrl };
