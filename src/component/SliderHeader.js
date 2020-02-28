import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../style/styles";

export default class SliderHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { showSendButton, showDeleteButton } = this.props;
    return (
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={this.props.BackButtonFunc}>
          <Image
            style={styles.backIcon}
            source={require("../image/backIcon.png")}
          />
        </TouchableOpacity>

        {showDeleteButton && showSendButton ? (
          <View style={styles.deleteSendBox}>
            {showDeleteButton ? (
              <TouchableOpacity onPress={this.props.deleteCurrentImage}>
                <Image
                  style={styles.trashBtn}
                  source={require("../image/deleteFilled.png")}
                />
              </TouchableOpacity>
            ) : null}
            {showSendButton ? (
              <TouchableOpacity onPress={this.props.onSend}>
                <Image
                  style={styles.sendBtn}
                  source={require("../image/sendIcon.png")}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}
