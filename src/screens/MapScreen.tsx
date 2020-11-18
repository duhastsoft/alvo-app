import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, ScrollView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import LatLon from '../helpers/LatLng.min.js';
const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

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
            <Marker
              coordinate={this.state.userLocation}
              title={'Tu ubicación'}
              image={require('../assets/images/marker-user.png')}
              centerOffset={{ x: 0, y: 50 }}
            />
          ) : null}
          {this.state.schools!.map((school, index) => {
            const coords = { latitude: school.latitud, longitude: school.longitude };
            return (
              <Marker
                key={index}
                coordinate={coords}
                title={school.name}
                image={require('../assets/images/marker-school.png')}
              />
            );
          })}
        </MapView>

        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          pagingEnabled
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
        >
          {this.sortByDistance()!.map((school, index) => {
            return (
              <View style={styles.card} key={index}>
                <Text>{school.name}</Text>
              </View>
            );
          })}
        </Animated.ScrollView>
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
    height: Dimensions.get('window').height,
  },
  testview: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#fff',
    elevation: 2,
    padding: 8,
    marginTop: 8,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
});
