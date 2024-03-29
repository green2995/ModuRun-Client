import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import TrackList from './TrackList';
import FindTrack from './TrackManager/FindTrack';
import TrackEditor from './TrackManager/TrackEditor';
import trackManagerActions from '../../redux/action/TrackManager/creator';
import modurunAPI from './API';
import trackManagerUtils from './TrackManager/utils';

const TrackManager = ({
  myTracks,
  foundTracks,
  dispatch,
  type,
  setSwipeEnabled,
  setTabIndex,
}) => {
  const getMyTracks = () => {
    // if (myTracks.length) return;
    modurunAPI.tracks.getMyTracks()
      .then((res) => res.json())
      .then((json) => {
        dispatch(trackManagerActions.setMyTrack(json));
      });
  };

  const getTracks = (filter) => {
    trackManagerUtils.getUserPos()
      .then((userPos) => {
        modurunAPI.tracks.getTracks(filter, userPos, trackManagerUtils.getBigArea(userPos))
          .then((res) => {
            if (res.status === 200) {
              res.json().then((json) => {
                console.log(json);
                dispatch(trackManagerActions.setFoundTracks(json));
              });
            }
            if (res.status === 404) dispatch(trackManagerActions.setFoundTracks(null));
          });
      });
  };

  useEffect(() => {
    getMyTracks();
  }, []);

  const tranlateButtonNameToKor = {
    myTrack: '내 코스',
    findTrack: '주변 코스',
    createTrack: '코스 제작',
  };

  const colorForMenu = {
    myTrack: '#1E90FF',
    findTrack: '#1E90FF',
    createTrack: '#1E90FF',
  };

  const renderMenuBody = (screenType) => {
    let renderTarget;
    if (screenType === 'myTrack') {
      renderTarget = (
        <TrackList setTabIndex={setTabIndex} tracks={myTracks} showDelete getMyTracks={getMyTracks} showBookmark />
      );
    }
    if (screenType === 'findTrack') {
      renderTarget = (
        <FindTrack onFilterSet={getTracks} setTabIndex={setTabIndex} tracks={foundTracks} />
      );
    }
    if (screenType === 'createTrack') {
      renderTarget = (
        <TrackEditor getMyTracks={getMyTracks} setSwipeEnabled={setSwipeEnabled} />
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: colorForMenu[screenType] }}>
        {renderTarget}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderMenuBody(type)}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    myTracks: state.trackManager.myTracks,
    foundTracks: state.trackManager.foundTracks,
  };
};

export default connect(mapStateToProps, null)(TrackManager);
