const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const stock_get = async (req, res) => {
  if (req.query.name) {
    try {
      const stock = await prisma.stock.findUnique({
        where: {
          name: req.query.name
        }
      });
      res.json({ status: 'Success', message: 'Stock retrieved', data: stock });
    } catch (error) {
      res.json({ status: 'Failed', message: error });
    }
  } else {
    try {
      const stocks = await prisma.stock.findMany({
        orderBy: {
          name: 'asc'
        },
        take: 10
      });
      res.json({ status: 'Success', message: 'Stocks retrieved', data: stocks });
    } catch (error) {
      res.json({ status: 'Failed', message: error });
    }
  }
}

const stock_post = async (req, res) => {
  try {
    const stock = await prisma.stock.create({
      data: {
        name: req.query.name,
        code: req.query.code
      }
    });
    res.json({ status: 'Success', message: 'Stock added', data: stock });
  } catch (error) {
    res.json({ status: 'Failed', message: error.message });
  }
}

module.exports = {
  stock_get,
  stock_post
}