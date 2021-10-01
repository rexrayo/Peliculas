// @ts-nocheck
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Movie } from '../interfaces/MovieInterface';
import { DetailScreen } from '../screens/DetailScreen';

interface Props {
    movie: Movie;
    height?: number,
    width?: number,
}

export const MoviePoster = ( { movie, height = 380, width = 240 }: Props ) => {

    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            activeOpacity={ 0.9 }
            onPress={ () => navigation.navigate('DetailScreen', movie)}
            style={{
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7
            }}
        >
            <View style={ styles.imageContainer }>
                <Image
                    source={{ uri }}
                    style={ styles.image }
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,

        elevation: 10,
    }
});
