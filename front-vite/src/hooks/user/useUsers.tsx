import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Api from "../../services/api";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const token = Cookies.get("token");
      const response = await Api.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data as User[];
    },
  });
};
