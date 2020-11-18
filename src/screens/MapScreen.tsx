import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import LatLon from '../helpers/LatLng.min.js';
const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 130;
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

let mapAnimation = new Animated.Value(0);
let mapIndex = 0;

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

  private mapRef = React.createRef<MapView>();
  private scrollRef = React.createRef<ScrollView>();

  // private interpolations:{ scale: any }[] = [];

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

    // this.interpolations = this.state.schools?.map((school, i) => {
    //   const inputRange = [(i - 1) * CARD_WIDTH, i * CARD_WIDTH, (i + 1) * CARD_WIDTH];

    //   const scale = mapAnimation.interpolate({
    //     inputRange,
    //     outputRange: [1, 2, 1],
    //     extrapolate: 'clamp',
    //   });

    //   return { scale };
    // });
  }

  componentDidUpdate() {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= this.state.schools!.length) {
        index = this.state.schools!.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      // clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { latitud, longitude } = this.state.schools![index];
          this.mapRef.current!.animateToRegion(
            {
              latitude: latitud,
              longitude: longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0222,
            },
            350
          );
        }
      }, 10);
    });
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

  onMarkerPress(mapEvtData: any) {
    const markerID = mapEvtData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    this.scrollRef.current!.scrollTo({ x: x, y: 0, animated: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={this.mapRef}
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
            />
          ) : null}
          {this.sortByDistance()?.map((school, index) => {
            const coords = { latitude: school.latitud, longitude: school.longitude };
            // const scaleStyle = {
            //   transform: [{ scale: this.interpolations![index].scale }],
            // };
            return (
              <Marker
                key={index}
                // style={scaleStyle as any}
                coordinate={coords}
                title={school.name}
                image={require('../assets/images/marker-school.png')}
                onPress={(e) => this.onMarkerPress(e)}
              />
            );
          })}
        </MapView>

        <Animated.ScrollView
          ref={this.scrollRef}
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
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          {this.sortByDistance()!.map((school, index) => {
            return (
              <View style={styles.card} key={index}>
                <Text style={styles.title}>{school.name}</Text>
                <Text>{school.description}</Text>
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
    height: Dimensions.get('window').height - 120,
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
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
