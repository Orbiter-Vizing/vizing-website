"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ethers, JsonRpcProvider, ZeroAddress } from "ethers";
import { clsx } from "clsx";
import Image from "next/image";
import {
  useBalance,
  useAccount,
  useReadContract,
  useChains,
  useChainId,
  useSwitchChain,
  useGasPrice,
  useBlockTransactionCount,
} from "wagmi";
import { readContract } from "@wagmi/core";

import styles from "./style.module.css";
import { EnvMode, getCurrentEnvExternalUrls, vizingPassSBTContractAddress } from "@/utils/constant";
import { activityList } from "./data";
import {
  getCurrentEnvChainConfig,
  getCurrentEnvChainBalance,
  ChainConfig,
} from "@/utils/chainConfig";
import { referralERC20Abi } from "@/abi/referralErc20";
import { vizingPassSBTAbi } from "@/abi/vizingPassSBT";
import { config } from "@/config/config";
import { getChainId } from "@/utils/chainConfig";
import { requestUserLoginInfo, getPreMintInfo, getMintSigature } from "@/api/boundlessTravel";
import { useContract, getCurrentEnvContract } from "@/hooks/i18n/client/useContract";
import { useEthersSigner } from "@/hooks/i18n/client/useEthersSigner";
import { useEnv } from "@/providers/envConfigProvider";
// atom
import { useAtom } from "jotai";
import {
  beInvitedAtom,
  accountTravelInfoAtom,
  emptyInvitedCode,
  encodeEmptyInvitedCode,
} from "@/atoms/accountAtom";
// assets
import IconSocialLinkArrow from "@/assets/images/icon/social-link-arrow.svg";
import ImgPassport from "@/assets/images/boundless-travel/nft-passport.png";
import ImgReferral from "@/assets/images/boundless-travel/referral.png";
import IconTwitterWhite from "@/assets/images/social-media/twitter-white.svg";
import IconCopy from "@/assets/images/icon/copy.svg";
import IconVizingWhite from "@/assets/images/boundless-travel/vizing-white.svg";
import IconLink from "@/assets/images/icon/link.svg";

interface ReferralData {
  totalClaim: number;
  totalReferral: number;
}

export default function VPass() {
  const account = useAccount();
  const walletChainId = useChainId();
  const signer = useEthersSigner({
    chainId: walletChainId,
  });
  const { currentEnvExternalUrls, vizingConfig } = useEnv();
  const { initCotractVizingPassSBT, initCotractVizingLaunchPad } = useContract();
  const { chains, switchChain } = useSwitchChain();
  const [accountTravelInfo, setAccountTravelInfo] = useAtom(accountTravelInfoAtom);
  const [inviteLink, setInviteLink] = useState("");
  const [selectedChain, setSelectedChain] = useState<ChainConfig>();
  const [chainList, setChainList] = useState<ChainConfig[]>();
  const [isChainListLoading, setIsChainListLoading] = useState(true);
  const [isUserMint, setIsUserMint] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const referralResult = useReadContract({
    abi: vizingPassSBTAbi,
    address: vizingPassSBTContractAddress,
    functionName: "getUserInfo",
    args: [account.address],
    chainId: (process.env.NEXT_PUBLIC_ENV as EnvMode) === "production" ? 28518 : 28516,
  });

  const copyInviteLink = async () => {
    if (!inviteLink) {
      return;
    }
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Copy invite link successfully!");
    } catch (err) {
      console.error("copy clipboard failed:", err);
    }
  };

  const handleSelectChain = (chain: ChainConfig) => {
    setSelectedChain(chain);
  };

  const initUserLoginInfo = useCallback(async () => {
    if (account.address) {
      // const { isPending, isFetching, isLoading, data, refetch } = useAccountTravelInfo();
      const accountLoginInfo = await requestUserLoginInfo({
        account: account.address,
      });
      console.log("vpass init: accountLoginInfo", accountLoginInfo);
      setAccountTravelInfo(accountLoginInfo);
      const inviteLink = `${currentEnvExternalUrls.homepage}/boundless-travel?inviteCode=${accountLoginInfo.code}`;
      setInviteLink(inviteLink);
    }
  }, [account.address, setAccountTravelInfo, currentEnvExternalUrls]);

  const initUserMintInfo = useCallback(async () => {
    const userAddress = account.address;
    if (!userAddress) {
      return;
    }
    try {
      const vizingProvider = new JsonRpcProvider(vizingConfig.rpcUrl);
      const contractVPassSBT = await initCotractVizingPassSBT(vizingProvider);
      const isUserMint = await contractVPassSBT.getIfAlreadyMint(userAddress);
      setIsUserMint(isUserMint);
    } catch (error) {
      console.error("Get mint info error", error);
    }
  }, [account.address, initCotractVizingPassSBT, vizingConfig]);

  const getCurrentEnvChainBalance = useCallback(async () => {
    const userAddress = account.address;
    if (userAddress) {
      const currentEnvChainList = getCurrentEnvChainConfig();

      const chainListWithBalance = await Promise.all(
        currentEnvChainList.map(async (chain) => {
          const provider = new JsonRpcProvider(chain.rpcUrl);
          const balance = await provider.getBalance(userAddress);
          return {
            ...chain,
            balance,
          };
        }),
      );
      setChainList(chainListWithBalance);
      setIsChainListLoading(false);
    }
  }, [account.address]);

  // const currentChainGasPrice = useGasPrice();

  const crossChainMint = async (signature: string) => {
    const userAddress = account.address;
    if (!userAddress || !signer) {
      return;
    }
    const preMintInfo = await getPreMintInfo({ account: userAddress });
    const mintPrice =
      preMintInfo.invitedCode === encodeEmptyInvitedCode
        ? ethers.parseEther("0.001")
        : ethers.parseEther("0.0008");
    const contractLauchPad = await initCotractVizingLaunchPad(signer);
    const vizingProvider = new JsonRpcProvider(vizingConfig.rpcUrl);
    const contractVPassSBT = await initCotractVizingPassSBT(vizingProvider);
    const vizingPassSBTContractAddress = getCurrentEnvContract().sbt;
    const ZEROBYTES = "0x";
    // const vizingChainId = (process.env.NEXT_PUBLIC_ENV as EnvMode) === "production" ? 28518 : 28516;
    // console.log("invited code", ethers.hexlify(ethers.toUtf8Bytes("abcdef")));
    const encodeData = await ethers.AbiCoder.defaultAbiCoder().encode(
      ["address", "uint256", "address", "address", "bytes6", "bytes6", "uint256", "string"],
      [
        vizingPassSBTContractAddress,
        vizingConfig.id,
        account.address,
        preMintInfo.invitedAccount,
        preMintInfo.invitedCode,
        preMintInfo.code,
        mintPrice,
        preMintInfo.metadataUri,
      ],
    );
    const getEncodeSignData = await ethers.keccak256(encodeData);
    const crossMessage = {
      receiver: preMintInfo.account,
      inviter: preMintInfo.invitedAccount || ZeroAddress,
      inviteCode: preMintInfo.invitedCode,
      personlInviteCode: preMintInfo.code,
      encodeSignMessage: getEncodeSignData,
      signature: signature,
      mintPrice: mintPrice,
      tokenMetadataUri: preMintInfo.metadataUri,
    };
    const getEncodeData = await contractVPassSBT.getEncodeData(
      crossMessage,
      vizingPassSBTContractAddress,
      // TODO: consider get gasLimit and gasPrice dynamicly
      // by estimateGas and useGasPrice
      BigInt(400000),
      1_400_000_000,
    );
    const getOmniMessageFee = await contractLauchPad["estimateGas(uint256,uint64,bytes,bytes)"](
      mintPrice,
      vizingConfig.id,
      "0x",
      getEncodeData,
    );
    const getTotalETHAmount = getOmniMessageFee + mintPrice;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const crossMintResult = await contractLauchPad.Launch(
      BigInt(currentTimestamp + 200),
      BigInt(currentTimestamp + 60000),
      ZeroAddress,
      account.address,
      mintPrice,
      vizingConfig.id,
      ZEROBYTES,
      getEncodeData,
      { value: getTotalETHAmount },
    );
    console.log("crossMintResult", crossMintResult);
    // TODO: show status toast after crossMint
  };

  const mintVPass = async () => {
    const userAddress = account.address;
    if (!userAddress || !signer) {
      return;
    }
    const preMintInfo = await getPreMintInfo({ account: userAddress });
    const contractVPassSBT = await initCotractVizingPassSBT(signer);
    const invitedCode = accountTravelInfo?.invitedCode || emptyInvitedCode;
    const inviterAddress = preMintInfo.invitedAccount;
    const mintPrice =
      invitedCode === emptyInvitedCode ? ethers.parseEther("0.001") : ethers.parseEther("0.0008");
    if (selectedChain?.name === "Vizing") {
      // mint request from vizing
      try {
        const mintResult = await contractVPassSBT.publicMint(
          preMintInfo.invitedCode,
          preMintInfo.code,
          inviterAddress,
          preMintInfo.metadataUri,
          {
            value: mintPrice,
          },
        );
        console.log("vizing mintResult", mintResult);
        // TODO: show pending toast
      } catch (error) {
        console.error("Mint VPass failed.", error);
      }
    } else {
      // mint request from other chain
      try {
        intervalIdRef.current = setInterval(async () => {
          const signatureRes = await getMintSigature({
            hash: preMintInfo.signHash,
          });
          if (signatureRes.signature) {
            clearInterval(intervalIdRef.current);
            crossChainMint(signatureRes.signature);
          }
        }, 1000);
      } catch (error) {
        console.error("Mint VPass failed.", error);
      }
    }
  };

  const handleMintVPass = () => {
    if (!selectedChain) {
      toast.info("Please select chain.");
      return;
    }
    if (selectedChain.id !== walletChainId) {
      // wallet chain is not matching, change chain
      switchChain({
        chainId: selectedChain.id,
      });
      mintVPass();
    } else {
      mintVPass();
    }
  };

  const getSBTContractAddressShortcut = () => {
    const address = getCurrentEnvContract().sbt;
    const headLength = 16;
    const tailLength = 4;
    const head = address.slice(0, headLength);
    const tail = address.slice(address.length - tailLength, address.length);
    return `${head}...${tail}`;
  };

  const navigateToSBTContract = () => {
    const sbtContractAddress = getCurrentEnvContract().sbt;
    const explorerUrl = getCurrentEnvExternalUrls().explorer;
    window.open(`${explorerUrl}/address/${sbtContractAddress}`);
  };

  useEffect(() => {
    getCurrentEnvChainBalance();
  }, [getCurrentEnvChainBalance]);

  useEffect(() => {
    initUserLoginInfo();
    initUserMintInfo();
  }, [initUserLoginInfo, initUserMintInfo]);

  const isInvited =
    accountTravelInfo?.invitedCode && accountTravelInfo?.invitedCode !== emptyInvitedCode;

  return (
    <div className="w-full text-white">
      <h1 className="mb-[56px] text-white text-[48px] font-medium">V Pass</h1>
      <div className="flex flex-col p-[44px] border border-[1px] border-[rgba(255,255,255,0.12)] rounded-[24px] bg-[#232021]">
        <div className="flex justify-start mb-[40px] pl-[106px]">
          <Image
            className="h-[250px] w-[250px] mr-[97px]"
            src={ImgPassport}
            alt="boundless-travel-passport"
          />
          {isUserMint ? (
            <div className="flex flex-col pt-[56px]">
              <div className="flex mb-[40px] items-center text-[30px] font-[500]">
                VPass#{9876}
                <IconVizingWhite className="h-[24px] w-[29px] ml-[10px]" />
              </div>
              <p className="text-[20px] font-[500] mb-[7px]">
                The First Omni-Chain SBT on Vizing Ecosystem
              </p>
              <div className="flex text-[20px] font-[500] mb-[7px]">
                {getSBTContractAddressShortcut()}
                <IconLink
                  onClick={navigateToSBTContract}
                  className="h-[26px] w-[26px] ml-[4px] hover:cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="mb-[16px]">Select Networks</div>
              <div className="w-[290px] h-[94px] flex flex-wrap items-between justify-start pl-[13px] py-[9px] mb-[19px] rounded-[12px] bg-[rgba(145,114,120,0.24)]">
                {chainList &&
                  chainList.map((chain) => {
                    return (
                      <div
                        className={clsx(
                          "relative mr-[14px] mb-[14px] rounded-full border-[1px] border-transparent hover:cursor-pointer duration-300",
                          selectedChain?.id === chain.id ? styles.selectedChain : "",
                          chain.balance && chain.balance > BigInt(0) ? styles.chainWithBalance : "",
                        )}
                        key={chain.id}
                        onClick={() => handleSelectChain(chain)}
                      >
                        <div
                          className={clsx(
                            "absolute top-0 left-0 h-full w-full rounded-full",
                            chain.balance && chain.balance > BigInt(0)
                              ? styles.chainWithBalance
                              : "",
                          )}
                        ></div>
                        <Image className="h-[30px] w-[30px]" src={chain.IconUrl} alt="chain-icon" />
                      </div>
                    );
                  })}
                {isChainListLoading && (
                  <div className="h-full w-full flex items-center justify-center text-[rgba(255,255,255,0.2)] text-[12px]">
                    Loading...
                  </div>
                )}
              </div>
              <div className="text-[16px] font-[400] mb-[10px]">
                <span className="text-white">Price：</span>
                <span className="text-[rgba(255,255,255,0.6)]">
                  {isInvited ? `0.0008 ETH` : "0.001 ETH"}
                </span>
              </div>
              <div
                onClick={handleMintVPass}
                className="relative h-[56px] w-[262px] flex justify-center items-center text-[20px] font-[700] text-white bg-[#FF486D] rounded-[12px]"
              >
                Mint
                {isInvited && (
                  <div className="absolute right-[6px] top-[6px] h-[44px] w-[44px] flex flex-col items-center justify-center rounded-[12px] text-[#FF486D] text-[14px] font-[600] bg-white">
                    <span>20%</span>
                    <span>OFF</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Share to Earn：For every successful referral that results in a mint, you will receive a
          rebate of 0.0005 ETH.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          The Passport SBT is a non-transferable NFT card pack that records all your travel traces
          in Vizing. It serves as a symbol of your status as an early participant.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Let&apos;s expand the Vizing ecosystem together by collecting commemorative stamps!
        </p>
      </div>
      <h1 className="mt-[88px] mb-[56px] text-white text-[48px] font-medium">Referral NFTs</h1>
      <div className="flex flex-col p-[44px] border border-[1px] border-[rgba(255,255,255,0.12)] rounded-[24px] bg-[#232021]">
        <div className="flex mb-[40px]">
          <Image className="h-[166px] w-[178px] mr-[54px]" src={ImgReferral} alt="referral-image" />
          <div className="flex flex-col">
            <div className="text-[16px] font-[400] mb-[10px] leading-[30px]">
              <span className="text-white">Amount：</span>
              <span className="text-[rgba(255,255,255,0.6)]">
                {(referralResult.data as ReferralData) &&
                  (referralResult.data as ReferralData).totalClaim}
              </span>
            </div>
            <div className="text-[16px] font-[400] mb-[34px] leading-[30px]">
              <span className="text-white">Successfully invited：</span>
              <span className="text-[rgba(255,255,255,0.6)]">
                {(referralResult.data as ReferralData) &&
                  (referralResult.data as ReferralData).totalReferral}
              </span>
              <span className="w-[75px] h-[40px] inline-flex items-center justify-center ml-[44px] border-[1px] border-[rgba(242,63,93,0.3)] text-[16px] font-[500] rounded-[12px] bg-[rgba(242,63,93,0.1)]">
                Claim
              </span>
            </div>
            <div className="flex">
              {/* <div className="relative h-[56px] flex justify-center items-center mr-[18px] text-[20px] font-[700] text-white bg-[#FF486D] rounded-[12px]">
                Share &gt;&gt;
                <div className="absolute right-[6px] top-[6px] h-[44px] w-[44px] flex flex-col items-center justify-center rounded-[12px] text-[#FF486D] text-[14px] font-[600] bg-white">
                  <span>Earn</span>
                  <span>50%</span>
                </div>
              </div> */}
              <div className="h-[56px] flex items-center justify-between pl-[10px] mr-[10px] rounded-[12px] bg-[rgba(255,72,109,0.5)]">
                <p className="w-[260px] truncate">{inviteLink}</p>
                <div
                  onClick={copyInviteLink}
                  className="h-[56px] w-[56px] flex items-center justify-center rounded-[12px] bg-[#FF486D] hover:cursor-pointer"
                >
                  <IconCopy onCick className="h-[30px] w-[30px] hover:cursor-pointer" />
                </div>
              </div>
              <a href={currentEnvExternalUrls.twitter} target="_blank" rel="noopener noreferrer">
                <div className="h-[56px] w-[56px] flex items-center justify-center mr-[10px] rounded-[12px] bg-[rgba(255,72,109,0.5)]">
                  <IconTwitterWhite className="h-[23px] w-[27px]" />
                </div>
              </a>
            </div>
          </div>
        </div>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Share your invite code or Twitter post with friends. When a friend successfully mints a
          passport and completes any Boundless Travel Renew task, they&apos;ll be considered a
          successfully activated referral. As the referrer, you&apos;ll earn a reward.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          For each successfully referred user, you&apos;ll receive an Invite Commemorative Stamp as
          a reward.
        </p>
      </div>
      <div className="flex flex-wrap justify-between mt-[20px]">
        {activityList.map((protocolActivity) => {
          return (
            <div
              className={clsx(
                "h-[186px] w-[calc(50%-10px)] mb-[20px] py-[34px] pl-[44px] bg-[#232021] border-[1px] border-white012 rounded-[24px]",
                styles.protocolActivityWrap,
              )}
              key={protocolActivity.protocolName}
            >
              {protocolActivity.protocolName}
              <div className="flex mt-[24px]">
                {protocolActivity.activityList.map((activity) => {
                  return (
                    <div className="mr-[14px]" key={activity.activityName}>
                      <Image
                        className="h-[70px] w-[70px]"
                        src={activity.activityIcon}
                        alt="activity-icon"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}