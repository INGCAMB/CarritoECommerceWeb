const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

exports.getTopExpensive = async (req, res) => {
  const products = await Product.getTopExpensive();
  res.json(products);
};

exports.getTopSold = async (req, res) => {
  const orders = await Order.getTopSold();
  res.json(orders);
};

exports.getLowStock = async (req, res) => {
  const products = await Product.getLowStock();
  res.json(products);
};

exports.getDashboardKPIs = async (req, res) => {
  const totalProducts = await Product.countAll();
  const lowStock = await Product.countLowStock();
  const totalUsers = await User.countAll();
  const totalAdmins = await User.countAdmins();
  const monthlySales = await Order.countMonthlySales();
  const monthlyRevenue = await Order.calculateMonthlyRevenue();

  res.json({
    totalProducts,
    lowStock,
    totalUsers,
    totalAdmins,
    monthlySales,
    monthlyRevenue});
  };
