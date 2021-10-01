import React from 'react'
import { FlatList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/MovieInterface';

import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ( { movieFull, cast }: Props ) => {
    return (
        <>
            <View style={{ marginHorizontal: 20}}>
                {/* Details */}
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name='star-outline'
                        color='grey'
                        size={ 16 }
                        style={{ marginRight: 5 }}
                    />         
                    <Text>{ movieFull.vote_average }</Text>     
                    <Text>
                       { '' } - { movieFull.genres.map( g => g.name).join(', ') }    
                    </Text>  
                </View>

                {/* Overview */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Historia
                </Text>
                <Text style={{ fontSize: 16 }}>{ movieFull.overview }</Text>   

                {/* Budget */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>
                <Text style={{ fontSize: 18 }}>
                    { currencyFormatter.format(movieFull.budget, { code: 'USD'}) }
                </Text>   

                {/* Cast */}
                <View style={{ marginTop: 10, marginBottom: 100 }}>
                    <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                        Actores
                    </Text>

                    <FlatList
                        style={{ marginTop: 10, height: 70 }}
                        data={ cast }
                        keyExtractor={ (item) => item.id.toString() }
                        renderItem={({ item }) => <CastItem actor={ item }/> }
                        horizontal={ true }
                        showsHorizontalScrollIndicator={ false }
                    />

                </View>
            </View>
        </>
    )
}
