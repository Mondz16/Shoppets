/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Pressable, View ,TextInput} from 'react-native';
import styles from './style.js';
import colors from '../../constant/color';

const InputSearch = ({
    showSearchIcon,
    pressable,
    placeholderText,
    onPress,
    onChangeText,
    style,
}) => {
    const renderInput = () => (
        <View style={[styles.container, style]}>
            <TextInput
                editable={!pressable}
                placeholderTextColor={colors.lighBlue}
                style={styles.input}
                placeholder={placeholderText}
                onChangeText={onChangeText}
            />
            {showSearchIcon ? (
                <Image
                    style={styles.icon}
                    source={require('../../assets/search.png')}
                />
            ) : null}
        </View>
    );

    if (pressable) {
        return (
            <Pressable onPress={onPress}>
                {renderInput()}
            </Pressable>
        );
    }

    return renderInput();
};

InputSearch.defaultProps = {
    showSearchIcon: true,
    placeholderText: 'Search',
};

export default React.memo(InputSearch);
