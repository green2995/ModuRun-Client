import React from 'react';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mapStyle: {
    // height: '100%',
    flex: 1,
  },
  toggleContainer(toggled) {
    return {
      backgroundColor: toggled ? 'black' : 'lightgrey',
      paddingVertical: 9,
      alignItems: 'center',
      borderBottomWidth: 1,
    };
  },
  toggleButton(toggled) {
    return {
      color: toggled ? 'white' : 'black',
    };
  },
  toolBar: {
    position: 'absolute',
    width: 60,
    height: 350,
    zIndex: 100,
    left: 0,
    flexDirection: 'row',
  },
  simplePadding: {
    color: 'white',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
  },
  markerTag: {
    paddingBottom: 0,
    backgroundColor: '#545454',
    textAlign: 'center',
    color: 'white',
    borderRadius: 5,
  },
  markerShadow: {
    width: 10,
    height: 7,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    zIndex: -10,
  },
  toolBarIcon(color = 'rgba(255,255,255,0.9)', size = 30) {
    return {
      width: size * (5 / 3),
      height: size * (5 / 3),
      alignItems: 'center',
      justifyContent: 'center',
      margin: (size * (5 / 3)) / 10,
      padding: (size * (5 / 3)) / 10,
      backgroundColor: color,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.4)',
    };
  },
  addMarker(touchPos, correctHiding) {
    return {
      position: 'absolute',
      left: touchPos.x + correctHiding.x - 17 / 2 || 0,
      top: touchPos.y + correctHiding.y - 30.5 || 0,
    };
  },
  completeButtonContainer(isVisible, position) {
    return {
      display: isVisible ? 'flex' : 'none',
      position: 'absolute',
      zIndex: 100,
      right: 0,
      top: 0,
      marginTop: position || 200,
    };
  },
  titleInputContainer(completeVisible, typingText) {
    return {
      display: completeVisible ? 'flex' : 'none',
      flex: typingText ? 1 : 0.6,
      backgroundColor: 'white',
      paddingHorizontal: 20,
      borderTopWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    };
  },
  titleInput: {
    marginBottom: 20,
    paddingLeft: 9,
    backgroundColor: 'grey',
    height: 50,
    width: '100%',
    color: 'white',
  },
  editCompleteButton: {
    backgroundColor: '#03D6A7',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 18,
    width: 200,
    alignItems: 'center',
  },
  calloutView: {
    width: 180,
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    alignContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  calloutTitle: {
    backgroundColor: 'rgba(33, 150, 243, 1)',
    width: 180,
    color: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
  },
  calloutSeperator: {
    // height: 1,
    // backgroundColor: 'grey',
    // marginVertical: 10,
  },
  callloutPropRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  callloutPropKey(backgroundColor = 'dodgerblue', color = 'white') {
    return {
      padding: 5,
      marginRight: 5,
      backgroundColor,
      borderRadius: 10,
      color,
    };
  },
  calloutPropValue(backgroundColor = '#edf0ff', color = 'black') {
    return {
      padding: 5,
      backgroundColor,
      borderRadius: 10,
      color,
    };
  },
});

const Title = styled.Text`
  color: #000;
  text-align: center;
  font-size: 16px;
`;

export default () => (
  <Container>
    <Title>Hello</Title>
  </Container>
);
