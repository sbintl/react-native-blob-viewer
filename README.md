# react-native-blob-viewer

React Native Pre-attachment blob viewer for multiple file types in a gallery view

# Installation

This library is available on npm, install it with:

> npm i react-native-blob-viewer

or using yarn

> yarn add react-native-blob-viewer

# Usage

1: Import react-native-blob-viewer:

`import BlobViewer from 'react-native-blob-viewer';`

2: Inside Render():

```javascript
<BlobViewer
  mediaList={data}
  visible={true}
  onSend={selectedImages => this.selectedImages(selectedImages)}
  onBack={this.openUploadImage}
/>
```

3: Show/Hide Viewer:

```javascript
....
visible={true} or {false}
....
```

# A Complete Code Example:

```javascript
import BlobViewer from 'react-native-blob-viewer';

this.state={
	   allPath: [
        {
          filename: 'image-f260adeb-15bf-4673-9fae-45846211ce77.jpg',
          size: 0,
          type: 'file/text.txt',
          uri: 'https://www.w3schools.com/html/movie.mp4',
        },
        {
          filename: 'image-f260adeb-15bf-4673-9fae-45846211ce77.jpg',
          size: 0,
          type: 'image/jpeg',
          uri: 'https://placeimg.com/640/640/nature',
        },
        {
          filename: 'image-f260adeb-15bf-4673-9fae-45846211ce77.jpg',
          size: 0,
          type: 'image/jpeg',
          uri: 'https://placeimg.com/640/640/people',
        },
      ],
      isGalleryViewVisible: true,
};

openUploadImage = () => {
    this.setState({isGalleryViewVisible: !this.state.isGalleryViewVisible});
  };

 selectedImages = selectedImages => {
    console.log('send image', selectedImages);
  };

render(){
	retrun(
	....
 	<BlobViewer
          mediaList={data}
          visible={this.state.isGalleryViewVisible}
          onSend={selectedImages => this.selectedImages(selectedImages)}
          onBack={this.openUploadImage}
        />
	.....
	)
}
```

# Available props

| Name    | Type  | default | description                                       |
| ------- | ----- | ------- | ------------------------------------------------- |
| allPath | array | -       | array of objects eg: [ { filename,size,type,uri}] |
| visible | bool  | -       | true/false to show or hide viewer                 |
| onSend  | func  | -       | retrun final selected array                       |
| onBack  | func  | -       | when click on back do something                   |

---

###### Pull requests, feedbacks and suggestions are welcome!
