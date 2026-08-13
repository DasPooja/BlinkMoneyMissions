export type MissionStatus = "active" | "available" | "completed";

export type Mission = {
  id: string;
  title: string;
  description: string;
  icon: string;

  dailyAmount: number;
  totalDays: number;

  completedDays: number;

  rewardPoints: number;

  status: MissionStatus;
};