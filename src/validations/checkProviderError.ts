const checkProviderError = (data: any) => {
  if (!data) {
    throw new Error(
      'Must need to Create Style Sheet First or Please Follow the Documentation'
    );
  }
};

export default checkProviderError;
