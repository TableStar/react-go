type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

import Cookies from "js-cookie";

export const useAuthUser = (): User | null => {
  const user = Cookies.get("user");

  return user ? JSON.parse(user) as User : null;
};
