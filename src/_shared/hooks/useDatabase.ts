import { useState, useCallback } from "react";
import { TActionState, TFieldErrors } from "@/_shared/lib/createSafeAction";

type TAction<TInput, TOutput> = (data: TInput) => Promise<TActionState<TInput, TOutput>>;

type TUseActionOptions<TOutput> = {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
};

export function useDatabase<TInput, TOutput>(
  action: TAction<TInput, TOutput>,
  options: TUseActionOptions<TOutput> = {}
) {
  const [fieldErrors, setFieldErrors] = useState<TFieldErrors<TInput> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading
  };
}
