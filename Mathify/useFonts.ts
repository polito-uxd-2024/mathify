import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

const useFonts = async () => {
    await Font.loadAsync({
        'Itim': require('./assets/fonts/Itim-Regular.ttf'),
    });
};

export default useFonts;