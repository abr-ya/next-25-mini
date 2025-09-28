interface INotFound {
  text?: string;
}

export const NotFound = ({ text }: INotFound) => (
  <div className="text-3xl text-center py-10 text-muted-foreground">{text || "Oops! Page not found"}</div>
);
