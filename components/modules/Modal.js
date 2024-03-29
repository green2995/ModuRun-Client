import React, { useState } from 'react';
import {
  Alert, StyleSheet, Modal, Text, View, TouchableHighlight, TouchableOpacity, Image, TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import * as utils from './ScheduleList/utils';
import { patchUserName } from './API/user';
import { customizingDateAndTime } from './utils';
import request from './API/SG/utils';
import modurunAPI from './API';
import userActions from '../../redux/action/User/creator'
import reduxStore from '../../redux/store';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080aa',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roof: {
    width: 300,
    height: 30,
    backgroundColor: '#2196f3',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingLeft: 15,
    width: 50,
    height: 50,
    elevation: 2,
  },
  confirmBtn: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingLeft: 15,
    width: 60,
    height: 30,
    elevation: 2,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    marginTop: 30,
    marginBottom: 30,
    width: 100,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterButton: {
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    width: 55,
    height: 55,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  distanceButton: {
    marginRight: 5,
    backgroundColor: '#03D6A7',
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  pressedButton: {
    marginRight: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: 250,
    height: 40,
    paddingRight: 10,
    margin: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 2,
    marginRight: 10,
  },
  filterTitle: {
    color: '#2196f3',
    fontSize: 16,
    borderRadius: 5,
    padding: 5,
    marginRight: 15,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  particpateButton: {
    borderRadius: 10,
    paddingTop: 5,
    // alignItems: 'center',
    width: 70,
    height: 30,
    elevation: 2,
  },
});

const FilterModal = ({ value, setAction }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [timePickerShow, setTimePickerShow] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [fromTo, setFromTo] = useState('from');
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(new Date());
  const [totalLength, setTotalLength] = useState(0);

  const DistanceButtonComponent = ({ dis }) => {
    if (dis >= 1000) {
      return (
        <TouchableOpacity
          style={styles.distanceButton}
          onPress={() => setDistance(dis)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{`${(dis / 1000).toFixed(0)}km`}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.distanceButton}
        onPress={() => setDistance(dis)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{`${dis}m`}</Text>
      </TouchableOpacity>
    );
  };

  const DatePickerComponent = ({
    show, mode, fromTo, value,
  }) => (
    <TouchableOpacity
      style={{
        marginRight: 15, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1E90FF', paddingBottom: 3,
      }}
      onPress={() => {
        setDatePickerShow(!show);
        setPickerMode(mode);
        setFromTo(fromTo);
      }}
    >
      <Text style={{ alignSelf: 'center' }}>{value}</Text>
    </TouchableOpacity>
  );

  const TimePickerComponent = ({
    show, mode, fromTo, value,
  }) => (
    <TouchableOpacity
      style={{
        marginRight: 5, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1E90FF', paddingBottom: 3,
      }}
      onPress={() => {
        setTimePickerShow(!show);
        setPickerMode(mode);
        setFromTo(fromTo);
      }}
    >
      <Text style={{ alignSelf: 'center' }}>{value}</Text>
    </TouchableOpacity>
  );

  const onChangeDatePicker = (event, selectedTime) => {
    setDatePickerShow(false);
    if (selectedTime) {
      if (fromTo === 'from') {
        setDateFrom(selectedTime);
      } else {
        setDateTo(selectedTime);
      }
    }
  };

  const onChangeTimePicker = (event, selectedTime) => {
    setTimePickerShow(false);
    if (selectedTime) {
      if (fromTo === 'from') {
        setTimeFrom(selectedTime);
      } else {
        setTimeTo(selectedTime);
      }
    }
  };

  const filtering = async () => {
    setModalVisible(!modalVisible);
    const filterCondition = {
      ...value,
      maxLength: (totalLength * 1000),
      distance,
      date: {
        from: dateFrom,
        to: dateTo,
        timeFrom,
        timeTo,
      },
    };
    setAction(filterCondition);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.roof} />
            <View style={styles.row}>
              <Text style={styles.filterTitle}>거리</Text>
              <DistanceButtonComponent dis={50000} />
              <DistanceButtonComponent dis={3000} />
              <DistanceButtonComponent dis={1000} />
              <DistanceButtonComponent dis={500} />
            </View>
            <View style={styles.row}>
              <Text style={styles.filterTitle}>날짜</Text>
              {
                datePickerShow
                  ? (
                    <DateTimePicker
                      value={new Date()}
                      onChange={onChangeDatePicker}
                      mode={pickerMode}
                    />
                  )
                  : <></>
              }
              <DatePickerComponent show={datePickerShow} mode="date" fromTo="from" value={customizingDateAndTime(dateFrom, 0)} />
              <DatePickerComponent show={datePickerShow} mode="date" fromTo="to" value={customizingDateAndTime(dateTo, 0)} />
            </View>

            <View style={styles.row}>
              <Text style={styles.filterTitle}>시간</Text>
              {
                timePickerShow
                  ? (
                    <DateTimePicker
                      value={new Date()}
                      onChange={onChangeTimePicker}
                      mode={pickerMode}
                    />
                  )
                  : <></>
              }
              <TimePickerComponent show={timePickerShow} mode="time" fromTo="from" value={customizingDateAndTime(0, timeFrom)} />
              <TimePickerComponent show={timePickerShow} mode="time" fromTo="to" value={customizingDateAndTime(0, timeTo)} />
            </View>

            <View style={styles.row}>
              <Text style={styles.filterTitle}>길이</Text>
              <TextInput
                style={{
                  width: 100, height: 40, paddingLeft: 10, backgroundColor: '#F4F4F4', borderRadius: 10,
                }}
                placeholder="길이"
                keyboardType="numeric"
                onChangeText={(text) => setTotalLength(text)}
              />
              <Text>km 이내</Text>
            </View>

            <TouchableHighlight
              style={styles.searchButton}
              onPress={filtering}
            >
              <Text style={styles.textStyle}>검색</Text>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableHighlight
        underlayColor="#ffffff00"
        style={styles.openButton}
        // onPress={() => {
        //   setModalVisible(true);
        // }}
      >
        <Icon.Button style={styles.filterButton} name="filter" color="white" size={30} backgroundColor="rgba(52, 52, 52, 0.0)" onPress={() => { setModalVisible(true); }} />
      </TouchableHighlight>
    </View>
  );
};

export const InputUsernameModal = ({}) => {
  // 첫 로그인일 때만 보이는 유저 이름 입력 모달
  const [modalVisible, setModalVisible] = useState(true);
  const [username, setUsername] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const postUsername = async () => {
    setModalVisible(false);
    try {
      modurunAPI.users.changeMyName(username)
        .then((res) => {
          if (res.ok) reduxStore.dispatch(userActions.changeUserName(username));
        });
    } catch (e) {
      console.log('username input modal ', e);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={closeModal}
        >
          <View style={[styles.modalView, { padding: 30 }]}>
            <TextInput
              placeholder="유저 이름을 입력해 주세요"
              style={{
                backgroundColor: 'rgba(211, 211, 211, 0.3)', width: 200, height: 40, marginBottom: 20, paddingLeft: 5,
              }}
              onChangeText={setUsername}
            />
            <TouchableHighlight
              style={[styles.confirmBtn, { justifyContent: 'center' }]}
              onPress={postUsername}
            >
              <Text style={[styles.textStyle, { marginRight: 15 }]}>확인</Text>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const ScheduleValidationModal = ({ visible, setVisible, value }) => {
  // const [modalVisible, setModalVisible] = useState(visible);

  const closeModal = () => {
    setVisible(false);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={closeModal}
        >
          <View style={[styles.modalView, { padding: 30 }]}>
            <Text style={{ paddingBottom: 20 }}>{`${value}을 지정해 주세요.`}</Text>
            <TouchableHighlight
              style={[styles.openButton, { justifyContent: 'center' }]}
              onPress={closeModal}
            >
              <Text style={[styles.textStyle, { marginRight: 13 }]}>확인</Text>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const ParticipateModal = ({
  visible, setVisible, scheduleId,
}) => {
  // const [modalVisible, setModalVisible] = useState(visible);

  const closeModal = () => {
    setVisible(false);
  };
  const participate = () => {
    console.log('일정에 참가');
    request.request('POST', '/users/schedules', { scheduleId });
    setVisible(false);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={closeModal}
        >
          <View style={[styles.modalView, {padding: 30}]}>
            <Text style={{fontSize: 20 , paddingBottom: 20}}>스케줄에 참가 하시겠습니까?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={[styles.particpateButton, { backgroundColor: '#03D6A7', marginRight: 20}]}
                onPress={participate}
              >
                <Text style={styles.textStyle}>확인</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.particpateButton, { backgroundColor: '#EF3832' }]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>취소</Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export const SignInValidationModal = ({ modal }) => {
  const [modalVisible, setModalVisible] = useState(modal);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={closeModal}
        >
          <View style={[styles.modalView, {padding: 30,}]}>
              <Text style={{fontSize: 20 , paddingBottom: 20, textAlign: 'center' }}>입력하신 이메일이 없거나{"\n"}비밀번호가 틀렸습니다.</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={[styles.particpateButton, { backgroundColor: '#03D6A7', marginRight: 20}]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>확인</Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FilterModal;