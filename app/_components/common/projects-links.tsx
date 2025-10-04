import { ButtonLink } from "./button-link";

export const ProjectsLinks = () => {
  return (
    <div>
      <div>This Site's Projects Links:</div>
      <ButtonLink variant="link" to="/cloud" text="Cloud Landing {first!}" />
      <ButtonLink variant="link" to="/money" text="Money {in progress}" />
    </div>
  );
};
