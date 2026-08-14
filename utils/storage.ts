import AsyncStorage from "@react-native-async-storage/async-storage";

const MISSION_PROGRESS_PREFIX =
  "@blinkmoney_mission_progress_";

export type StoredMissionProgress = {
  completedDays: number;
  growthPoints: number;
};

export function getMissionProgressKey(
  missionId: string
) {
  return `${MISSION_PROGRESS_PREFIX}${missionId}`;
}

export async function saveMissionProgress(
  missionId: string,
  progress: StoredMissionProgress
) {
  try {
    const key = getMissionProgressKey(missionId);

    await AsyncStorage.setItem(
      key,
      JSON.stringify(progress)
    );
  } catch (error) {
    console.error(
      "Failed to save mission progress:",
      error
    );
  }
}

export async function getMissionProgress(
  missionId: string
): Promise<StoredMissionProgress | null> {
  try {
    const key = getMissionProgressKey(missionId);

    const storedProgress =
      await AsyncStorage.getItem(key);

    if (!storedProgress) {
      return null;
    }

    return JSON.parse(storedProgress);
  } catch (error) {
    console.error(
      "Failed to load mission progress:",
      error
    );

    return null;
  }
}

export async function getTotalGrowthPoints(
  missionIds: string[]
): Promise<number> {
  try {
    const progressResults = await Promise.all(
      missionIds.map((missionId) =>
        getMissionProgress(missionId)
      )
    );

    return progressResults.reduce(
      (total, progress) =>
        total + (progress?.growthPoints ?? 0),
      0
    );
  } catch (error) {
    console.error(
      "Failed to calculate total growth points:",
      error
    );

    return 0;
  }
}