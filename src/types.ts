export type RootStackParamList = {
  Root: undefined;
  Quiz: {
    category?: number;
    type: 'category' | 'free' | 'vmt';
    limit?: number;
  };
  DirectorybyCategory:undefined;
};

export type BottomTabParamList = {
  Inicio: undefined;
  Contenido: undefined;
  Directorio: undefined;
  Escuelas: undefined;
};
