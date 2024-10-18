"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ethers, JsonRpcProvider, ZeroAddress, Contract } from "ethers";
import { clsx } from "clsx";
import Image from "next/image";
import {
  useBalance,
  useAccount,
  useReadContract,
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
import LoadingSpin from "@/component/Loading";
import { useDialogComponent } from "@/component/Dialog";
import { useDialog } from "@/providers/dialogProvider";
// atom
import { useAtom } from "jotai";
import {
  beInvitedAtom,
  accountTravelInfoAtom,
  emptyInvitedCode,
  encodeEmptyInvitedCode,
} from "@/atoms/accountAtom";
// assets
import ImgPassport from "@/assets/images/boundless-travel/nft-passport.png";
import ImgReferral from "@/assets/images/boundless-travel/referral.png";
import IconTwitterWhite from "@/assets/images/social-media/twitter-white.svg";
import IconCopy from "@/assets/images/icon/copy.svg";
import IconVizingWhite from "@/assets/images/boundless-travel/vizing-white.svg";
import IconLink from "@/assets/images/icon/link.svg";
import SvgDialogBgPattern from "@/assets/images/boundless-travel/dialog-bg-pattern.svg";
import { vizingLaunchPadAbi } from "@/abi/vizingLaunchPad";

interface ReferralData {
  totalClaim: number;
  totalReferral: number;
}

export default function VPass() {
  const account = useAccount();
  const walletChainId = useChainId();
  // const signer = useEthersSigner({
  //   chainId: walletChainId,
  // });
  const signer = useEthersSigner({
    chainId: walletChainId,
  });
  const { currentEnvChainConfig } = useEnv();
  const { currentEnvExternalUrls, vizingConfig } = useEnv();
  const { initCotractVizingPassSBT, initCotractVizingLaunchPad } = useContract();
  const { chains, switchChain, switchChainAsync } = useSwitchChain();
  // const { showDialog } = useDialogComponent();
  const { showDialog, hideDialog } = useDialog();
  const [accountTravelInfo, setAccountTravelInfo] = useAtom(accountTravelInfoAtom);
  const [inviteLink, setInviteLink] = useState("");
  const [selectedChain, setSelectedChain] = useState<ChainConfig>();
  const [chainList, setChainList] = useState<ChainConfig[]>();
  const [isChainListLoading, setIsChainListLoading] = useState(true);
  const [isUserMint, setIsUserMint] = useState(false);
  const [isUserMintLoading, setIsUserMintLoading] = useState(true);
  const [vPassId, setVPassId] = useState<number>();
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isMinting, setIsMinting] = useState(false);
  const [isMinting2, setIsMinting2] = useState(false);
  const messageTaskRef = useRef(false);

  const { data: referralResult, refetch: refetchReferralResult } = useReadContract({
    abi: vizingPassSBTAbi,
    address: "0x23f5e5bc8733562129fD5978dCA91485c9F91b8a",
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
      console.log("copy inviteLink", inviteLink);
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
      setIsUserMintLoading(false);
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

  const renderDialogLevel2Content = useCallback(() => {
    return (
      <div className="relative h-[378px] w-[618px] p-[44px] bg-[#232021] rounded-[24px] overflow-hidden">
        <SvgDialogBgPattern className="absolute z-1 top-[-500px] left-[-500px]" />
        <div className="relative z-2">
          <div className="flex flex-col mb-[70px] text-[36px] font-[500] text-center leading-[44px] text-center">
            <p>Congratulations on</p>
            <p>successfully sharing your</p>
            <p>invitation code!</p>
          </div>
          <div
            onClick={() => {
              hideDialog();
              initUserMintInfo();
            }}
            className="flex justify-center items-center h-[56px] mb-[20px] rounded-[12px] text-[20px] text-white font-[700] bg-[#FF486D] hover:cursor-pointer"
          >
            Start collecting your badges to earn rewards! &gt;
          </div>
        </div>
      </div>
    );
  }, [hideDialog]);

  // const currentChainGasPrice = useGasPrice();
  const renderDialogLevel1Content = useCallback(() => {
    const handleDialogShareClick = () => {
      hideDialog();
      showDialog(renderDialogLevel2Content());
      const twitterLink = currentEnvExternalUrls.twitter;
      // copy invite link
      window.open(twitterLink);
    };

    return (
      <div className="relative h-[378px] w-[618px] p-[44px] bg-[#232021] rounded-[24px] overflow-hidden">
        <SvgDialogBgPattern className="absolute z-1 top-[-500px] left-[-500px]" />
        <div className="relative z-2">
          <div className="flex flex-col mb-[70px] text-[36px] font-[500] text-center leading-[44px] text-center">
            <p>Congratulations on</p>
            <p>obtaining your V Pass!</p>
          </div>
          <div
            onClick={() => {
              hideDialog();
              initUserMintInfo();
            }}
            className="flex justify-center items-center h-[56px] mb-[20px] rounded-[12px] text-[20px] text-black font-[700] bg-white hover:cursor-pointer"
          >
            Start collecting your badges now! &gt;
          </div>
          <div
            onClick={handleDialogShareClick}
            className="flex justify-center items-center h-[56px] mb-[20px] rounded-[12px] text-[20px] text-white font-[700] bg-[#FF486D] hover:cursor-pointer"
          >
            Share to earn minting fee rewards! &gt;
          </div>
        </div>
      </div>
    );
  }, [hideDialog, currentEnvExternalUrls, showDialog, renderDialogLevel2Content]);

  const crossChainMint = useCallback(
    async (signature: string) => {
      try {
        const userAddress = account.address;
        if (!userAddress || !signer) {
          throw Error("Signer or user address is needed.");
          return;
        }
        const preMintInfo = await getPreMintInfo({ account: userAddress });
        const mintPrice =
          preMintInfo.invitedCode === encodeEmptyInvitedCode
            ? ethers.parseEther("0.001")
            : ethers.parseEther("0.0008");
        console.log("find chain config", walletChainId);
        const currentChainConfig = currentEnvChainConfig.find((chain) => {
          return chain.id === walletChainId;
        });
        if (!currentChainConfig) {
          throw Error("Chain selected is not supported.");
          return;
        }
        const contractLauchPad = new Contract(
          currentChainConfig.contracts.vizingPad,
          vizingLaunchPadAbi,
          signer,
        );
        const vizingProvider = new JsonRpcProvider(vizingConfig.rpcUrl);
        const contractVPassSBT = await initCotractVizingPassSBT(vizingProvider);
        const vizingPassSBTContractAddress = getCurrentEnvContract().sbt;
        const ZEROBYTES = "0x";
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
        showDialog(renderDialogLevel1Content());
        // TODO: show status toast after crossMint
        setIsMinting(false);
      } catch (error) {
        console.error("cross chain mint error", error);
        setIsMinting(false);
      }
    },
    [
      account.address,
      currentEnvChainConfig,
      initCotractVizingPassSBT,
      showDialog,
      signer,
      renderDialogLevel1Content,
      vizingConfig,
    ],
  );

  const mintVPassOnVizing = useCallback(async () => {
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
      // TODO: show pending toast
      showDialog(renderDialogLevel1Content());
    } catch (error) {
      console.error("Mint VPass failed.", error);
    }
    // setIsMinting(false);
  }, [
    account.address,
    accountTravelInfo,
    initCotractVizingPassSBT,
    renderDialogLevel1Content,
    showDialog,
    signer,
  ]);

  const mintVPassNotOnVizing = useCallback(async () => {
    const userAddress = account.address;
    if (!userAddress || !signer) {
      return;
    }
    try {
      const preMintInfo = await getPreMintInfo({ account: userAddress });
      console.log("mintVPassNotOnVizing preMintInfo", preMintInfo);
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
      console.error("mint pass not on vizing error", error);
      setIsMinting(false);
    }
  }, [account.address, crossChainMint, signer]);

  const mintVPass = () => {
    try {
      if (account.chainId === vizingConfig.id) {
        console.log("mint on vizing");
        mintVPassOnVizing();
      } else {
        console.log("mint not on vizing");
        mintVPassNotOnVizing();
      }
    } catch (error) {
      console.error("mintVpass error", error);
      setIsMinting(false);
    }
  };

  const handleMintVPassClick = async () => {
    try {
      if (isMinting) {
        return;
      }
      if (!selectedChain) {
        toast.info("Please select chain.");
        return;
      }
      // setIsMinting2(true);
      console.log("after set isMinting", isMinting);
      if (selectedChain.id !== account.chainId) {
        toast("Switch to the chain you selected.");
        switchChain(
          {
            chainId: selectedChain.id,
          },
          // {
          //   onSuccess: () => {
          //     console.log("switch chain success");
          //     mintVPass();
          //   },
          //   onError: (switchError) => {
          //     console.log("switch error", switchError);
          //     setIsMinting(false);
          //   },
          // },
        );
      } else {
        setIsMinting(true);
        mintVPass();
      }
    } catch (error) {
      console.error("click mint pass error", error);
      setIsMinting(false);
    }
  };

  // const handleMintVPass = async () => {
  //   if (isMinting) {
  //     return;
  //   }
  //   if (!selectedChain) {
  //     toast.info("Please select chain.");
  //     return;
  //   }
  //   setIsMinting(true);
  //   let fromChainId = walletChainId;
  //   try {
  //     if (selectedChain.id !== walletChainId) {
  //       // wallet chain is not matching, change chain
  //       // switch chain async
  //       // const switchResult = await switchChainAsync({
  //       //   chainId: selectedChain.id,
  //       // });
  //       switchChain({
  //         chainId: selectedChain.id,
  //       });
  //       messageTaskRef.current = true;
  //     } else {
  //       if (fromChainId === vizingConfig.id) {
  //         mintVPassOnVizing();
  //       } else {
  //         mintVPassNotOnVizing(fromChainId);
  //       }
  //     }
  //   } catch (error) {
  //     setIsMinting(false);
  //   }
  // };

  const getUserSBTInfo = useCallback(async () => {
    const userAddress = account.address;
    if (!userAddress) {
      return false;
    }
    const vizingProvider = new JsonRpcProvider(vizingConfig.rpcUrl);
    const contractVPassSBT = await initCotractVizingPassSBT(vizingProvider);
    const userSBTInfo = await contractVPassSBT.getUserInfo(userAddress);
    return userSBTInfo;
  }, [account, vizingConfig, initCotractVizingPassSBT]);

  const isClaimValid = async () => {
    const userSBTInfo = await getUserSBTInfo();
    const totalClaim = userSBTInfo[4];
    const totalReferral = userSBTInfo[3];
    return totalClaim < totalReferral;
  };

  const handleClaim = async () => {
    if (!signer) {
      return;
    }
    // check user has unclaimed token
    const isClaimAvailable = await isClaimValid();
    if (!isClaimAvailable) {
      toast.info("There is no token left to claim.");
      return;
    }
    if (walletChainId !== vizingConfig.id) {
      // wallet chain is not matching, change chain
      const switchResult = await switchChainAsync({
        chainId: vizingConfig.id,
      });
      const contractVPassSBT = await initCotractVizingPassSBT(signer);
      const referralResult = await contractVPassSBT.referralMint();
      toast.success("Claim successfully!");
      refetchReferralResult();
    } else {
      const contractVPassSBT = await initCotractVizingPassSBT(signer);
      const referralResult = await contractVPassSBT.referralMint();
      toast.success("Claim successfully!");
      refetchReferralResult();
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

  const getUserVPassId = useCallback(async () => {
    const userAddress = account.address;
    if (!userAddress) {
      return;
    }
    const vizingProvider = new JsonRpcProvider(vizingConfig.rpcUrl);
    const contractVPassSBT = await initCotractVizingPassSBT(vizingProvider);
    const vPassId = await contractVPassSBT.getPersonalTokenSoulId(userAddress);
    setVPassId(vPassId);
  }, [account.address, initCotractVizingPassSBT, vizingConfig]);

  const navigateToSBTContract = () => {
    const sbtContractAddress = getCurrentEnvContract().sbt;
    const explorerUrl = getCurrentEnvExternalUrls().explorer;
    window.open(`${explorerUrl}/address/${sbtContractAddress}`);
  };

  useEffect(() => {
    initUserLoginInfo();
    initUserMintInfo();
    getCurrentEnvChainBalance();
    getUserVPassId();
  }, [initUserLoginInfo, initUserMintInfo, getCurrentEnvChainBalance, getUserVPassId]);

  // useEffect(() => {
  //   // console.log("signer change effectd", signer);
  //   if (signer && isMinting) {
  //     try {
  //       if (walletChainId === vizingConfig.id) {
  //         mintVPassOnVizing();
  //       } else {
  //         mintVPassNotOnVizing(walletChainId);
  //       }
  //     } catch (error) {
  //       console.error("signer effect error", error);
  //     }
  //   }
  // }, [signer, mintVPassNotOnVizing, mintVPassOnVizing, vizingConfig, walletChainId, isMinting]);

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
          {!isUserMintLoading ? (
            <div>
              {isUserMint ? (
                <div className="flex flex-col pt-[56px]">
                  <div className="flex mb-[40px] items-center text-[30px] font-[500]">
                    VPass#{vPassId?.toString()}
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
                              chain.balance && chain.balance > BigInt(0)
                                ? styles.chainWithBalance
                                : "",
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
                            <Image
                              className="h-[30px] w-[30px]"
                              src={chain.IconUrl}
                              alt="chain-icon"
                            />
                          </div>
                        );
                      })}
                    {isChainListLoading && (
                      <div className="h-full w-full flex items-center justify-center text-[rgba(255,255,255,0.2)] text-[12px]">
                        <LoadingSpin />
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
                    onClick={handleMintVPassClick}
                    className={clsx(
                      "relative h-[56px] w-[262px] flex justify-center items-center text-[20px] font-[700] text-white bg-[#FF486D] rounded-[12px] hover:cursor-pointer",
                      isMinting ? styles.isMinting : "",
                    )}
                  >
                    Mint
                    {isMinting && (
                      <div
                        className={clsx(
                          "absolute top-[50%] translate-y-[-50%] right-[70px] iline-block scale-55",
                        )}
                      >
                        <LoadingSpin />
                      </div>
                    )}
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
          ) : (
            <div className="flex flex-1 justify-center items-center">
              <LoadingSpin />
            </div>
          )}
        </div>

        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Share to Earn：For every successful referral that results in a mint, you will receive a
          rebate of 0.0004 ETH.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          The V Pass is a Omni-chain SBT NFT that records all your travel traces in Vizing. It
          serves as a symbol of your status as an early bird.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Let&apos;s expand the Vizing ecosystem together by collecting Boundless Travel NFTs!
        </p>
      </div>
      <h1 className="mt-[88px] mb-[56px] text-white text-[48px] font-medium">Referral NFT</h1>
      <div className="flex flex-col p-[44px] border border-[1px] border-[rgba(255,255,255,0.12)] rounded-[24px] bg-[#232021]">
        <div className="flex mb-[40px]">
          <Image className="h-[166px] w-[178px] mr-[54px]" src={ImgReferral} alt="referral-image" />
          <div className="flex flex-col">
            <div className="text-[16px] font-[400] mb-[10px] leading-[30px]">
              <span className="text-white">Amount：</span>
              <span className="text-[rgba(255,255,255,0.6)]">
                {(referralResult as ReferralData) && (referralResult as ReferralData).totalClaim}
              </span>
            </div>
            <div className="text-[16px] font-[400] mb-[34px] leading-[30px]">
              <span className="text-white">Successfully invited：</span>
              <span className="text-[rgba(255,255,255,0.6)]">
                {(referralResult as ReferralData) && (referralResult as ReferralData).totalReferral}
              </span>
              <span
                onClick={handleClaim}
                className="w-[75px] h-[40px] inline-flex items-center justify-center ml-[44px] border-[1px] border-[rgba(242,63,93,0.3)] text-[16px] font-[500] rounded-[12px] bg-[rgba(242,63,93,0.1)] hover:cursor-pointer hover:bg-[rgb(242,63,93)] duration-200"
              >
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
                  <IconCopy className="h-[30px] w-[30px] hover:cursor-pointer" />
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
          Share your invite code or Twitter post with your friends. Once your friend successfully
          mints a V Pass, it will be considered a successful referral. As the referrer, you will
          receive 50% profit sharing(0.0005E) and a Referral Token.
        </p>
      </div>
      {/* <div className="flex flex-wrap justify-between mt-[20px]">
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
      </div> */}
    </div>
  );
}
