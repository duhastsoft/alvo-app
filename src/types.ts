export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Root: undefined;
  Quiz: {
    category?: number;
    type: 'category' | 'free' | 'vmt';
    limit?: number;
  };
  Service: {
    id?: string;
    categoryName?: string;
  };
  Results: {
    score?: number;
    correctAnswers?: number;
    numberQuestions?: number;
  };
  Maps: {};
};

export type DirectoryStackParamList = {
  Directory: undefined;
  DirectorybyCategory: undefined;
  ServiceProfile: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Content: undefined;
  Directory: undefined;
  Schools: undefined;
};
