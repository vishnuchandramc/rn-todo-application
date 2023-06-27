import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  useColorScheme,
  View,
  TextInput,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import HapticFeedback from 'react-native-haptic-feedback';
import Lottie from 'lottie-react-native';
import DataShowModal from '../modals/dataShowModal';
import {updateTable} from '../../db/update';
import {deleteTableItems} from '../../db/delete';
import {insertTable} from '../../db/insert';
import {formatDate} from '../../utils/CommonUtils';
import {useDispatch, useSelector} from 'react-redux';
import db from '../../db/db';

const Main = () => {
  const todoData = useSelector(state => state.todos?.data);
  console.log('TodoData', todoData);
  const retriveData = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM todos ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log('Data Retrived Successfully!');
          let len = res.rows.length;
          if (len > 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              result.push({
                id: item.id,
                data: item.data,
                subdata: item.subdata,
                date: item.timestamp,
                priority: item.priority,
                isDone: item.isRead,
              });
            }
            console.log('Result---', result);
            setData(result);
          } else {
            setData([]);
          }
        },
        error => {
          console.log('Query error on table creation', error);
        },
      );
    });
  };

  useEffect(() => {
    retriveData();
    console.log('Retrived Data', Data);
  }, [Data, todoData]);

  const isDarkMode = useColorScheme() === 'dark';
  const [Data, setData] = useState([]);
  const [Todo, setTodo] = useState('');
  const [Priority, setPriority] = useState('');
  const [TodoComment, setTodoComment] = useState('');
  const [ModalVisible, setModalVisible] = useState(false);

  const [ID, setID] = useState('');
  const [Date, setDate] = useState('');
  const [isDone, setisDone] = useState(0);
  const slideRef = useRef([]);

  const updateDone = async (item, id, index) => {
    try {
      const result = await updateTable(item, id);
      console.log('update Response ', result);
      retriveData();
      slideRef.current[index].close();
    } catch (error) {
      console.log('Error on updating table', error);
    }
  };

  const removeData = async item => {
    try {
      const data = await deleteTableItems(item);
      ToastAndroid.show(`Item removed Successfully!`, ToastAndroid.SHORT);
      console.log('delete Response ', data);
      retriveData();
    } catch (error) {
      ToastAndroid.show(`Something went wrong`, ToastAndroid.SHORT);
      console.log('Error on delete table data', error);
    }
  };

  const RenderLeft = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0.5, 50],
      outputRange: [0.1, 0.6],
    });

    const Style = {
      transform: [
        {
          scale,
        },
      ],
    };

    return (
      <View style={styles.animatedArchieveContainer}>
        <Animated.Text style={[Style, styles.animatedText]}>
          <Ionicons name="trash-outline" style={styles.animatedIcon} />
        </Animated.Text>
      </View>
    );
  };

  const RenderRight = (progress, dragX, item, index) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0],
      outputRange: [1, 0],
    });

    const handleDelete = () => {
      HapticFeedback.trigger('impactLight');
      removeData(item);
      slideRef.current[index].close();
    };

    const Style = {
      transform: [
        {
          scale,
        },
      ],
    };

    return (
      <View style={styles.animatedActionContainer}>
        <Animated.Text style={[Style, styles.animatedActionText]}>
          <Ionicons
            name="trash-outline"
            style={styles.animatedActionIcon}
            onPress={handleDelete}
          />
        </Animated.Text>
      </View>
    );
  };

  const renderList = ({item, index}) => {
    return (
      <GestureHandlerRootView>
        <Swipeable
          useNativeAnimations
          key={index}
          ref={ref => (slideRef.current[index] = ref)}
          overshootRight={false}
          overshootLeft={false}
          onSwipeableRightWillOpen={() => {
            HapticFeedback.trigger('impactLight');
            if (item.isDone === 0) {
              updateDone(1, item.id, index);
              ToastAndroid.show(`Marked as Done`, ToastAndroid.SHORT);
            } else {
              updateDone(0, item.id, index);
              ToastAndroid.show(`Marked as not done`, ToastAndroid.SHORT);
            }
          }}
          renderLeftActions={RenderLeft}
          onSwipeableLeftOpen={() => {
            HapticFeedback.trigger('impactLight');
            removeData(item.id);
            setID(item.id);
          }}
          renderRightActions={(progress, dragX) =>
            RenderRight(progress, dragX, item, index)
          }>
          <Pressable
            style={[{backgroundColor: '#242A37'}, styles.listItemWrapper]}
            android_ripple={{color: '#2f3647'}}
            onPress={() => {
              HapticFeedback.trigger('impactLight');
              setModalVisible(true);
              setTodo(item.data);
              setTodoComment(item.subdata);
              setPriority(item.priority);
              setDate(item.date);
              setID(item.id);
              setisDone(item.isDone);
            }}>
            <View style={styles.ItemStyle}>
              {item.priority === '1' && (
                <Text
                  style={{
                    color: '#1F8A70',
                    fontSize: 12.5,
                    fontFamily: 'Inter-SemiBold',
                    paddingBottom: 4,
                  }}>
                  Low
                </Text>
              )}
              {item.priority === '2' && (
                <Text
                  style={{
                    color: '#F2BE22',
                    fontSize: 12.5,
                    fontFamily: 'Inter-SemiBold',
                    paddingBottom: 4,
                  }}>
                  Medium
                </Text>
              )}
              {item.priority === '3' && (
                <Text
                  style={{
                    color: '#F95555',
                    fontSize: 12.5,
                    fontFamily: 'Inter-SemiBold',
                    paddingBottom: 4,
                  }}>
                  High
                </Text>
              )}

              <Text
                style={[
                  item.isDone === 1
                    ? styles.textDecorationLine
                    : styles.textDecorationNone,
                  styles.listStyle,
                ]}>
                {item.data}
              </Text>
              <Text
                style={{
                  color: '#AAB6CD',
                  fontSize: 12,
                  fontFamily: 'Inter-SemiBold',
                }}>
                Created on: {formatDate(item.date)}
              </Text>
            </View>
            <View style={styles.ItemDoneIconContainer}>
              {item.isDone === 0 ? (
                <Feather
                  name="circle"
                  style={[{color: '#55688f'}, styles.ItemDoneIcon]}
                />
              ) : (
                <Feather
                  name="check-circle"
                  style={[{color: '#52da88'}, styles.ItemDoneIcon]}
                />
              )}
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#1a202c'} />
      <Text style={styles.heading}>Todos</Text>
      {Data.length == 0 ? (
        <View style={styles.emptyDataContainer}>
          <Lottie
            style={styles.emptyData}
            source={require('../../assets/animation.json')}
            autoPlay
            loop
          />
          <Text style={styles.emptyDataText}>Nothing to do 🤷‍♂️</Text>
          <Text style={styles.emptyDataSubText}>
            Create new task by clicking the plus icon below 👇
          </Text>
        </View>
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
            data={Data}
            renderItem={item => renderList(item)}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      <DataShowModal
        ModalVisible={ModalVisible}
        setModalVisible={setModalVisible}
        updateDone={updateDone}
        Todo={Todo}
        Priority={Priority}
        TodoComment={TodoComment}
        Date={Date}
        isDone={isDone}
        ID={ID}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
  },
  heading: {
    fontSize: 23,
    color: '#fff',
    padding: 24,
    fontFamily: 'Inter-ExtraBold',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#232b3b',
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
  },
  input: {
    borderBottomWidth: 0.6,
    borderBottomColor: '#55688f',
    width: '60%',
    paddingLeft: 4,
  },
  submitWrapper: {
    width: 60,
    height: 40,
    backgroundColor: '#465af7',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listWrapper: {
    flex: 6,
  },
  listItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#1a202c',
    borderBottomWidth: 1.2,
    color: '#fff',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  listStyle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    paddingBottom: 4,
  },
  animatedArchieveContainer: {
    width: 120,
    backgroundColor: '#1b2231',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedText: {
    color: '#fff',
    backgroundColor: '#fd423d',
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  animatedIcon: {
    color: '#fff',
    fontSize: 14,
  },
  animatedActionContainer: {
    width: 50,
    backgroundColor: '#1b2231',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedActionText: {
    backgroundColor: '#52da88',
    padding: 4,
    borderRadius: 50,
  },
  animatedActionIcon: {color: '#1b2231', fontSize: 14},
  ItemStyle: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textDecorationLine: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  textDecorationNone: {
    textDecorationLine: 'none',
    textDecorationStyle: 'none',
  },
  ItemDoneIcon: {
    fontSize: 20,
  },
  ItemDoneIconContainer: {flex: 1, alignItems: 'flex-end'},
  emptyDataContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyData: {height: 200, width: 200},
  emptyDataText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    paddingBottom: 10,
  },
  emptyDataSubText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#55688f',
  },
});
