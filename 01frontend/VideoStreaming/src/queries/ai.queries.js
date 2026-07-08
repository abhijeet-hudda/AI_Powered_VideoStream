import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import * as aiApi from "../api/ai.api.js";

export const useAskAI = () => {

    return useMutation({

        mutationFn: aiApi.askAI,

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to get AI response"
            );
        },

    });

};

export const useProcessAI = () => {

    return useMutation({

        mutationFn: aiApi.processAI,

        onSuccess: () => {
            toast.success("AI processing started.");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to process video."
            );
        },

    });

};