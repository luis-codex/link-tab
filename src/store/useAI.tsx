// import { createOpenAI as createGroq, OpenAIProvider } from '@ai-sdk/openai';
import {
  GoogleGenerativeAIProvider,
  createGoogleGenerativeAI,
} from '@ai-sdk/google';
import storageChromeLocal from '@app/utils/storage';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// AIzaSyAjudN-F8pqBOGrqke17JprkkReqJ-3Ni0 /* GOOGLE */
// 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
// AIzaSyDGO0BMUyeon1cmyfMnIdLdjNd2gIouo2Q

type State = {
  apiKey: string | null;
};

type Actions = {
  setApiKey: (apiKey: string) => void;
  getModel: () => GoogleGenerativeAIProvider | null;
};

export const useAI = create(
  persist<State & Actions>(
    (set, get) => ({
      apiKey: null,
      setApiKey: (apiKey) => set({ apiKey }),
      getModel: () => {
        const { apiKey } = get();
        if (!apiKey) {
          toast.warning('You need to set the api key');
          return null;
        }

        try {
          return createGoogleGenerativeAI({
            // baseURL: 'https://api.groq.com/openai/v1',
            apiKey: apiKey,
          });
        } catch (error) {
          toast.error('Error getting models, check the api key');
          return null;
        }
      },
    }),
    {
      name: 'ai',
      storage: storageChromeLocal<State & Actions>(),
    }
  )
);
