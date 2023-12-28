import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
      index: true,
    },
    builtDate: {
      type: Date,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  {
    timestamps: true,
  }
);

houseSchema.index({ latitude: 1, longitude: 1 });
houseSchema.index({ location: '2dsphere' });
export default mongoose.model('House', houseSchema);
