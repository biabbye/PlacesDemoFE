import {React,useState,useEffect,useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image,FlatList,ActivityIndicator } from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import {useFonts} from 'expo-font';
import axios from 'axios';
import { config } from '../../urlConfig';
import { AuthContext } from '../../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import { fetchEvents } from '../../Features/Api/apiSlice'

const eventData = [
    {
        'id':1,
        'eventName':'TechMania',
        'eventDescription':'Bla bla bla',
        'maxParticipants' : 100,
        'date':'June 30'
    },
    {
        'id':2,
        'eventName':'LaMisto',
        'eventDescription':'Bla bla bla',
        'maxParticipants' : 30,
        'date':'June 30'
    },
    {
        'id':3,
        'eventName':'Mia Musica',
        'eventDescription':'Bla bla bla',
        'maxParticipants' : 50,
        'date':'June 30'
    },
    
]

const Events = () => {
    //const {phoneNumber} = useContext(AuthContext);
    const [selectedEvent, setSelectedEvent] = useState();
    const [eventsArray,setEventsArray] = useState();

    const dispatch = useDispatch();
    const apiState = useSelector((state) => state.api);
  

    const handleCardPress = (item) => {
        setSelectedEvent(item.id);
    };
    
    useEffect(() => {
      dispatch(fetchEvents());
    },[dispatch]);

useEffect(() => {
  if(apiState.eventsData)
  {
    console.log("AICI EVENTURILE",apiState.eventsData);
    setEventsArray(apiState.eventsData);
  }
},[apiState.eventsData,dispatch]);

    let [fontsLoaded] = useFonts({
        'DMBold' : require('../../../assets/fonts/DMSans-Bold.ttf'),
        'DMMedium': require('../../../assets/fonts/DMSans-Medium.ttf'),
        'DMRegular' : require('../../../assets/fonts/DMSans-Regular.ttf')
       })
      
      
       useEffect(() => {
        async function prepare() {
          await SplashScreen.preventAutoHideAsync();
        }
        prepare();
      }, []);
      
      if (!fontsLoaded) {
        return undefined;
      }else {
        SplashScreen.hideAsync();   
      }

      const EventCard = ({item,selectedEvent, handleCardPress}) => {

        const dateObj = new Date(item.eventTime.toString());
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const hour = dateObj.getHours();

        const displayString = `${day} ${month}-${hour}:00`;
        return (
            <TouchableOpacity
              style={styles.containerCard(selectedEvent, item)}
              onPress={() => handleCardPress(item)}
            >
              <View style={styles.eventHeader}>
                <TouchableOpacity style={styles.logoContainer(selectedEvent, item)}>
                  <Image
                    source={require('../../../assets/DefaultEventImage.png')} 
                    resizeMode='contain'
                    style={styles.logoImage}
                  />
                  <Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.joinBtn}>
                  <Text style={styles.joinBtnText}>Join Event</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.companyName} numberOfLines={1}>
                {item.eventDescription}
              </Text>
        
              <View style={styles.infoContainer}>
                <Text style={styles.jobName(selectedEvent, item)} numberOfLines={1}>
                  {item.eventName}
                </Text>
                <View style={styles.infoWrapper}>
                  <Text style={styles.publisher(selectedEvent, item)}>
                    {displayString} - 
                  </Text>
                  <Text style={styles.location}> Max Participans : {item?.maxParticipants}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        };

      return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.headerTitle}>Popular Events</Text>
            <TouchableOpacity>
                <Text style={styles.headerBtn}>Show all</Text>
            </TouchableOpacity>
            </View>
    
            <View style={styles.cardsContainer}>        
            
                <FlatList
                data={eventsArray}
                renderItem={({ item }) => (
                    <EventCard
                        item={item}
                        selectedEvent={selectedEvent}
                        handleCardPress={handleCardPress}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ columnGap: 16 }}
                horizontal
                />
            
            </View>
        </View>
      )
}

export default Events;

const styles = StyleSheet.create({
    container: {
      marginTop: 24,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    eventHeader:{
      flexDirection: "row",
      justifyContent: "space-between",
    },
    joinBtn:{
      backgroundColor: "#901f8f",
        borderRadius: 20, 
        marginTop:3,
        marginBottom:15,
        paddingHorizontal: 10,
        paddingVertical: 8,

    },
    joinBtnText:{
      color:'#F3F4F8',
      fontFamily:'DMBold'
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: "DMMedium",
      color: "#312651",
    },
    headerBtn: {
      fontSize: 16,
      fontFamily: "DMMedium",
      color: "#83829A",
    },
    cardsContainer: {
      marginTop: 16,
    },
    containerCard: (selectedEvent, item) => ({
        width: 250,
        padding: 24,
        backgroundColor: selectedEvent === item.id ? "#312651" : "#FFF",
        borderRadius:16,
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
        shadowColor: "#F3F4F8",
      }),
      logoContainer: (selectedEvent, item) => ({
        width: 50,
        height: 50,
        backgroundColor: selectedEvent === item.id ? "#FFF" : "#F3F4F8",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
      }),
      logoImage: {
        width: "70%",
        height: "70%",
      },
      companyName: {
        fontSize: 16,
        fontFamily: 'DMRegular',
        color: "#B3AEC6",
        marginTop: 10 / 1.5,
      },
      infoContainer: {
        marginTop: 20,
      },
      jobName: (selectedEvent, item) => ({
        fontSize: 20,
        fontFamily: 'DMMedium',
        color: selectedEvent === item.id ? "#F3F4F8" : "#312651",
      }),
      infoWrapper: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "flex-start",
        alignItems: "center",
      },
      publisher: (selectedEvent, item) => ({
        fontSize: 16 - 2,
        fontFamily: 'DMRegular',
        color: selectedEvent === item.id ? "#F3F4F8" : "#312651",
      }),
      location: {
        fontSize: 16 - 2,
        fontFamily: 'DMRegular',
        color: "#B3AEC6",
      },
  });
  

