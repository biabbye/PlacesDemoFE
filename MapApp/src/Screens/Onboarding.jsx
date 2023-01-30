import { View, Text,StyleSheet,FlatList,Animated } from 'react-native'
import React,{useState,useRef} from 'react'
import slides from '../Components/Onboarding/slides'
import OnboardingItem from '../Components/Onboarding/OnboardingItem';
import Paginator from '../Components/Onboarding/Paginator';
import NextButton from '../Components/Onboarding/NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

    const scrollTo = async () => {
        if(currentIndex < slides.length -1)
        {
            slidesRef.current.scrollToIndex({index:currentIndex + 1});
        }else{
            try{
                // await AsyncStorage.setItem('@viewedOnboarding','true');
                navigation.replace('DrawerNav');

            }catch(err) {
                console.log('Error @setItem',err);
            }
        }
    }


  return (
    <View style={styles.container}>
        <View style={{flex:3}}>
            <FlatList 
                data={slides} 
                renderItem={ ({item}) => <OnboardingItem item={item} />}
                horizontal 
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item)=> item.id}
                onScroll={Animated.event([{nativeEvent: { contentOffset: {x : scrollX } } }], {
                    useNativeDriver:false,
                })}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}

            />
        </View>

        <Paginator data={slides} scrollX={scrollX}/>
        <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
    
    </View>
    
  )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#fff',
    }
})