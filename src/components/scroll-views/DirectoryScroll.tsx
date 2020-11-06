import React, { useEffect, useState } from 'react';
import { ImageSourcePropType, ScrollView, StyleProp, ViewStyle, StyleSheet, View, SectionList, Text } from 'react-native';
import LoadingIcon from '@/assets/images/sand-clock-1.png';
import ServiceCategory from '../card/DirectoryCard';
import constants from '@/constants';

interface DirectoryListItem {
  id: number;
  name: string;
}

interface FilterData{
  title: string,
  data: [{name: string, id: number}]
}

export interface DirectoryScrollProps {
  image: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  styleItems?: StyleProp<ViewStyle>;
  onPressItem: (index: number) => void;
  list: DirectoryListItem[];
  header: boolean;
}

export default function DirectoryScroll(props: DirectoryScrollProps) {
  const [itemList, setitemList] = useState<FilterData[]>([]);
  const [didMount, setDidMount] = useState(false); 

  const createList = async () => {
      let items: FilterData[] = [];
      props.list.forEach(element=>{
          const letter = element.name.charAt(0).toUpperCase();
          const result = items.find( item => item.title === letter);
          if(result){
            result.data.push({name: element.name, id: element.id});
          }
          else{
            items.push({title: letter, data: [{name: element.name, id: element.id}]});
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
          index={0}
          key={0}
          image={LoadingIcon}
          name={'CARGANDO...'}
          style={props.styleItems}
        />
      </View>
    );
  }
  if(props.header){
    return (
      <View style={styles.container}>
        <SectionList
          sections={itemList}
          renderItem={({ item }) => 
            <Text onPress={() => 
              props.onPressItem(item.id)
            } 
              style={styles.itemS}>{item.name}</Text>
          }
          renderSectionHeader={({ section }) => <Text
            style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => item.name + index}
        />
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <SectionList
          sections={itemList}
          renderItem={({ item }) => 
            <Text onPress={() => 
              props.onPressItem(item.id)
            } 
              style={styles.itemS}>{item.name}</Text>
          }
        />
      </View>
    );
  }
  
 
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

