/**
 * Default Imports
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

/**
 * Plugin Imports
 */
import {Card, CardItem, Body, Form, Item, Input, Button} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';

/**
 * util Functions
 */
import {getData} from '../utils/Helper';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredCountry: '',
    };
    this.validator = new SimpleReactValidator();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleInputChange = (value) => {
    this.setState({
      enteredCountry: value,
    });
  };

  submitForm() {
    if (this.validator.allValid()) {
      fetch(
        `https://restcountries.eu/rest/v2/name/${this.state.enteredCountry}`,
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.props.navigation.navigate('Detail', {data: result});
          },
          (error) => {
            console.log(error);
          },
        );
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  render() {
    return (
      <View>
        <View style={styles.containerWrapper}>
          <Text style={styles.heading}>Welcome!</Text>
        </View>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <View style={styles.formContainer}>
                  <Form>
                    <Item rounded style={styles.textbox}>
                      <TextInput
                        onChangeText={this.handleInputChange}
                        placeholder="Enter Country"
                      />
                    </Item>
                    <Text style={styles.errorText}>
                      {this.validator.message(
                        'Country Name',
                        this.state.enteredCountry,
                        'required',
                      )}
                    </Text>
                    <Button
                      onPress={() => {
                        this.submitForm();
                      }}
                      disabled={
                        this.state.enteredCountry.length > 0 ? false : true
                      }
                      style={styles.Button}
                      success>
                      <Text style={styles.ButtonText}>Submit</Text>
                    </Button>
                  </Form>
                </View>
              </Body>
            </CardItem>
          </Card>
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  card: {
    width: wp('80%'),
    height: hp('30%'),
  },
  textbox: {
    width: wp('60%'),
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
  formContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
