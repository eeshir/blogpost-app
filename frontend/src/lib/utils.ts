import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/blogs",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "Profile",
  },
  // {
  //   imgURL: "/icons/transaction.svg",
  //   route: "/transaction-history",
  //   label: "Transaction History",
  // },
  // {
  //   imgURL: "/icons/money-send.svg",
  //   route: "/payment-transfer",
  //   label: "Transfer Funds",
  // },
];