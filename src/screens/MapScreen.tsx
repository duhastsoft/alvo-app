import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import LatLon from '../helpers/LatLng.min.js';
import { FlatList } from 'react-native';

interface MapState {
  userLocation: {
    latitude: number;
    longitude: number;
    message?: string;
  };
  schools?: any[];
}

interface MapProps {
  navigation: StackNavigationProp<RootStackParamList, 'Maps'>;
}

/*Default location to Salvador del Mundo*/
const defaultLocation = {
  latitude: 13.7012919,
  longitude: -89.2247038,
};

export default class MapScreen extends Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      userLocation: {
        latitude: defaultLocation.latitude,
        longitude: defaultLocation.longitude,
      },
      schools: [
        {
          id: 2,
          name: 'Escuela Zacamil',
          description: 'El lugar de las gangas',
          latitud: 13.7348912,
          longitude: -89.2052879,
        },
        {
          id: 6,
          name: 'Escuela Metrocentro',
          description: 'El lugar de las gangas',
          latitud: 13.7096126,
          longitude: -89.2083248,
        },
        {
          id: 8,
          name: 'Escuela Bernal',
          description: 'Centro de formación para obtener carne de conducir',
          latitud: 13.7270032,
          longitude: -89.2146347,
        },
      ],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.log('AN ERROR HAPPENED');
        console.log(error.message);
      }
    );
  }

  sortByDistance() {
    const { latitude, longitude } = this.state.userLocation;
    const pos = new LatLon(latitude, longitude);
    return this.state.schools?.sort((a, b) => {
      let distA = pos.distanceTo(new LatLon(a.latitud, a.longitude));
      let distB = pos.distanceTo(new LatLon(b.latitud, b.longitude));

      return distA - distB;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: defaultLocation.latitude,
            longitude: defaultLocation.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
          region={{
            ...this.state.userLocation,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state ? (
            <Marker coordinate={this.state.userLocation} title={'Tu ubicación'} pinColor={'cyan'} />
          ) : null}
          {this.state.schools!.map((school, index) => {
            const coords = { latitude: school.latitud, longitude: school.longitude };
            return (
              <Marker key={index} coordinate={coords} title={school.name} pinColor={'green'} />
            );
          })}
        </MapView>
        <FlatList
          data={this.sortByDistance()}
          keyExtractor={(school) => school.id}
          renderItem={({ item }) => (
            <View style={styles.testview}>
              <Text>{`${item.name} - ${item.latitud}`}</Text>
            </View>
          )}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2 - 50,
  },
  testview: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#fff',
    elevation: 2,
    padding: 8,
    marginTop: 8,
  },
});
