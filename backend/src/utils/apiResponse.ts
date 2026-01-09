export const successResponse = (message: string, data?: unknown) => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message: string, error?: unknown) =>{
    return {
        success: false,
        message,
        error,
    };
};