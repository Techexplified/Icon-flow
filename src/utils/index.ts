export const validateMessage = (event: MessageEvent) => {
    return typeof event.data === 'object' && event.data !== null;
};
