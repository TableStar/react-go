import { useMutation } from "@tanstack/react-query";
import Api from "../services/api";

type LoginRequest = {
  username: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await Api.post("/api/login", data);
      return response.data;
    },
  });
};
