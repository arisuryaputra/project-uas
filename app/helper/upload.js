const gc = require("../../app/config/gc.config.js");
const { format } = require("util"); // Add this line to import the 'format' function

const bucket = gc.bucket("bucket-galeri"); // should be your bucket name

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", (error) => {
        // Include the error parameter in the callback
        reject(`Unable to upload image, something went wrong: ${error}`);
      })
      .end(buffer);
  });
};

module.exports = uploadImage;
