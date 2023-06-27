import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';

const dataShowModal = ({
  ModalVisible,
  setModalVisible,
  updateDone,
  Todo,
  TodoComment,
  Date,
  Priority,
  isDone,
  ID,
}) => {
  return (
    <Modal
      isVisible={ModalVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={200}
      animationOutTiming={200}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.4}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'#1a202c'} />
        <View style={styles.cardContainer}>
          {!Priority && <View style={styles.card}></View>}
          {Priority === '1' && (
            <View style={styles.card}>
              <Text
                style={{
                  color: '#1F8A70',
                  fontSize: 12.5,
                  fontFamily: 'Inter-SemiBold',
                }}>
                Low
              </Text>
            </View>
          )}
          {Priority === '2' && (
            <View style={styles.card}>
              <Text
                style={{
                  color: '#F2BE22',
                  fontSize: 12.5,
                  fontFamily: 'Inter-SemiBold',
                }}>
                Medium
              </Text>
            </View>
          )}
          {Priority === '3' && (
            <View style={styles.card}>
              <Text
                style={{
                  color: '#F95555',
                  fontSize: 12.5,
                  fontFamily: 'Inter-SemiBold',
                }}>
                High
              </Text>
            </View>
          )}
          <Text
            style={styles.titleText}
            ellipsizeMode={'tail'}
            numberOfLines={10}>
            {Todo}
          </Text>
          {TodoComment && (
            <Text
              style={styles.commentText}
              ellipsizeMode={'tail'}
              numberOfLines={8}>
              {TodoComment}
            </Text>
          )}
          <Text style={styles.createdDate}>
            Created on : {Date.split(' ')[0]}
          </Text>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                updateDone(0, ID);
              }}
              style={[{backgroundColor: '#794952'}, styles.ButtomContainer]}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

            {isDone === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  updateDone(1, ID);
                }}
                style={[{backgroundColor: '#11a9ff'}, styles.ButtomContainer]}>
                <Text style={styles.closeText}>Complete</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  updateDone(0, ID);
                }}
                style={[{backgroundColor: '#11a9ff'}, styles.ButtomContainer]}>
                <Text style={styles.closeText}>Incomplete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default dataShowModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#232b3b',
    paddingTop: 5,
    paddingBottom: 20,
    alignItems: 'flex-start',
    width: '100%',
    borderRadius: 20,
  },
  card: {
    alignItems: 'flex-start',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  priorityText: {
    color: '#FF5656',
    fontSize: 14,
    alignSelf: 'center',
  },
  editIcon: {
    color: '#55688F',
    fontSize: 18,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    paddingHorizontal: 20,
    fontFamily: 'Inter-SemiBold',
  },
  commentText: {
    color: '#AAB6CD',
    fontSize: 14,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontFamily: 'Inter-Medium',
  },
  createdDate: {
    color: '#55688f',
    fontSize: 14,
    paddingTop: 20,
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontFamily: 'Inter-SemiBold',
  },
  dueDate: {
    color: '#55688f',
    fontSize: 14,
    paddingTop: 4,
    textAlign: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'Inter-SemiBold',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 0.6,
    borderTopColor: '#1A202C',
    width: '100%',
  },
  ButtomContainer: {
    alignSelf: 'center',
    width: 100,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
});
