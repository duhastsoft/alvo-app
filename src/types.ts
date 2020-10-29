export type RootStackParamList = {
  Root: undefined;
  Quiz: {
    category?: number;
    type: 'category' | 'free' | 'vmt';
    limit?: number;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Content: undefined;
  Directory: undefined;
  Schools: undefined;
};
