import { View, TouchableOpacity, Image, FlatList } from "react-native";
import React, { PureComponent } from "react";
import ImageSlider from "react-native-image-slider";
import styles from "./src/style/styles";
import SliderHeader from "./src/component/SliderHeader";
import Video from "react-native-video";

export const validateMediaType = path => {
  let mediaType = path
    .toString()
    .toLowerCase()
    .split(".");

  mediaType = mediaType[mediaType.length - 1];

  // allowed data types png': 1,'.jpg': 1, '.jpeg': 1,  '.pdf': 1,  '.doc': 1,   '.docx': 1, '.csv': 1,'.xls': 1,'.xlsx': 1,'.xlsm': 1,'.txt': 1,'.gif': 1
  let allowedExtensionForImage = ["jpeg", "jpg", "png", "PNG", "gif"];
  let allowedExtensionForDocument = [
    "pdf",
    "doc",
    "docx",
    "csv",
    "xls",
    "xlsx",
    "xlsm",
    "txt"
  ];

  let allowedExtensionForVideo = ["mp4"];
  let allowedExtensionForAudio = ["mp3"];
  let isValidImage = false;
  let isValidDoc = false;
  let isValidAudio = false;
  let isValidVideo = false;
  for (let i in allowedExtensionForImage) {
    if (mediaType == allowedExtensionForImage[i]) {
      isValidImage = true;
      break;
    }
  }
  if (!isValidImage) {
    for (let i in allowedExtensionForDocument) {
      if (mediaType == allowedExtensionForDocument[i]) {
        isValidDoc = true;
        break;
      }
    }
    if (!isValidDoc) {
      for (let i in allowedExtensionForDocument) {
        if (mediaType == allowedExtensionForAudio[i]) {
          isValidAudio = true;
          break;
        }
      }
      if (isValidAudio) {
        return "audio";
      } else {
        for (let i in allowedExtensionForVideo) {
          if (mediaType == allowedExtensionForVideo[i]) {
            isValidVideo = true;
            break;
          }
        }
        if (isValidVideo) return "video";
      }
    } else {
      // return this.renderDocument(item, key);
      return "doc";
    }
  } else {
    // return this.renderImage(item, key);
    return "image";
  }
};

export default class BlobViewer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      isDelete: false,
      mediaList: [],
      images: []
    };
  }

  defaultFunction = () => {
    let { mediaList } = this.props;

    let image = mediaList.map(value => value.uri);

    this.setState({
      mediaList: mediaList,
      images: image
    });
  };

  renderDocuments = item => {
    switch (validateMediaType(item.uri)) {
      case "image":
        return this.renderImage(item.uri, styles.customImage);
      case "audio":
        return this.renderAudioPlayer(item);
      case "video":
        return this.renderVideoPlayer(item);
      case "doc":
        return (
          <Image
            source={require("./src/image/file.png")}
            style={styles.fileImage}
          />
        );

      default:
        return;
    }
  };

  renderVideoPlayer(item) {
    return (
      <Video
        source={{ uri: item.uri }} // Can be a URL or a local file.
        ref={ref => {
          this.player = ref;
        }} // Store reference
        fullscreen={true}
        audioOnly={true}
        paused={true}
        resizeMode="contain"
        controls={true}
        // onBuffer={this.onBuffer} // Callback when remote video is buffering
        // onError={this.videoError} // Callback when video cannot be loaded
        //   resizeMode="stretch"
        onBuffer={val => {
          console.log("Buffering", val);
        }} // Callback when remote video is buffering
        onError={val => {
          console.log("error", val);
        }}
        style={{
          height: "100%",
          width: 400,
          backgroundColor: "red"
          // position: 'absolute',
          // top: 0,
          // left: 0,
          // bottom: 0,
          // right: 0,
        }}
      />
    );
  }
  renderAudioPlayer(item) {
    // console.log(item.uri);
    return (
      <Video
        source={{ uri: item.uri }} // Can be a URL or a local file.
        ref={ref => {
          this.player = ref;
        }} // Store reference
        fullscreen={true}
        audioOnly={true}
        paused={true}
        resizeMode="contain"
        controls={true}
        // onBuffer={this.onBuffer} // Callback when remote video is buffering
        // onError={this.videoError} // Callback when video cannot be loaded
        //   resizeMode="stretch"
        onBuffer={val => {
          console.log("Buffering", val);
        }} // Callback when remote video is buffering
        onError={val => {
          console.log("error", val);
        }}
        style={{
          height: "100%",
          width: 400,
          backgroundColor: "blue"
          // position: 'absolute',
          // top: 0,
          // left: 0,
          // bottom: 0,
          // right: 0,
        }}
      />
    );
  }

  renderThumbnail = item => {
    switch (item.type.split("/")[0]) {
      case "image":
        return this.renderImage(item.uri, styles.thumbnailImage);
      case "audio":
        return (
          <Image
            source={require("./src/image/audioIcon.png")}
            style={styles.thumbnailImage}
          />
        );
      case "video":
        return (
          <Image
            source={require("./src/image/videoIcon2.png")}
            style={styles.thumbnailImage}
          />
        );
      case "file":
        return (
          <Image
            source={require("./src/image/docIcon.png")}
            style={styles.thumbnailImage}
          />
        );
    }
  };

  renderImage(uri, styles) {
    return <Image source={{ uri: uri }} style={styles} />;
  }

  componentDidMount() {
    this.defaultFunction();
  }

  deleteCurrentImage = () => {
    let { images, mediaList } = this.state;
    let filteredImage = images.filter(
      (item, i) => i !== this.state.currentImageIndex
    );
    let filteredArray = mediaList.filter(
      (item, i) => i !== this.state.currentImageIndex
    );

    if (filteredImage.length == 0) {
      this.BackButtonFunc();
      this.defaultFunction();
    } else {
      this.setState({
        images: filteredImage,
        mediaList: filteredArray,
        isDelete: true
      });
    }
  };

  BackButtonFunc = () => {
    this.props.onBack();
    this.componentDidMount();
  };
  onSend = () => {
    let { mediaList } = this.state;
    this.props.onSend((selectedImages = mediaList));
  };

  renderSlider() {
    let { mediaList } = this.state;

    return (
      <ImageSlider
        images={mediaList}
        style={styles.slider}
        customButtons={(position, move) => (
          <FlatList
            horizontal={true}
            ref={ref => {
              this.flatListRef = ref;
            }}
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailImageView}
            data={mediaList}
            extraData={mediaList}
            keyExtractor={(item, i) => i}
            renderItem={({ item, index }) => {
              if (this.state.isDelete) {
                if (position > 0) {
                  move(position - 1);
                  this.setState({ isDelete: false });
                }
              }
              if (position === index) {
                this.setState({
                  currentImageIndex: index
                });
              }

              return (
                <TouchableOpacity
                  key={index}
                  onPressIn={() => move(index)}
                  style={styles.thumbnailImageBtn}
                >
                  <View
                    style={position === index && styles.thumbnailCurrentImage}
                  >
                    {this.renderThumbnail(item)}
                  </View>
                </TouchableOpacity>
              );
              // }
            }}
          />
        )}
        customSlide={({ index, item, style }) => (
          <TouchableOpacity
            key={index}
            style={[style, styles.customSlide]}
            onPressOut={() => this.SliderMove()}
          >
            {this.renderDocuments(item)}
          </TouchableOpacity>
        )}
      />
    );
  }

  SliderMove = () => {
    setTimeout(() => {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: this.state.currentImageIndex
      });
    }, 450);
  };

  render() {
    let { visible, images, showSendButton, showDeleteButton } = this.props;
    if (visible) {
      return (
        <View style={styles.container}>
          <SliderHeader
            {...this.state}
            showSendButton={showSendButton}
            showDeleteButton={showDeleteButton}
            BackButtonFunc={this.BackButtonFunc}
            deleteCurrentImage={this.deleteCurrentImage}
            onSend={this.onSend}
          />
          {images && this.renderSlider()}
          {this.renderSlider()}
        </View>
      );
    } else {
      return null;
    }
  }
}
