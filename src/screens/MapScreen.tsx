import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LoadingComponent from '@/components/LoadingComponent';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import LatLon from '../helpers/LatLng.min.js';

import constants from '@/constants';
import Axios from 'axios';
const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 150;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

interface MapState {
  userLocation: {
    latitude: number;
    longitude: number;
    message?: string;
  };
  schools?: any[];
  isLoading?: boolean;
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
      isLoading: true,
      schools: [],
    };
  }

  private mapRef = React.createRef<MapView>();
  private scrollRef = React.createRef<ScrollView>();
  private regionTimeout: number = 0;

  loadSchools() {
    const fetchData = async () => {
      try {
        const request = '/service-category/3';
        const result = await Axios.get(request);
        const schools = result.data.data.services;
        this.setState({ schools });

        this.getUserPosition();
      } catch (err) {
        console.log(err);
        this.setState({ isLoading: false });
      }
    };
    fetchData();
  }

  getUserPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          isLoading: false,
        });
      },
      (error) => {
        console.log('AN ERROR HAPPENED');
        console.log(error.message);
        this.setState({ isLoading: false });
      }
    );
  }

  componentDidMount() {
    this.loadSchools();
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

      // if (this.regionTimeout) clearTimeout(this.regionTimeout);

      this.regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { latitud, longitude } = this.state.schools![index];
          console.log(this.mapRef.current);
          this.mapRef.current?.animateToRegion(
            {
              latitude: latitud,
              longitude: longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0222,
            },
            350
          );
        }
      }, 1);

      // clearTimeout(regionTimeout);
    });
  }

  sortByDistance() {
    if (this.state.schools!.length <= 0) return [];
    const { latitude, longitude } = this.state.userLocation;
    const pos = new LatLon(latitude, longitude);
    return this.state.schools?.sort((a, b) => {
      let distA = pos.distanceTo(new LatLon(parseFloat(a.latitud), parseFloat(a.longitude)));
      let distB = pos.distanceTo(new LatLon(parseFloat(b.latitud), parseFloat(b.longitude)));

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

  selectService(target: number): void {
    this.props.navigation.dangerouslyGetParent()?.navigate('Service', {
      id: target,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent text={'Preparando mapa'} />;
    } else
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
              const coords = {
                latitude: parseFloat(school.latitud),
                longitude: parseFloat(school.longitude),
              };
              console.log(coords);
              return (
                <Marker
                  key={index}
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
                  <View>
                    <Image source={{ uri: school.image }} style={styles.image} />
                  </View>
                  <View style={styles.headerText}>
                    <Text style={styles.title}>{school.name}</Text>
                    <Text numberOfLines={2}>{school.description}</Text>
                    <Button
                      title="Ver más"
                      style={styles.button}
                      onPressEvent={() => this.selectService(school.id)}
                      type={ButtonTypes.PRIMARY}
                    />
                  </View>
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
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    paddingTop: 12,
    paddingLeft: 12,
    flexDirection: 'row',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: constants.colors.darkCyan,
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#fafafa',
  },

  headerText: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    flex: 1,
    flexDirection: 'column',
  },

  button: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    right: 8,
  },
});
