import { ScrollView, View,  Text, StyleSheet, Pressable, Modal, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import exercises from '../../assets/data/exercises.json';

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        const displayModal = async() =>{
            try{
                const value = await AsyncStorage.getItem('modalShown');
                if(value === null){
                    await AsyncStorage.setItem('modalShown', 'true');
                    setModalVisible(true);
                }
            }catch(e){
                console.log(e);
            }
        };
        
        displayModal();
    },[]);

    const explore = () => {
        console.warn("Pressed");
    };

    const renderItem = ({item}) => {
        console.log(item);
        return (<View>
            <Text>{item.description}</Text>
        </View>);
    }

    return (
        <View >
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={()=>{setModalVisible(false)}}
        
            >
                <Text style={styles.heading2}>DISCLAIMER!</Text>
                <ScrollView style={styles.modalContainer}>
                    <Text style={styles.modal}>The exercises provided in this app are designed to complement a therapeutic regimen and are intended for individuals recovering from injuries under the guidance of a healthcare professional. It is essential to follow the recommendations of your doctor or physical therapist regarding which exercises are appropriate for your specific condition.{'\n'}
While these exercises are curated to assist in the rehabilitation process, it is imperative to consult with your doctor or therapist before initiating any exercise routine, especially if you are recovering from an injury or undergoing medical treatment.{'\n'}
Please be aware that these exercises are recommendations and may not be suitable for everyone, depending on the nature and severity of your injury. Always listen to your body and proceed with caution. Discontinue any exercise that causes pain, discomfort, or exacerbates your symptoms, and consult with your healthcare provider immediately.{'\n'}
By utilizing this app and engaging in the recommended exercises, you acknowledge that you are doing so at your own risk. The creators and developers of this app bear no responsibility for any injuries or adverse effects that may occur as a result of participating in these exercises.

Your health and recovery are of paramount importance. Prioritize your well-being by seeking professional medical advice and guidance before embarking on any new exercise regimen.
</Text>
                </ScrollView>
                <Pressable onPress={()=>setModalVisible(false)} style={styles.button}>
                    <Text style={styles.buttonText}>Accept</Text>
                </Pressable>
            </Modal>


            <View style={styles.container}>
                <Text style={styles.heading1}>Heal<Text style={styles.x}>X</Text>ercise</Text>
            </View>

            <View style={styles.explore}>
                <Text style={styles.heading2}>Explore New Exercises</Text>
                <Pressable onPress={explore} style={styles.button}>
                    <Text style={styles.buttonText}>Explore</Text>
                </Pressable>
            </View>

            <Pressable onPress={explore} style={styles.button}>
                    <Text style={styles.buttonText}>Go to my Exercises</Text>
            </Pressable>
                
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
    },
    heading1: {
        fontSize: 50,
        textAlign: 'center',
    },
    x: {
        color: 'red',
    },
    explore: {
        margin: 30,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
    },
    heading2: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        marginTop: 20,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: "dodgerblue",
        borderRadius: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        padding: 10,
    },
    modal: {
        width: '85%',
        textAlign: 'justify',
        fontSize: 15,
        alignSelf: 'center',
        color: 'gray',
    },
    modalContainer: {
        marginTop: 50,
    },
    exercises: {
        width: '85%'
    },
});


export default HomeScreen;
