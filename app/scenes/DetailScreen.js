import React, {Component} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import {Card, CardItem, Body, Form, Item, Input, Button} from 'native-base';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryDetails: [],
      weatherData: {},
      accesskey: 'c6fc957cd56c7df7a4302002403e0b52',
      icon: '',
    };
    this.getWeather = this.getWeather.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.setState({
      countryDetails: this.props.route.params.data[0],
    });
  }
  getWeather = () => {
    fetch(
      `http://api.weatherstack.com/current?access_key=c6fc957cd56c7df7a4302002403e0b52&query=${this.state.countryDetails.name}`,
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            weatherData: result.current,
            icon: result.current.weather_icons[0],
          });
        },
        (error) => {
          console.log(error);
        },
      );
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <Card style={styles.card}>
          <CardItem>
            <Body style={styles.cardBody}>
              <Text style={styles.cardText}>
                Name:- {this.state.countryDetails.name}
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem>
            <Body style={styles.cardBody}>
              <Text style={styles.cardText}>
                Population:- {this.state.countryDetails.population}
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem>
            <Body style={styles.cardBody}>
              <Text style={styles.cardText}>
                Cordinates:-{' '}
                {`${this.state.countryDetails.latlng[0]},${this.state.countryDetails.latlng[1]}`}
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem>
            <Body style={styles.cardBody}>
              <Image
                style={{width: wp('80%'), height: hp('5%')}}
                source={this.state.countryDetails.flag}
              />
            </Body>
          </CardItem>
        </Card>
        <Button
          onPress={() => {
            this.getWeather();
          }}
          style={styles.Button}
          success>
          <Text style={styles.ButtonText}>Get Capital Weather</Text>
        </Button>

        <View>
          {this.state.weatherData ? (
            <View>
              <View
                style={{
                  marginTop: 40,
                  marginLeft: 20,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>
                  Temprature Details
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  teamprature:{this.state.weatherData.temperature}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Wind Speed:{this.state.weatherData.wind_speed}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 20,
                  marginRight: 20,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  precip:{this.state.weatherData.precip}
                </Text>
              </View>
              <Image
                style={{width: wp('80%'), height: hp('5%')}}
                source={this.state.icon}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

export default DetailScreen;

const styles = StyleSheet.create({
  card: {
    width: wp('80%'),
    height: hp('7%'),
  },
  cardLast: {
    width: wp('80%'),
    height: hp('7%'),
    marginTop: 20,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  wrapper: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  Button: {
    marginTop: 30,
    width: wp('60%'),
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    color: '#fff',
  },
});
