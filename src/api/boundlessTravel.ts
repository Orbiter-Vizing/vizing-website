import axios from "axios";

import { getCurrentEnvApiUrl } from "@/utils/constant";

const apiUrl = getCurrentEnvApiUrl();

interface RequestUserLoginInfoParams {
  account: string;
}

export interface RequestUserLoginInfoOutput {
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

export const requestUserLoginInfo = ({
  account,
}: RequestUserLoginInfoParams): Promise<RequestUserLoginInfoOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {
        account,
      },
      method: "POST",
      url: "analytics/boundless/sign-in",
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Request user login info failed.");
      }
    });
};

interface CheckIsInviteCodeValidParams {
  account: string;
  invitedCode: string;
}

interface CheckIsInviteCodeValidOutput {
  success: boolean;
}

export const checkIsInviteCodeValid = ({
  account,
  invitedCode,
}: CheckIsInviteCodeValidParams): Promise<CheckIsInviteCodeValidOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {
        account,
        invitedCode,
      },
      method: "POST",
      url: "analytics/boundless/bind",
    })
    .then((res) => {
      if ((res.status === 200 || res.status === 201) && res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Check invited code failed.");
      }
    });
};

interface GetPreMintInfoParams {
  account: string;
}

interface GetPreMintInfoOutput {
  account: string;
  code: string;
  contractAddress: string;
  invitedAccount: string;
  invitedCode: string;
  metadataUri: string;
  mintPrice: string;
  signHash: string;
  vizingChainId: string;
}

export const getPreMintInfo = ({
  account,
}: GetPreMintInfoParams): Promise<GetPreMintInfoOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {},
      method: "GET",
      url: `analytics/boundless/pre-mint/${account}`,
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Get pre-mint info failed.");
      }
    });
};

interface GetMintSigatureParams {
  hash: string;
}

interface GetMintSigatureOutput {
  hash: string;
  signature: string;
}

export const getMintSigature = ({
  hash,
}: GetMintSigatureParams): Promise<GetMintSigatureOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {},
      method: "GET",
      url: `analytics/boundless/mint/${hash}`,
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Get signature failed.");
      }
    });
};

export interface GetBoundlessTravelSettingOutput {
  contractAddress: string;
  gasLimit: string[];
  gasPrice: string[];
  metadataUriPath: string;
  mintPrice: string[];
  totalTickets: number;
  vizingChainId: string;
}

export const getBoundlessTravelSetting = (): Promise<GetBoundlessTravelSettingOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {},
      method: "GET",
      url: "analytics/boundless/setting",
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Get setting failed.");
      }
    });
};

interface BindAcccountAndVPassParams {
  account: string;
  transactionHash: string;
}

interface BindAcccountAndVPassOutput {
  success: boolean;
}

export const bindAcccountAndVPass = ({
  account,
  transactionHash, // `${chainId}-${hash}`
}: BindAcccountAndVPassParams): Promise<BindAcccountAndVPassOutput> => {
  return axios
    .request({
      baseURL: apiUrl,
      data: {
        account,
        transactionHash,
      },
      method: "POST",
      url: "analytics/boundless/vpass",
    })
    .then((res) => {
      if (res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Bind VPass failed.");
      }
    });
};
