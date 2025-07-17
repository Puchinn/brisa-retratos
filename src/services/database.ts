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

export { getImages, getPageInfo };
