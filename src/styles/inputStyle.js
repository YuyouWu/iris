import { StyleSheet } from 'react-native'

export default inputStyle = StyleSheet.create({
    lightContainer: {
        backgroundColor: 'white',
        borderBottomColor: '#EDEDED',
        marginBottom: 10
    },
    darkContainer: {
        backgroundColor: 'black',
        borderBottomColor: '#EDEDED',
        marginBottom: 10
    },
    input: {
        color: 'white',
    },
    lightInputContainer: {
        backgroundColor: '#EDEDED',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 0 //hide underline for input
    },
    darkInputContainer: {
        backgroundColor: '#333333',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 0 //hide underline for input
    },
    placeHolderColor: {
        color: '#b3b3b3'
    }
});