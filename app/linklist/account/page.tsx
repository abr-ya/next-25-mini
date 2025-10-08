import { PageSettingsForm } from "../_copmonents/index";

interface IAccountPage {
  searchParams?: Promise<{
    desiredUsername?: string;
  }>;
}

const AccountPage = async ({ searchParams }: IAccountPage) => {
  const rawParams = await searchParams;
  const { desiredUsername } = rawParams ?? {};

  console.log("desiredUsername", desiredUsername);

  return (
    <div>
      AccountPage
      <PageSettingsForm
        page={{
          bgType: "color",
          bgColor: "#dedede",
          bgImage: "",
          displayName: "John Doe",
          location: "Somewhere",
          bio: "Hello, I'm John!",
        }}
      />
    </div>
  );
};

export default AccountPage;
