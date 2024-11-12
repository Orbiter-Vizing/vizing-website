"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ethers, JsonRpcProvider, ZeroAddress, Contract } from "ethers";
import { clsx } from "clsx";
import Image from "next/image";
import {
  useAccount,
  useReadContract,
  useChainId,
  useSwitchChain,
  useGasPrice,
  useBlockTransactionCount,
} from "wagmi";

import styles from "./style.module.css";
import { EnvMode, getCurrentEnvExternalUrls, TxStatus } from "@/utils/constant";
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
import {
  requestUserLoginInfo,
  getPreMintInfo,
  getMintSigature,
  bindAcccountAndVPass,
} from "@/api/boundlessTravel";
import { useContract, getCurrentEnvContract } from "@/hooks/i18n/client/useContract";
import { useEthersSigner } from "@/hooks/i18n/client/useEthersSigner";
import { useEnv } from "@/providers/envConfigProvider";
import LoadingSpin from "@/component/Loading";
import { useDialogComponent } from "@/component/Dialog";
import { useDialog } from "@/providers/dialogProvider";
import useGoogleEvent from "@/hooks/i18n/client/useGoogleEvent";
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
  const { sendGoogleEvent } = useGoogleEvent();
  const { currentEnvExternalUrls, vizingConfig, currentEnvChainConfig } = useEnv();
  const { initCotractVizingPassSBT, initCotractVizingLaunchPad } = useContract();
  const { chains, switchChain, switchChainAsync } = useSwitchChain();
  // const { showDialog } = useDialogComponent();
  const { showDialog, hideDialog } = useDialog();
  const [accountTravelInfo, setAccountTravelInfo] = useAtom(accountTravelInfoAtom);
  const [inviteLink, setInviteLink] = useState("");
  const [selectedChain, setSelectedChain] = useState<ChainConfig>();
  const [chainList, setChainList] = useState<ChainConfig[]>();
  const [isUserMint, setIsUserMint] = useState(false);
  const [isUserMintLoading, setIsUserMintLoading] = useState(true);
  const [vPassId, setVPassId] = useState<number>();
  const [isMinting, setIsMinting] = useState(false);
  const [showCongratsDialog, setShowCongratsDialog] = useState(false);
  const [isUserMintPending, setIsUserMintPending] = useState(false);
  const [hasClaimTask, setHasClaimTask] = useState(false);
  const congratsIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const vizingPassSBTaddress = getCurrentEnvContract().sbt;
  const { data: referralResult, refetch: refetchReferralResult } = useReadContract({
    abi: vizingPassSBTAbi,
    address: vizingPassSBTaddress as `0x${string}`,
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
      sendGoogleEvent({
        event: "copy-share",
        value: "",
      });
    } catch (err) {
      console.error("copy clipboard failed:", err);
    }
  };

  const handleSelectChain = (chain: ChainConfig) => {
    setSelectedChain(chain);
  };

  const intervalCheckUserMintInfo = useCallback(async () => {
    const userAddress = account.address;
    if (userAddress) {
      const accountLoginInfo = await requestUserLoginInfo({
        account: userAddress,
      });
      const vizingProvider = new JsonRpcProvider(vizingConfig.rpcUrl);
      const contractVPassSBT = await initCotractVizingPassSBT(vizingProvider);
      const isUserMint = await contractVPassSBT.getIfAlreadyMint(userAddress);
      if (typeof accountLoginInfo.vPassHash === "string" && isUserMint) {
        // vPass nft has been generated
        const vPassId = await contractVPassSBT.getPersonalTokenSoulId(userAddress);
        setVPassId(vPassId);
        clearInterval(congratsIntervalRef.current);
        setAccountTravelInfo(accountLoginInfo);
        setIsUserMint(true);
        setShowCongratsDialog(true);
      }
    }
  }, [account.address, setAccountTravelInfo, initCotractVizingPassSBT, vizingConfig]);

  const initUserLoginInfo = useCallback(async () => {
    const userAddress = account.address;
    if (userAddress) {
      const accountLoginInfo = await requestUserLoginInfo({
        account: userAddress,
      });
      const vizingProvider = new JsonRpcProvider(vizingConfig.rpcUrl);
      const contractVPassSBT = await initCotractVizingPassSBT(vizingProvider);
      const isUserMint = await contractVPassSBT.getIfAlreadyMint(userAddress);
      setIsUserMint(isUserMint);
      setIsUserMintLoading(false);
      if (typeof accountLoginInfo.vPassHash === "string" && !isUserMint) {
        // mint request is pending
        setIsUserMintPending(true);
        if (!congratsIntervalRef.current) {
          congratsIntervalRef.current = setInterval(() => {
            intervalCheckUserMintInfo();
          }, 15000);
        }
      }
      setAccountTravelInfo(accountLoginInfo);
      const inviteLink = `${currentEnvExternalUrls.homepage}/boundless-travel?inviteCode=${accountLoginInfo.code}`;
      setInviteLink(inviteLink);
    }
  }, [
    vizingConfig,
    account.address,
    setAccountTravelInfo,
    currentEnvExternalUrls,
    intervalCheckUserMintInfo,
    initCotractVizingPassSBT,
  ]);

  const initChainList = useCallback(async () => {
    const currentEnvChainList = getCurrentEnvChainConfig();
    setChainList(currentEnvChainList);
    // The following: get chain list with balance
    // const userAddress = account.address;
    // if (userAddress) {
    //   const currentEnvChainList = getCurrentEnvChainConfig();

    //   const chainListWithBalance = await Promise.all(
    //     currentEnvChainList.map(async (chain) => {
    //       const provider = new JsonRpcProvider(chain.rpcUrl);
    //       const balance = await provider.getBalance(userAddress);
    //       return {
    //         ...chain,
    //         balance,
    //       };
    //     }),
    //   );
    //   setChainList(chainListWithBalance);
    //   setIsChainListLoading(false);
    // }
  }, []);

  const renderDialogLevel2Content = useCallback(() => {
    return (
      <div className="relative h-[378px] w-[618px] p-[44px] bg-[#232021] rounded-[24px] overflow-hidden">
        <SvgDialogBgPattern className="absolute z-1 top-[-500px] left-[-500px]" />
        <div className="relative z-2">
          <div className="flex flex-col mb-[70px] text-[36px] font-[500] text-center leading-[44px]">
            <p>Congratulations on</p>
            <p>successfully sharing your</p>
            <p>invitation code!</p>
          </div>
          <div
            onClick={() => {
              hideDialog();
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
      showDialog({
        content: renderDialogLevel2Content(),
        isShowClose: true,
      });
      const twitterLink = currentEnvExternalUrls.twitter;
      window.open(twitterLink);
    };

    return (
      <div className="relative flex items-center justify-center w-[618px] p-[44px] bg-[#232021] rounded-[24px] overflow-hidden">
        <SvgDialogBgPattern className="absolute z-1 top-[-500px] left-[-500px]" />
        <div className="relative z-2">
          <div className="flex flex-col text-[36px] mt-[42px] mb-[42px] font-[500] leading-[44px] text-center">
            <p>Congratulations on</p>
            <p>obtaining your V Pass!</p>
          </div>
          {/* hide button temporary */}
          {/* <div
            onClick={() => {
              hideDialog();
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
          </div> */}
        </div>
      </div>
    );
  }, [hideDialog, currentEnvExternalUrls, showDialog, renderDialogLevel2Content]);

  const checkIsUserBalanceEnough = useCallback(
    async (userAddress: string, mintPrice: bigint, fee: bigint = BigInt(0)) => {
      const currentChainConfig = currentEnvChainConfig.find((chain) => {
        return chain.id === walletChainId;
      });
      if (!currentChainConfig) {
        toast.info("Chain not supported.");
        setIsMinting(false);
        return false;
      }
      const provider = new JsonRpcProvider(currentChainConfig.rpcUrl);
      const balance = await provider.getBalance(userAddress);
      const leastBalannce = mintPrice + fee;
      if (leastBalannce > balance) {
        toast.info("Insufficient funds. Please top up.");
        setIsMinting(false);
        return false;
      } else {
        return true;
      }
    },
    [currentEnvChainConfig, walletChainId],
  );

  // const getCurrentEnvChainBalance = useCallback(async () => {
  //   const userAddress = account.address;
  //   if (userAddress) {
  //     const currentEnvChainList = getCurrentEnvChainConfig();

  //     const chainListWithBalance = await Promise.all(
  //       currentEnvChainList.map(async (chain) => {
  //         const provider = new JsonRpcProvider(chain.rpcUrl);
  //         const balance = await provider.getBalance(userAddress);
  //         return {
  //           ...chain,
  //           balance,
  //         };
  //       }),
  //     );
  //     setChainList(chainListWithBalance);
  //     setIsChainListLoading(false);
  //   }
  // }, [account.address]);

  const handleMintSuccess = useCallback(
    async (transactionHash: string, chainId: string, chainName: string) => {
      const userAddress = account.address;
      if (!userAddress) {
        return;
      }

      const transactionHashParam = `${walletChainId}-${transactionHash}`;
      const bindRes = await bindAcccountAndVPass({
        account: userAddress,
        transactionHash: transactionHashParam,
      });
      if (bindRes.success) {
        setIsUserMintPending(true);
        if (!congratsIntervalRef.current) {
          congratsIntervalRef.current = setInterval(() => {
            intervalCheckUserMintInfo();
          }, 15000);
        }
        sendGoogleEvent({
          event: "Mint V Pass",
          value: {
            chainName,
            chainId,
          },
        });
      } else {
        toast.error("Network error, mint VPass failed.");
      }
    },
    [account.address, intervalCheckUserMintInfo, walletChainId, sendGoogleEvent],
  );

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
        const isUserBalanceEnough = await checkIsUserBalanceEnough(
          userAddress,
          mintPrice,
          getOmniMessageFee,
        );
        if (!isUserBalanceEnough) {
          return;
        }
        const getTotalETHAmount = getOmniMessageFee + mintPrice;
        const crossMintResult = await contractLauchPad.Launch(
          0,
          0,
          ZeroAddress,
          account.address,
          mintPrice,
          vizingConfig.id,
          ZEROBYTES,
          getEncodeData,
          { value: getTotalETHAmount },
        );
        const crossMintTx = await crossMintResult.wait();
        if (crossMintTx.status === TxStatus.SUCCESS) {
          handleMintSuccess(
            crossMintResult.hash,
            `${currentChainConfig.id}`,
            currentChainConfig.name,
          );
        } else {
          toast.error("NFT minting failed. Please try again later.");
          setIsMinting(false);
        }
        // TODO: show status toast after crossMint
      } catch (error) {
        console.error("cross chain mint error", error);
        setIsMinting(false);
      }
    },
    [
      account.address,
      currentEnvChainConfig,
      initCotractVizingPassSBT,
      signer,
      vizingConfig,
      walletChainId,
      checkIsUserBalanceEnough,
      handleMintSuccess,
    ],
  );

  const mintVPassOnVizing = useCallback(async () => {
    const userAddress = account.address;
    if (!userAddress || !signer) {
      return;
    }
    try {
      const preMintInfo = await getPreMintInfo({ account: userAddress });
      const contractVPassSBT = await initCotractVizingPassSBT(signer);
      const invitedCode = accountTravelInfo?.invitedCode || emptyInvitedCode;
      const inviterAddress = preMintInfo.invitedAccount;
      const mintPrice =
        invitedCode === emptyInvitedCode ? ethers.parseEther("0.001") : ethers.parseEther("0.0008");
      const isUserBalanceEnough = await checkIsUserBalanceEnough(userAddress, mintPrice);
      if (!isUserBalanceEnough) {
        return;
      }
      const mintResult = await contractVPassSBT.publicMint(
        preMintInfo.invitedCode,
        preMintInfo.code,
        inviterAddress,
        preMintInfo.metadataUri,
        {
          value: mintPrice,
        },
      );
      handleMintSuccess(mintResult.hash, `${vizingConfig.id}`, vizingConfig.name);
    } catch (error) {
      setIsMinting(false);
      console.error("Mint VPass failed.", error);
    }
  }, [
    account.address,
    accountTravelInfo,
    initCotractVizingPassSBT,
    signer,
    checkIsUserBalanceEnough,
    handleMintSuccess,
    vizingConfig,
  ]);

  const mintVPassNotOnVizing = useCallback(async () => {
    const userAddress = account.address;
    if (!userAddress || !signer) {
      return;
    }
    try {
      const preMintInfo = await getPreMintInfo({ account: userAddress });
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
        mintVPassOnVizing();
      } else {
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
      if (selectedChain.id !== account.chainId) {
        toast("Switch to the chain you selected.");
        switchChain({
          chainId: selectedChain.id,
        });
      } else {
        setIsMinting(true);
        mintVPass();
      }
    } catch (error) {
      console.error("click mint pass error", error);
      setIsMinting(false);
    }
  };

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

  const isClaimValid = useCallback(async () => {
    const userSBTInfo = await getUserSBTInfo();
    const totalClaim = userSBTInfo[4];
    const totalReferral = userSBTInfo[3];
    return totalClaim < totalReferral;
  }, [getUserSBTInfo]);

  const excuteClaimTask = useCallback(async () => {
    if (!signer) {
      return;
    }
    try {
      setHasClaimTask(false);
      const contractVPassSBT = await initCotractVizingPassSBT(signer);
      const referralResult = await contractVPassSBT.referralMint();
      const referralTx = await referralResult.wait();
      if (referralTx.status === TxStatus.SUCCESS) {
        toast.success(referralResult.hash, {
          position: "top-right",
        });
        refetchReferralResult();
        setHasClaimTask(false);
      }
    } catch (error) {
      setHasClaimTask(false);
      console.error("Excute claim failed", error);
    }
  }, [initCotractVizingPassSBT, signer, refetchReferralResult]);

  const handleClaim = useCallback(async () => {
    if (!signer) {
      return;
    }
    // check user has unclaimed token
    const isClaimAvailable = await isClaimValid();
    if (!isClaimAvailable) {
      toast.info("There is no token left to claim.");
      return;
    }
    if (account.chainId !== vizingConfig.id) {
      // await implement
      // const switchResult = await switchChainAsync({
      //   chainId: vizingConfig.id,
      // });
      // const contractVPassSBT = await initCotractVizingPassSBT(signer);
      // const referralResult = await contractVPassSBT.referralMint();
      // console.log("referralResult", referralResult);
      // toast.success(referralResult.hash, {
      //   position: "top-right",
      // });
      // refetchReferralResult();
      // then implement
      // switchChainAsync({
      //   chainId: vizingConfig.id,
      // }).then(async (res) => {
      //   console.log("switchCHainAsync res", res);
      //   const contractVPassSBT = await initCotractVizingPassSBT(signer);
      //   const referralResult = await contractVPassSBT.referralMint();
      //   console.log("referralResult", referralResult);
      //   toast.success(referralResult.hash, {
      //     position: "top-right",
      //   });
      //   refetchReferralResult();
      // });
      switchChain({
        chainId: vizingConfig.id,
      });
      setHasClaimTask(true);
    } else {
      // const contractVPassSBT = await initCotractVizingPassSBT(signer);
      // const referralResult = await contractVPassSBT.referralMint();
      // console.log("referralResult", referralResult);
      // toast.success(referralResult.hash, {
      //   position: "top-right",
      // });
      // refetchReferralResult();
      excuteClaimTask();
    }
  }, [account.chainId, isClaimValid, signer, vizingConfig, switchChain, excuteClaimTask]);

  const handleTweetClick = () => {
    const tweetContent = `🎉 I’ve joined Vizing’s Boundless Travel event and earned exclusive NFT rewards! Come join me and start earning your rewards now by clicking my invitation link! 🌐%0A${inviteLink}%0A%23Vizing %23NFT %23Crypto`;
    window.open(`https://twitter.com/intent/tweet?text=${tweetContent}`);
    sendGoogleEvent({
      event: "tw-share",
      value: "",
    });
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

  const scrollToReferral = () => {
    const targetElement = document.getElementById("referral_target");
    if (targetElement) {
      const offset = 100; // distance between targetElement and screen top
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    initUserLoginInfo();
    getUserVPassId();
    initChainList();
  }, [initUserLoginInfo, getUserVPassId, initChainList]);

  useEffect(() => {
    if (showCongratsDialog) {
      setShowCongratsDialog(false);
      showDialog({
        content: renderDialogLevel1Content(),
        isShowClose: true,
        onClose: () => {
          scrollToReferral();
        },
      });
    }
  }, [showCongratsDialog, showDialog, renderDialogLevel1Content]);

  useEffect(() => {
    // this effect is for cross chain claim
    // the reason is that cannot get the lastest signer after chain changing
    if (signer && hasClaimTask && account.chainId === vizingConfig.id) {
      excuteClaimTask();
    }
  }, [signer, hasClaimTask, excuteClaimTask, account.chainId, vizingConfig]);

  useEffect(() => {
    return () => {
      if (congratsIntervalRef.current) {
        clearInterval(congratsIntervalRef.current);
      }
    };
  }, []);

  const isInvited =
    accountTravelInfo?.invitedCode && accountTravelInfo?.invitedCode !== emptyInvitedCode;

  return (
    <div className="w-full text-white">
      <h1 className="mb-[56px] text-white text-[48px] font-medium">V Pass</h1>
      <div className="flex flex-col p-[44px] border border-[rgba(255,255,255,0.12)] rounded-[24px] bg-[#232021] overflow-hidden">
        <div className="relative flex justify-start mb-[40px] pl-[106px]">
          <SvgDialogBgPattern className="absolute z-1 top-[-600px] left-[-600px]" />
          <Image
            className="relative z-2 h-[250px] w-[250px] mr-[97px]"
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
                            )}
                            key={chain.id}
                            onClick={() => handleSelectChain(chain)}
                          >
                            <div
                              className={clsx("absolute top-0 left-0 h-full w-full rounded-full")}
                            ></div>
                            <Image
                              className="h-[30px] w-[30px]"
                              src={chain.IconUrl}
                              alt="chain-icon"
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="text-[16px] font-[400] mb-[10px]">
                    <span className="text-white">Price：</span>
                    <span className="text-[rgba(255,255,255,0.6)]">
                      {isInvited ? `0.0008 ETH` : "0.001 ETH"}
                    </span>
                  </div>
                  {isUserMintPending ? (
                    <div className="relative h-[56px] w-[290px] flex gap-2 justify-center items-center text-[20px] font-[700] text-white bg-[#FF486D] rounded-[12px] hover:cursor-not-allowed opacity-30">
                      Mint
                      <div className={clsx("iline-block scale-55")}>
                        <LoadingSpin />
                      </div>
                      {isInvited && (
                        <div className="absolute right-[6px] top-[6px] h-[44px] w-[44px] flex flex-col items-center justify-center rounded-[12px] text-[#FF486D] text-[14px] font-[600] bg-white">
                          <span>20%</span>
                          <span>OFF</span>
                        </div>
                      )}
                      <p className="absolute top-[100%] left-0 text-[12px] leading-[24px] text-[rgba(255,255,255,0.6)] font-[400]">
                        Minting takes approximately 4 minutes.
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={handleMintVPassClick}
                      className={clsx(
                        "relative h-[56px] w-[290px] flex gap-2 justify-center items-center text-[20px] font-[700] text-white bg-[#FF486D] rounded-[12px] hover:cursor-pointer",
                        isMinting ? styles.isMinting : "",
                      )}
                    >
                      Mint
                      {isMinting && (
                        <div className={clsx("iline-block scale-55")}>
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
                  )}
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
          The V Pass is a Omni-chain SBT NFT that records all your travel traces in Vizing. It
          serves as a symbol of your status as an early bird.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Let&apos;s expand the Vizing ecosystem together by collecting Boundless Travel NFTs!
        </p>
        <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Share to Earn：For every successful referral that results in a mint, you will receive a
          rebate of 0.0004 ETH.
        </p>
      </div>
      <h1 id="referral_target" className="mt-[88px] mb-[56px] text-white text-[48px] font-medium">
        Referral
      </h1>
      <div className="relative flex flex-col p-[44px] border border-[rgba(255,255,255,0.12)] rounded-[24px] bg-[#232021] overflow-hidden">
        <SvgDialogBgPattern className="absolute z-1 top-[-600px] left-[-600px]" />
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
                  className="h-[56px] w-[56px] mr-[10px] flex items-center justify-center rounded-[12px] bg-[#FF486D] hover:cursor-pointer"
                >
                  <IconCopy className="h-[30px] w-[30px] hover:cursor-pointer" />
                </div>
                <div className="h-[56px] w-[56px] flex flex-col items-center justify-center rounded-[12px] text-[#FF486D] text-[14px] font-[600] bg-white">
                  <span>Earn</span>
                  <span>50%</span>
                </div>
              </div>
              <div onClick={handleTweetClick}>
                <div className="h-[56px] w-[56px] flex items-center justify-center mr-[10px] rounded-[12px] bg-[rgba(255,72,109,0.5)] hover:cursor-pointer hover:bg-[rgb(242,63,93)] duration-200">
                  <IconTwitterWhite className="h-[23px] w-[27px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Share your invite code or Twitter post with your friends. Once your friend successfully
          mints a V Pass, it will be considered a successful referral. As the referrer, you will
          receive 50% profit sharing(0.0004E) and a Referral Token.
        </p>
      </div>
      {/* The following: Activity list hidde temporary */}
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
