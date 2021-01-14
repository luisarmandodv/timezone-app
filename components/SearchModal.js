import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import SearchInput, {createFilter} from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['label'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }
  render() {
    const {allTimezones} = this.props;
    if (allTimezones) {
      const filteredTimezones = this.props.allTimezones.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS),
      );
      return (
        <View style={styles.container}>
          <SearchInput
            onChangeText={(term) => {
              this.searchUpdated(term);
            }}
            style={styles.searchInput}
            placeholder="Type a message to search"
          />
          <ScrollView>
            {filteredTimezones.map((timezone) => {
              const splitedValue = timezone.label.split('/');
              return (
                <TouchableOpacity
                  onPress={() => this.props.onPress(timezone.value)}
                  key={timezone.id}
                  style={styles.emailItem}>
                  <View>
                    <Text>{splitedValue[splitedValue.length - 1]}</Text>
                    {/* <Text style={styles.emailSubject}>{email.subject}</Text> */}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10,
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)',
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
  },
});
