// User imports

import settings from "../../config/settings.ts";

const retry = async <T = any>(
    operation: () => Promise<T>,
    retries: number = settings.RETRY.COUNT,
    interval: number = settings.RETRY.INTERVAL,
    maxInterval: number = settings.RETRY.MAX_INTERVAL,
    retryOperation?: () => any
): Promise<T> => {
    try {
        return await operation();
    } catch (err) {
        if (retries === 1) throw err;

        // Operation to be executed before retrial
        await retryOperation?.();

        // Waiting for interval before retrying
        await new Promise((resolve, reject) => setTimeout(resolve, interval));

        // Calculating back off delay
        const backOffDelay = Math.min(interval * 2, maxInterval);

        return retry(operation, retries - 1, backOffDelay, maxInterval, retryOperation);
    }
};

export default retry;
