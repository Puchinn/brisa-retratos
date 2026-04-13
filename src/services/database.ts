import supabase from "../supabase/supabase";

export interface Image {
  id: string;
  created_at: string;
  title: string;
  category: string;
  public_url: string;
  file_path: string;
  price: string;
}

export interface PageInfo {
  id: string;
  created_at: string;
  title: string;
  sub_title: string;
  phone_number: string;
}

const getImages = async () => {
  const { data, error } = await supabase.from("images").select("*");
  if (error) throw error;

  return data as Image[];
};

const getPageInfo = async () => {
  const { data, error } = await supabase
    .from("page_info")
    .select("*")
    .limit(1)
    .single();
  if (error) throw error;
  return data as PageInfo;
};

const uploadToPrivateBucket = async (
  path: string,
  token: string,
  file: File,
) => {
  const { data, error } = await supabase.storage
    .from("imagenes-privadas")
    .uploadToSignedUrl(path, token, file);
  if (error) throw error;
  return data;
};

const imageExists = async (fileName: string) => {
  const response = await supabase.storage.from("subir-fotos").exists(fileName);

  return response;
};

const getImage = async (fileName: string) => {
  const response = supabase.storage.from("subir-fotos").getPublicUrl(fileName);

  return response;
};

const uploadToPublicBucket = async (file: File) => {
  const res = await supabase.storage
    .from("subir-fotos")
    .upload(file.name, file);

  return res.data;
};

export {
  getImages,
  getPageInfo,
  uploadToPrivateBucket,
  uploadToPublicBucket,
  imageExists,
  getImage,
};
