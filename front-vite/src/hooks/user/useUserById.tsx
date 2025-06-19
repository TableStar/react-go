import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Api from "../../services/api";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const useUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      const token = Cookies.get("token");

      const response = await Api.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data as User;
    },
  });
};
