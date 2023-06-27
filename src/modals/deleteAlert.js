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

const DeleteWarningModal = ({AlertVisible, setAlertVisible, onSubmit}) => {
  return (
    <Modal
      isVisible={AlertVisible}
      animationIn={'slideInUp'}
      animationOut={'fadeOut'}
      animationInTiming={200}
      animationOutTiming={100}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.4}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'#1a202c'} />
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.heading}>Warning</Text>
            <Text style={styles.subText}>Are you sure want to continue?</Text>
          </View>

          <TouchableOpacity
            onPress={() => setAlertVisible(false)}
            style={[styles.ButtomContainer, {backgroundColor: '#11a9ff'}]}>
            <Text style={styles.closeText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={[styles.ButtomContainer, {backgroundColor: '#F95555'}]}>
            <Text style={styles.closeText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteWarningModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#232b3b',
    paddingVertical: 20,
    alignItems: 'center',
    marginVertical: 60,
    width: '95%',
    borderRadius: 20,
  },
  card: {alignItems: 'center', margin: 10},
  heading: {
    color: '#fff',
    fontSize: 22,
    paddingHorizontal: 20,
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'Inter-SemiBold',
  },
  subText: {
    color: '#f5f5f5',
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: 'center',
    paddingBottom: 30,
    paddingTop: 5,
    fontFamily: 'Inter-Regular',
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
    paddingTop: 20,
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
    flexDirection: 'column',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  ButtomContainer: {
    alignSelf: 'center',
    // paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    width: 200,
    paddingVertical: 16,
    borderRadius: 50,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
});
