import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=fifachamptionsmensoccer&format=json&case=default")
        .then((response) => response.json())
        .then((myJson) => {
          if (originalData.length < 1) {
            setMydata(myJson);
            originalData = myJson;
          }
          setMydata(myJson);
        })
        .catch(error => console.error('Error fetching data:', error));
  }, []);

  const FilterData = (text) => {
    if (text !== '') {
      let myFilteredData = originalData.filter((item) =>
          (item.WinningTeam && item.WinningTeam.toLowerCase().includes(text.toLowerCase())) ||
          (item.LosingTeam && item.LosingTeam.toLowerCase().includes(text.toLowerCase()))
      );
      setMydata(myFilteredData);
    } else {
      setMydata(originalData);
    }
  };

  const renderItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
          <Text style={styles.yearText}>{item.Year}</Text>
          <Text style={styles.teamText}>{item.WinningTeam} vs {item.LosingTeam}</Text>
          <Text style={styles.scoreText}>{item.Score}</Text>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.title}>FIFA World Cup Finals</Text>
        <TextInput
            style={styles.searchInput}
            placeholder="Search by team name"
            onChangeText={(text) => FilterData(text)}
        />
        <FlatList
            data={mydata}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID.toString()}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  yearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  teamText: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 4,
  },
  scoreText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
});

export default App;
