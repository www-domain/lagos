import axios from "axios";

export const verifyFaceService = (ninFace: string, capturedFace: string) => {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      image: {
        format: "JPEG",
        template: ninFace, // face from nin
      },
      imageToVerifyAgainst: {
        format: "JPEG",
        template: capturedFace, // face from capture
      },
      level: "HIGH",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_FACE_VERIFICATION,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        const dataLoad = response.data;
        if (dataLoad.score > 1) {
          dataLoad.score = 1;
        } else if (dataLoad.score < 0) {
          dataLoad.score = 0;
        }
        resolve(dataLoad);
      })
      .catch((error: unknown) => {
        throw error;
      });
  });
};