import { StaticImageData } from "next/image";

// assets
import ImgActivity1 from "@/assets/images/protocol-activity/activity-1.png";
import ImgActivity2 from "@/assets/images/protocol-activity/activity-2.png";
import ImgActivity3 from "@/assets/images/protocol-activity/activity-3.png";

interface ProtocolActivityList {
  protocolName: string;
  activityList: ActivityItem[];
}

interface ActivityItem {
  activityName: string;
  activityIcon: StaticImageData;
  activityLink: string;
}

export const activityList: ProtocolActivityList[] = [
  {
    protocolName: "Likwid",
    activityList: [
      {
        activityName: "Likwid-1",
        activityIcon: ImgActivity1,
        activityLink: "https://x.com/Vizing_L2",
      },
      {
        activityName: "Likwid-2",
        activityIcon: ImgActivity2,
        activityLink: "https://x.com/Vizing_L2",
      },
      {
        activityName: "Likwid-3",
        activityIcon: ImgActivity3,
        activityLink: "https://x.com/Vizing_L2",
      },
      {
        activityName: "Likwid-4",
        activityIcon: ImgActivity3,
        activityLink: "https://x.com/Vizing_L2",
      },
      {
        activityName: "Likwid-5",
        activityIcon: ImgActivity3,
        activityLink: "https://x.com/Vizing_L2",
      },
    ],
  },
  {
    protocolName: "Xmint",
    activityList: [
      {
        activityName: "Xmint-1",
        activityIcon: ImgActivity1,
        activityLink: "https://x.com/Vizing_L2",
      },
      {
        activityName: "Xmint-2",
        activityIcon: ImgActivity2,
        activityLink: "https://x.com/Vizing_L2",
      },
      {
        activityName: "Xmint-3",
        activityIcon: ImgActivity3,
        activityLink: "https://x.com/Vizing_L2",
      },
    ],
  },
  {
    protocolName: "Color Protocol",
    activityList: [
      {
        activityName: "Color Protocol-1",
        activityIcon: ImgActivity2,
        activityLink: "https://x.com/Vizing_L2",
      },
    ],
  },
  {
    protocolName: "0xAstra",
    activityList: [
      {
        activityName: "0xAstra-1",
        activityIcon: ImgActivity2,
        activityLink: "https://x.com/Vizing_L2",
      },
    ],
  },
  {
    protocolName: "Pink",
    activityList: [
      {
        activityName: "Pink-1",
        activityIcon: ImgActivity3,
        activityLink: "https://x.com/Vizing_L2",
      },
    ],
  },
  {
    protocolName: "Xenobunny",
    activityList: [
      {
        activityName: "Xenobunny-1",
        activityIcon: ImgActivity3,
        activityLink: "https://x.com/Vizing_L2",
      },
    ],
  },
];
