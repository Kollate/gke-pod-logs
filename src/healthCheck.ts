const state = { isShutdown: false };

process.on("SIGTERM", () => {
  state.isShutdown = true;
});

export const healthCheck = async (): Promise<boolean> => {
  if (state.isShutdown) {
    return false;
  }
  return true;
};
