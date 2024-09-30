import { useQuery } from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {Alert, Modal as RNModal, StyleSheet, Text, Pressable, View} from 'react-native';
import { getMeService } from '../services/get-me-service';
import { Stars } from './stars';
import { Button } from './button';

export function Modal() {
  const [modalVisible, setModalVisible] = useState(false);
  const { data } = useQuery({ 
    queryKey: ['user-me'], 
    queryFn: getMeService
  })

  useEffect(() => {
    if (!data?.user) return
    if (data?.user.leveled_up) setModalVisible(true)
  }, [data])

  return (
    <View className='flex-1 justify-center items-center mt-6'>
      <RNModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View className='flex-1 justify-center items-center mt-6'>
          <View style={styles.modalView}>
            <Stars />
            <Text className='text-2xl mt-8'>Parabéns!</Text>
            <Text className='text-zinc-600 mb-8'>Você subiu de nível!</Text>
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Button>
          </View>
        </View>
      </RNModal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});