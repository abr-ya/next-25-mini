export interface IBaseLink {
  title: string;
  url: string;
  description: string | null;
  order: number;
}

export interface IAppLink extends IBaseLink {
  id: number;
}

export type LinkOrderType = Pick<IAppLink, "id" | "order">;
