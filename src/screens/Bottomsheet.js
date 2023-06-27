import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import React, {useRef, useState, useMemo, useCallback} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Feather from 'react-native-vector-icons/Feather';
import {Portal} from '@gorhom/portal';
import {insertTable} from '../../db/insert';
import EmptyAlertModal from '../modals/EmptyAlertModal';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch} from 'react-redux';
import {addTodo} from '../../store/slice';

const Bottomsheet = () => {
  const dispatch = useDispatch();
  const [Comment, setComment] = useState('');
  const [input, setInput] = useState('');
  const [AlertVisible, setAlertVisible] = useState(false);
  const bottomSheetRef = useRef(null);
  const ref = useRef();
  const commentref = useRef();
  const snapPoints = useMemo(() => [0.1, '50%'], []);
  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} opacity={0.1} />,
    [],
  );

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'Low', value: '1'},
    {label: 'Medium', value: '2'},
    {label: 'High', value: '3'},
  ];

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  const addData = async (input, comment, priority, isRead) => {
    console.log('Input--', input);
    ref.current.clear();
    commentref.current.clear();
    if (!input) {
      setAlertVisible(true);
      return false;
    }
    if (isEmptyOrSpaces(input)) {
      setAlertVisible(true);
    } else {
      try {
        const data = await insertTable(input, comment, priority, isRead);
        console.log('insert Response ', data);
        ToastAndroid.show(`Item Added`, ToastAndroid.SHORT);
        dispatch(addTodo({input, comment, priority, isRead}));
        // retriveData();
        setInput('');
        setValue(null);
        setComment('');
      } catch (error) {
        console.log('Error on iserting table', error);
      }
    }
  };

  const handleInput = text => {
    setInput(text);
  };

  return (
    <View style={{margin: 10}}>
      <Feather
        name={'plus'}
        color={'#fff'}
        size={20}
        style={{
          backgroundColor: '#465AF7',
          padding: 25,
          borderRadius: 50,
        }}
        onPress={() => bottomSheetRef.current.snapToIndex(1)}
      />
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{backgroundColor: '#232b3b'}}
          handleIndicatorStyle={{backgroundColor: '#afbad0'}}
          backdropComponent={renderBackdrop}>
          <View style={styles.bottomSheetContainer}>
            <BottomSheetScrollView>
              <Text style={styles.bottomSheetItemHeading}>Create Todo 📋</Text>
              <Text style={styles.bottomSheetItemSubHeading}>
                Create a new todo and maintain your momentum 🚀
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 2, marginRight: 10}}>
                  <TextInput
                    ref={ref}
                    style={styles.taskInput}
                    placeholder={'Write task'}
                    autoCorrect={true}
                    onChangeText={text => handleInput(text)}
                    placeholderTextColor={'#afbad0'}
                    maxLength={200}
                  />
                </View>
                <View style={{flex: 1}}>
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
              <TextInput
                ref={commentref}
                style={styles.commentInput}
                // multiline={true}
                onChangeText={text => setComment(text)}
                placeholder={'Write a note...'}
                placeholderTextColor={'#afbad0'}
                maxLength={300}
              />
              <View style={{paddingVertical: 2, paddingHorizontal: 10}}>
                <View
                  style={{
                    borderTopWidth: 0.6,
                    borderTopColor: '#1a202c',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      addData(input, Comment, value, 0);
                      bottomSheetRef.current.snapToIndex(0);
                    }}
                    style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheetScrollView>
          </View>
        </BottomSheet>
      </Portal>
      <EmptyAlertModal
        AlertVisible={AlertVisible}
        setAlertVisible={setAlertVisible}
      />
    </View>
  );
};

export default Bottomsheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: '#232b3b',
    height: '100%',
    width: '100%',
    padding: 20,
  },
  bottomSheetItemHeading: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  bottomSheetItemSubHeading: {
    color: '#afbad0',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    paddingTop: 4,
    paddingBottom: 30,
  },
  taskInput: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: '#1c2330',
    borderRadius: 20,
    paddingVertical: 16,
    paddingStart: 18,
    fontFamily: 'Inter-Regular',
  },
  commentInput: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: '#1c2330',
    borderRadius: 20,
    fontFamily: 'Inter-Regular',
    paddingStart: 18,
    paddingVertical: 16,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#11a9ff',
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },

  dropdown: {
    paddingVertical: 12,
    border: 0,
    borderRadius: 20,
    paddingHorizontal: 8,
    width: '100%',
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
