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

interface HeaderData{	
  title: string,	
  data: ServiceItem[]
}

export default function DirectoryScroll(props: DirectoryScrollProps) {
  const [itemList, setitemList] = useState<HeaderData[]>([]);	
  const [didMount, setDidMount] = useState(false);  

  const createList = async () => {	
    let items: HeaderData[] = [];	
    props.list.forEach(element=>{	
        const letter = element.name.charAt(0).toUpperCase();	
        const result = items.find( item => item.title === letter);	
        const filterService : ServiceItem = element;
        if(result){	
          result.data.push(filterService);	
        }	
        else{	
          items.push({title: letter, data: [filterService]});	
        }	
    });	
    setitemList(items)	
};

  useEffect(() => {
    setDidMount(true);
    createList();
  }, [props.list]);

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

    <SectionList	          
          sections={itemList}	          
          renderItem={({ item }) => 	          
              <ServiceCategory
              key={item.id}
              icon={{name:'toolbox', type:'material-community',color:'gray'}}
              id={item.id}
              name={item.name}
              onPress={props.onPressItem}
            />
          }	
          renderSectionHeader={({ section }) => <Text	
            style={styles.sectionHeader}>{section.title}</Text>}	
          keyExtractor={(item, index) => item.name + index}	
      />	
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

