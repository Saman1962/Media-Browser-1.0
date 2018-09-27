const mongoose = new require('mongoose');
const Schema = mongoose.Schema;

let GallerySchema = new Schema(
  {
    images: {
      type: Array,
      properties: {
        type: Object,
        properties: {
          path: {type: String},
          name: {type: String},
          image: {
            type: Object,
            properties: {
              path: {type: String},
              fullpath: {type: String},
              name: {type: String},
              modified: {type: Date, default: Date.now()},
            },
            /*required: ["path", "fullpath", "name", "modified"]*/
          },
        },
        /*required: ["path", "name"]*/
      },
    },
  },
  {collection: 'galleries'},
);

module.exports = mongoose.model('Gallery', GallerySchema);
