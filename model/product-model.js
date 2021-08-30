const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: { Number, default: 0 },
      required: true,
    },
    image: {
      type: String,
      required: false,
      // default: 'burger1.jpg',
    },
    category: {
      type: String, enum: ['Almuerzo', 'Bebestibles'],
    },
    dateEntry: {
      type: Date,
      default: Date.now(),
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// productSchema.plugin(mongoosePaginate);

module.exports = model('Product', productSchema);
