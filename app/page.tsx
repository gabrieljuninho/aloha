import { auth } from "@/auth";

import LogoutButton from "@/common/components/ui/auth/logout-button";

const HomePage = async () => {
  const session = await auth();

  return (
    <>
      {JSON.stringify(session)}
      <div className="mt-2">
        <LogoutButton />
      </div>
    </>
  );
};

export default HomePage;
