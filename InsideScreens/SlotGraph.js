// // import { StyleSheet, Text, View, ScrollView } from 'react-native';
// // import React from 'react';
// // import { useNavigation, useRoute } from '@react-navigation/native';

// // const SlotGraph = () => {
// //     const navigation = useNavigation();
// //     const route = useRoute();
// //     const { item } = route.params;
// //     console.log("SlotData: ", item);

// //     return (
// //         <ScrollView style={styles.container}>
// //             <Text style={styles.title}>Slot Data Overview</Text>
// //             <Text style={styles.subtitle}>Bilateral Left:</Text>
// //             <Text style={styles.data}>{item.BilateralLeft.length > 0 ? item.BilateralLeft.join(', ') : 'No data'}</Text>
// //             <Text style={styles.subtitle}>Bilateral Right:</Text>
// //             <Text style={styles.data}>{item.BilateralRight.length > 0 ? item.BilateralRight.join(', ') : 'No data'}</Text>
// //             <Text style={styles.subtitle}>Incisors:</Text>
// //             <Text style={styles.data}>{item.Incisors.length > 0 ? item.Incisors.join(', ') : 'No data'}</Text>
// //             <Text style={styles.subtitle}>Unilateral Left:</Text>
// //             <Text style={styles.data}>{item.UnilateralLeft.length > 0 ? item.UnilateralLeft.join(', ') : 'No data'}</Text>
// //             <Text style={styles.subtitle}>Unilateral Right:</Text>
// //             <Text style={styles.data}>{item.UnilateralRight.length > 0 ? item.UnilateralRight.join(', ') : 'No data'}</Text>
// //             <Text style={styles.subtitle}>Max Bilateral Left:</Text>
// //             <Text style={styles.data}>{item.MaxBilateralLeft}</Text>
// //             <Text style={styles.subtitle}>Max Bilateral Right:</Text>
// //             <Text style={styles.data}>{item.MaxBilateralRight}</Text>
// //             <Text style={styles.subtitle}>Max Incisors:</Text>
// //             <Text style={styles.data}>{item.MaxIncisors}</Text>
// //             <Text style={styles.subtitle}>Max Unilateral Left:</Text>
// //             <Text style={styles.data}>{item.MaxUnilateralLeft}</Text>
// //             <Text style={styles.subtitle}>Max Unilateral Right:</Text>
// //             <Text style={styles.data}>{item.MaxUnilateralRight}</Text>
// //         </ScrollView>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         padding: 15,
// //     },
// //     title: {
// //         fontSize: 24,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //     },
// //     subtitle: {
// //         fontSize: 18,
// //         fontWeight: '600',
// //         marginTop: 10,
// //     },
// //     data: {
// //         fontSize: 16,
// //         marginBottom: 10,
// //         color: '#333',
// //     },
// // });

// // export default SlotGraph;

// import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
// import React from 'react';
// import { useRoute } from '@react-navigation/native';

// const SlotGraph = () => {
//     const route = useRoute();
//     const { item } = route.params;

//     const renderData = (title, data) => (
//         <View style={styles.dataContainer}>
//             <Text style={styles.subtitle}>{title}</Text>
//             <View style={styles.dataContent}>
//                 {data.length > 0 ? (
//                     <FlatList
//                         data={data}
//                         renderItem={({ item }) => <Text style={styles.dataItem}>{item}</Text>}
//                         keyExtractor={(item, index) => index.toString()}
//                     />
//                 ) : (
//                     <Text style={styles.noData}>No data</Text>
//                 )}
//             </View>
//         </View>
//     );

//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.title}>Slot Data Overview</Text>
//             {renderData('Bilateral Left', item.BilateralLeft)}
//             {renderData('Bilateral Right', item.BilateralRight)}
//             {renderData('Incisors', item.Incisors)}
//             {renderData('Unilateral Left', item.UnilateralLeft)}
//             {renderData('Unilateral Right', item.UnilateralRight)}
//             <View style={styles.dataContainer}>
//                 <Text style={styles.subtitle}>Max Bilateral Left:</Text>
//                 <Text style={styles.dataItem}>{item.MaxBilateralLeft}</Text>
//             </View>
//             <View style={styles.dataContainer}>
//                 <Text style={styles.subtitle}>Max Bilateral Right:</Text>
//                 <Text style={styles.dataItem}>{item.MaxBilateralRight}</Text>
//             </View>
//             <View style={styles.dataContainer}>
//                 <Text style={styles.subtitle}>Max Incisors:</Text>
//                 <Text style={styles.dataItem}>{item.MaxIncisors}</Text>
//             </View>
//             <View style={styles.dataContainer}>
//                 <Text style={styles.subtitle}>Max Unilateral Left:</Text>
//                 <Text style={styles.dataItem}>{item.MaxUnilateralLeft}</Text>
//             </View>
//             <View style={styles.dataContainer}>
//                 <Text style={styles.subtitle}>Max Unilateral Right:</Text>
//                 <Text style={styles.dataItem}>{item.MaxUnilateralRight}</Text>
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//         padding: 15,
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#6200ee',
//         marginBottom: 20,
//     },
//     dataContainer: {
//         marginBottom: 20,
//         padding: 10,
//         backgroundColor: '#ffffff',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     subtitle: {
//         fontSize: 20,
//         fontWeight: '600',
//         color: '#333333',
//         marginBottom: 10,
//     },
//     dataContent: {
//         paddingVertical: 5,
//     },
//     dataItem: {
//         fontSize: 16,
//         color: '#333333',
//     },
//     noData: {
//         fontSize: 16,
//         color: '#666666',
//         textAlign: 'center',
//     },
// });

// export default SlotGraph;

import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const SlotGraph = () => {
    const route = useRoute();
    const { item } = route.params;

    const renderData = (title, data) => (
        <View style={styles.dataContainer}>
            <Text style={styles.subtitle}>{title}</Text>
            <View style={styles.dataContent}>
                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Text style={styles.dataItem}>{item}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={styles.noData}>No data</Text>
                )}
            </View>
        </View>
    );

    const dataList = [
        { title: 'Bilateral Left', data: item.BilateralLeft },
        { title: 'Bilateral Right', data: item.BilateralRight },
        { title: 'Incisors', data: item.Incisors },
        { title: 'Unilateral Left', data: item.UnilateralLeft },
        { title: 'Unilateral Right', data: item.UnilateralRight },
        { title: 'Max Bilateral Left', data: [item.MaxBilateralLeft] },
        { title: 'Max Bilateral Right', data: [item.MaxBilateralRight] },
        { title: 'Max Incisors', data: [item.MaxIncisors] },
        { title: 'Max Unilateral Left', data: [item.MaxUnilateralLeft] },
        { title: 'Max Unilateral Right', data: [item.MaxUnilateralRight] },
    ];

    return (
        <FlatList
            data={dataList}
            renderItem={({ item }) => renderData(item.title, item.data)}
            keyExtractor={(item) => item.title}
            ListHeaderComponent={<Text style={styles.title}>Slot Data Overview</Text>}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6200ee',
        marginBottom: 20,
    },
    dataContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 10,
    },
    dataContent: {
        paddingVertical: 5,
    },
    dataItem: {
        fontSize: 16,
        color: '#333333',
    },
    noData: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
});

export default SlotGraph;
