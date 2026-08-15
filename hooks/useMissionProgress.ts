import { useFocusEffect } from "expo-router";
import {
  useCallback,
  useState,
} from "react";

import {
  getMissionProgress,
  saveMissionProgress,
  StoredMissionProgress,
} from "@/utils/storage";

const DEFAULT_PROGRESS: StoredMissionProgress = {
  completedDays: 0,
  growthPoints: 0,
};

export function useMissionProgress(
  missionId: string,
  totalDays: number
) {
  const [progress, setProgress] =
    useState<StoredMissionProgress>(
      DEFAULT_PROGRESS
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const loadProgress = useCallback(async () => {
    setIsLoading(true);

    const savedProgress =
      await getMissionProgress(missionId);

    if (savedProgress) {
      setProgress(savedProgress);
    } else {
      setProgress(DEFAULT_PROGRESS);
    }

    setIsLoading(false);
  }, [missionId]);

  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [loadProgress])
  );

  const completeDay = async () => {
    if (progress.completedDays >= totalDays) {
      return;
    }

    const nextProgress: StoredMissionProgress = {
      completedDays:
        progress.completedDays + 1,

      growthPoints:
        progress.growthPoints + 100,
    };

    setProgress(nextProgress);

    await saveMissionProgress(
      missionId,
      nextProgress
    );
  };

  return {
    progress,
    isLoading,
    completeDay,
    refreshProgress: loadProgress,
  };
}