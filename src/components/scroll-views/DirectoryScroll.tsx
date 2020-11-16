import React, { useEffect, useState } from 'react';
import { ImageSourcePropType, ScrollView, StyleProp, ViewStyle, StyleSheet, View, SectionList, Text } from 'react-native';
import ServiceCategory from '../card/DirectoryCard';
import constants from '@/constants';
import {ServiceItem} from '@/constants/Directory'

export interface DirectoryScrollProps {
  style?: StyleProp<ViewStyle>;
  styleItems?: StyleProp<ViewStyle>;
  onPressItem: (index: string) => void;
  list: ServiceItem[];
  header: boolean;
}

export default function DirectoryScroll(props: DirectoryScrollProps) {
  const [didMount, setDidMount] = useState(false); 

  useEffect(() => {
    setDidMount(true);
  }, []);

  if (props.list.length < 1 || !didMount) {
    return (
      <View style={styles.container}>
        <ServiceCategory
          id={'0'}
          key={0}
          name={'CARGANDO...'}
          style={props.styleItems}
          icon={{name:'timer-sand', type:'material-community',color:'gray'}}
        />
      </View>
    );
  }
  return <View style={styles.container}>
    {props.list.map(element => 
        <ServiceCategory
          key={element.id}
          icon={{name:'toolbox', type:'material-community',color:'gray'}}
          id={element.id}
          name={element.name}
          onPress={props.onPressItem}
        />
      )
    }
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    backgroundColor:'white'
  },
  sectionHeader: {
    paddingVertical: 2,
    paddingHorizontal: 14,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: constants.colors.darkCyan,
  },
  itemS: {
    padding: 10,
    paddingHorizontal: 14,
    fontSize: 18,
    height: 44,
    borderBottomWidth: 0.2,
    borderBottomColor: '#cfd8dc',
  },
});

