export type RootStackParamList = {
  Root: undefined;
  Quiz: {
    category?: number;
    type: 'category' | 'free' | 'vmt';
    limit?: number;
  };
  Service: {
    id?: string;
  };
};

export type DirectoryStackParamList = {
  Directory:undefined;
  DirectorybyCategory:undefined;
  ServiceProfile:undefined;
}

export type BottomTabParamList = {
  Home: undefined;
  Content: undefined;
  Directory: undefined;
  Schools: undefined;
};
