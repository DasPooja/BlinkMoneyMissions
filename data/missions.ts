import { Mission } from "@/types/mission";

export const missions: Mission[] = [
  {
    id: "starter-7",
    title: "7-Day Starter",
    description: "Save ₹21 every day and build your investing habit.",
    icon: "🔥",

    dailyAmount: 21,
    totalDays: 7,
    completedDays: 5,

    rewardPoints: 500,

    status: "active",
  },

  {
    id: "sprint-1000",
    title: "₹1,000 Sprint",
    description: "Build your savings habit and reach ₹1,000.",
    icon: "💰",

    dailyAmount: 100,
    totalDays: 10,
    completedDays: 0,

    rewardPoints: 1000,

    status: "available",
  },

  {
    id: "builder-30",
    title: "30-Day Builder",
    description: "Stay consistent for 30 days and build a stronger money habit.",
    icon: "🚀",

    dailyAmount: 50,
    totalDays: 30,
    completedDays: 0,

    rewardPoints: 3000,

    status: "available",
  },
];