import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getCurrentEnvApiUrl } from "@/utils/constant";

const apiUrl = getCurrentEnvApiUrl();

export interface AccountTravelInfoRes {
  account: string;
  code: string;
  createdAt: string;
  id: number;
  invitedAccount: string;
  invitedCode: string;
  members: number;
  regIp: string;
  tickets: number;
  updatedAt: string;
  vPassHash: null;
  vPassId: string;
  vPassTime: number;
}

// export interface IRouteconfig {
//   fixedCost: string;
//   fixedRate: string;
//   fromToken: number;
//   maxAmount: string;
//   minAmount: string;
//   toToken: number;
// }
// export interface IuseRouteConfigRes {
//   routeConfig: IRouteconfig[];
// }

export const useAccountTravelInfo = (account: string | undefined) => {
  return useQuery<AccountTravelInfoRes, Error>({
    queryKey: ["useAccountTravelInfo"],
    refetchInterval: 600000,
    // refetchIntervalInBackground: true,
    queryFn: async () => {
      const result: AxiosResponse<AccountTravelInfoRes> = await axios.request({
        baseURL: apiUrl,
        data: {
          account,
        },
        method: "POST",
        url: "analytics/boundless/sign-in",
      });
      return result.data;
    },
  });
};

export interface useCheckInviteCodeRes {
  success: boolean;
}

export const useCheckInviteCode = (account: string | undefined, invitedCode: string) => {
  return useQuery<useCheckInviteCodeRes, Error>({
    queryKey: ["useCheckInviteCode"],
    refetchInterval: 600000,
    // refetchIntervalInBackground: true,
    queryFn: async () => {
      const result: AxiosResponse<useCheckInviteCodeRes> = await axios.request({
        baseURL: apiUrl,
        data: {
          account,
          invitedCode,
        },
        method: "POST",
        url: "analytics/boundless/bind",
      });
      return result.data;
    },
  });
};
