import React from 'react';
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TrackListEntry from './MyTrackListEntry';
import dummyTracks from './dummyTracksData.json';

const MyTrackList = ({ showBookmark, showAdd, route }) => {
  // const { setAction, scheduleInfo, tracks } = route.params;
  const { setAction, scheduleInfo } = route.params;
  const tracks = dummyTracks;
  // console.log(getTracks());
  if (!tracks) return <></>;
  if (!tracks.length) return <></>;
  return (
    <ScrollView>
      <StatusBar />
      {tracks.map((track) => (
        <TrackListEntry
          key={track.trackId}
          data={track}
          setAction={setAction}
          scheduleInfo={scheduleInfo}
        />
      ))}
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

export default MyTrackList;