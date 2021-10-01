import React from 'react'
import { Image, StyleSheet, View, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../navigation/Navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ( { route, navigation }: Props) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const { isLoading, cast, movieFull } = useMovieDetails( movie.id );

    return (
        <ScrollView>
            <View style={ styles.imageContainer }>
                <Image
                    source={{ uri }}
                    style={ styles.image }
                    />
            </View>
            <View style={ styles.marginContainer }>
                <Text style={ styles.subTitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>
            {
                isLoading 
                ? <ActivityIndicator size={ 35 } color='grey' style={{ marginTop: 10 }}/>
                : <MovieDetails movieFull={ movieFull! } cast={ cast }/> 
            }

            {/* Boton para cerrar */}
            <View style={ styles.backButton }>
                <TouchableOpacity onPress={ () => navigation.pop() } activeOpacity={ 0.7 }>
                    <Icon
                        color='white'
                        name='arrow-back-outline'
                        size={ 60 }
                        
                        />
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,

        elevation: 10,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 15
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 19,
        top: 30,
        left: 5
    }
});
