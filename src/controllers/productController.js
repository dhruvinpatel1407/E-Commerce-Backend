const ProductCollection = require("../models/productModel");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Product ID
 *         title:
 *           type: string
 *           description: Product title
 *         category:
 *           type: string
 *           description: Product category
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           description: Product price
 *         createdAt:
 *           type: string
 *           format: date
 *           description: When the product was created
 *       required:
 *         - title
 *         - category
 *         - description
 *         - price
 */


const AllProducts = async (req, res) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
  
      const products = await ProductCollection.find()
        .sort({ id: 1 });
  
      const totalProducts = await ProductCollection.countDocuments();
  
      res.status(200).json({
        success: true,
        data: products,
        total: totalProducts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching products' });
    }
  }

  const categorySearch = async (req, res) => {
    try {
      const { search, category } = req.query;
  
      let query = {};
  
      // Search by title only
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }
  
      // Filter by category
      if (category) {
        query.category = category;
      }
  
      // Execute the query with pagination
      const page = req.query.page ? Number(req.query.page) : 1;
  
      const products = await ProductCollection.find(query)
        .sort({ id: 1 });
  
      const total = await ProductCollection.countDocuments(query);
  
      res.status(200).json({
        success: true,
        data: products,
        total: total,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error searching products' });
    }
  }

  module.exports = { AllProducts, categorySearch };