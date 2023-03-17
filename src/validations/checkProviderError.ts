const checkProviderError = (data: any) => {
  if (!data) {
    throw new Error(
      'Must need to Wrap you App in "Provider" from react-native-restyleSheet or Please Follow the Documentation'
    );
  }
};

export default checkProviderError;
