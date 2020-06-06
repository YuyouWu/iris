import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primaryText: "black",
        secondaryText: "#535353",
        tileBackground: DefaultTheme.colors.card,
        divider: "#B9B9B9"
    }
}

const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primaryText: "#E5E5E7",
        secondaryText: "#C2C2C2",
        tileBackground: "#1D1E20",
        divider: "#474747"
    }
}

export default function Theme() {
    return ({
        lightTheme: lightTheme,
        darkTheme: darkTheme,
    })
}