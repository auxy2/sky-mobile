import React from "react";
import { api } from '../util/auth';
import { StatusBar } from "expo-status-bar";
import { Video, ResizeMode } from 'expo-av';
import { View, Image, StyleSheet, ScrollView, Pressable } from "react-native";

//////components--------
import {
    Colors,
    ScreenTitles,
    MainContainer,
    TutorialsTitle,
    StyledContainer,
    ContentMarginTop,
    TutorialsContainer,
    TutorialTitleContainer

} from '../styles/styles';
import { SafeAreaView } from "react-native-safe-area-context";

const VideoComponent = ({ item }) => {
    const videoRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handlePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current?.pauseAsync();
            } else {
                await videoRef.current?.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return <Pressable onPress={handlePlayPause}>
        <View style={styles.imageContainer}>
            <Image
                // source={{uri:item.image}}
                style={styles.backgroundImage}
            />
        </View>
        <View>
            <Video
                style={styles.video}
                source={{ uri: item.video }}

                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
            // onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <TutorialTitleContainer>
                <TutorialsTitle>{item?.title}</TutorialsTitle>
            </TutorialTitleContainer>
        </View>
    </Pressable>;
};


export default ({ navigation }) => {
    const [videos, setVideos] = React.useState([]);

    React.useEffect(() => {
        if (videos.length === 0) fetch();
    }, []);

    const fetch = async () => {
        try {
            let res = await api.get('Admin/AllTutorial');
            console.log(res.data);
            setVideos(res.data.AllTutorials);
        } catch (error) {
            console.error(error);
        };
    };

    return <SafeAreaView style={{ flex: 1 }}>
        <StyledContainer>
            <StatusBar style="light" backgroundColor={Colors.backgroundColor} />
            <MainContainer>
                <ScreenTitles>Tutorials</ScreenTitles>
                <ContentMarginTop />
                <ScrollView>
                    <TutorialsContainer>
                        {videos.map((item, index) => <VideoComponent item={item} key={index} />)}
                    </TutorialsContainer>
                </ScrollView>
            </MainContainer>
        </StyledContainer>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        position: 'absolute',
        zIndex: 2,
    },
    backgroundImage: {
        width: '100%',
        height: 200,
    },
});
