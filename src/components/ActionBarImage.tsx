import React from 'react';

import { View, Image } from 'react-native';
import Alvo from '@/assets/splash.png';

const ActionBarImage = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={Alvo}
        style={{
          width: 90,
          height: 40,
          //borderRadius: 40 / 2,
          //marginHorizontal: 2,
          paddingHorizontal:2
        }}
      />
    </View>
  );
};

export default ActionBarImage;
