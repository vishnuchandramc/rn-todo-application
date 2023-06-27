import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {deleteAllItems} from '../../db/delete';
import {retriveData} from '../../db/retrieve';
import {addTodo} from '../../store/slice';
import DeleteWarningModal from '../modals/deleteAlert';

const Settings = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const handleClearData = () => {
    setModalVisible(true);
    // Code to clear all data
  };

  const data = [
    {label: 'On', value: '1'},
    {label: 'Off', value: '2'},
  ];

  const handleToggleDarkMode = () => {
    // Code to toggle dark mode
    ToastAndroid.show(`Coming Soon!`, ToastAndroid.SHORT);
  };

  const handleInviteFriends = () => {
    // Code to invite friends
  };

  const handleSendFeedback = () => {
    // Code to send feedback
  };

  const handleDeleteAll = async () => {
    try {
      const data = await deleteAllItems();
      ToastAndroid.show(`All Items Removed`, ToastAndroid.SHORT);
      console.log('delete Response ', data);
      dispatch(addTodo({}));
      setModalVisible(false);
    } catch (error) {
      ToastAndroid.show(`Something went wrong`, ToastAndroid.SHORT);
      console.log('Error on delete table data', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={'#1a202c'} />
        <Text style={styles.heading}>Settings</Text>

        <TouchableOpacity style={styles.option} onPress={handleClearData}>
          <Text style={[styles.optionIcon]}>🚮</Text>
          <Text style={[styles.optionText, {color: '#F95555'}]}>
            Clear All Data
          </Text>
        </TouchableOpacity>

        <View style={styles.option}>
          <Text style={[styles.optionIcon]}>📳</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              marginRight: 10,
            }}>
            <Text style={styles.optionText}>Haptic feedback</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              activeColor={'#2f3a50'}
              containerStyle={{
                backgroundColor: '#1A202C',
                borderRadius: 10,
                border: 0,
                borderColor: '#1A202C',
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 4,
                elevation: 5,
              }}
              renderItem={item => {
                return (
                  <View style={{padding: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#AAB6CD',
                        alignSelf: 'flex-start',
                      }}>
                      {item.label}
                    </Text>
                  </View>
                );
              }}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                console.log(item);
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.option} onPress={handleInviteFriends}>
          <Text style={[styles.optionIcon]}>🤝</Text>
          <Text style={styles.optionText}>Invite Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleSendFeedback}>
          <Text style={[styles.optionIcon]}>🗣️</Text>
          <Text style={styles.optionText}>Send Feedback</Text>
        </TouchableOpacity>

        <Text style={styles.version}>App Version 1.0.0</Text>
      </View>
      <DeleteWarningModal
        AlertVisible={modalVisible}
        setAlertVisible={setModalVisible}
        onSubmit={handleDeleteAll}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
  },
  heading: {
    fontSize: 23,
    color: '#fff',
    padding: 24,
    fontFamily: 'Inter-Bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  optionIcon: {
    fontSize: 24,
    color: '#fff',
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter-Medium',
  },
  version: {
    fontSize: 14,
    color: '#AAB6CD',
    textAlign: 'center',
    marginTop: 24,
  },
  dropdown: {
    paddingVertical: 12,
    border: 0,
    borderRadius: 20,
    paddingHorizontal: 8,
    width: '30%',
    backgroundColor: '#1c2330',
  },
  icon: {
    marginRight: 5,
    color: '#AAB6CD',
    paddingRight: 8,
  },
  label: {
    position: 'absolute',
    color: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
    color: '#AAB6CD',
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal: 6,
    color: '#AAB6CD',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#AAB6CD',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#AAB6CD',
  },
});

export default Settings;
