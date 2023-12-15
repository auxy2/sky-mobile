import { Platform } from "react-native";

export const createFormData = (photos = [], body = {}) => {
  const data = new FormData();

  if (photos.length === 1) {
    data.append("profilePhoto", {
      name: "profilePhoto",
      type: photos[0].type,
      uri:
        Platform.OS === "ios"
          ? photos[0].uri.replace("file://", "")
          : photos[0].uri,
    });
  } else {
    photos.forEach((photo, index) => {
      data.append(`profilePhoto${index}`, {
        name: `profilePhoto${index}`,
        type: photo.type,
        uri:
          Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
      });
    });
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};
