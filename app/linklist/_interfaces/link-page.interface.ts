export interface ILinkPage {
  id: number;
  bgType: "color" | "image";
  bgColor: string;
  bgImage: string | null;
  userImage: string | null;
  displayName: string | null;
  location: string | null;
  bio: string | null;
}

export interface IUpdateLinkPage {
  displayName?: string;
  location?: string;
  bio?: string;
  bgType?: "color" | "image";
  bgColor?: string;
  bgImage?: string | null;
}
