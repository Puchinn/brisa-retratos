export interface OrderDataInput {
  examples_photos: File[] | [];
  style: "pencil" | "color" | null;
  size: "A5" | "A4" | "A3" | "A2" | null;
  priority: boolean;
  wood_frame: boolean;
  comments: string | null;
  order_user_fullname: string;
  order_user_email: string;
  order_user_province: string;
  order_user_address: string;
  order_user_postal_code: number;
}

export interface OrderData {
  examples_photos: File[] | [];
  style: "pencil" | "color" | null;
  size: "A5" | "A4" | "A3" | "A2" | null;
  priority: boolean;
  wood_frame: boolean;
  comments: string | null;
  order_user_fullname: string;
  order_user_email: string;
  order_user_province: string;
  order_user_address: string;
  order_user_postal_code: number;
}

export interface OrderDataFinal {
  examples_photos: string[];
  style: "pencil" | "color" | null;
  size: "A5" | "A4" | "A3" | "A2" | null;
  priority: boolean;
  wood_frame: boolean;
  comments: string | null;
  order_user_fullname: string;
  order_user_email: string;
  order_user_province: string;
  order_user_address: string;
  order_user_postal_code: number;
}
