import isDarkTheme from './isDarkTheme'

const Colors = {
    view: {
        bg: isDarkTheme() ? '#111111' : '#ffffff',
        text: isDarkTheme() ? '#efefef' : '#222222',
    },
    ui: {
        primary: isDarkTheme() ? '#29B6F6' : '#01579B',
        text: isDarkTheme() ? '#DE000000' : '#DEFFFFFF',
        text_pop: isDarkTheme() ? '#000000' : '#FFFFFF',
        warn: isDarkTheme() ? '#FF7043' : '#FF5722',
        fail: isDarkTheme() ? '#EF5350' : '#B71C1C',
        bg: isDarkTheme() ? '#212121' : '#DEDEDE',
        bg_80: isDarkTheme() ? '#CC212121' : '#CCff00ff', //light not set
        bg_raised_1: isDarkTheme() ? '#424242' : '#ff00ff', //light not set
        bg_raised_08: isDarkTheme() ? '#3C3C3C' : '#ff00ff', //light not set
    },
    brand: {
        primary: "#696AC3",
        secondary: "#5D6CC6",
        muted: "#C6DAF7",
    }, 
    bg: {
        primary: "#FFFFFF",
        secondary: "#F1F1F1",
    },
    text: {
        primary: "#262626",
        secondary: "#757575",
        disabled: "#9C9C9C",
        inverse: "#FFFFFF",
        error: "#D0421B",
        success: "#138000",
    },
};

export default Colors