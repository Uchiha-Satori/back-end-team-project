'use strict'

const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  sku_number: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  quantity_number: {
    type: Number,
    required: true
  },
  quantity_unit: {
    type: String,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
