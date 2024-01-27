const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


/*
GET
Query: name OR null
*/
const stock_get = async (req, res) => {
  if (req.query.name) {
    try {
      const stock = await prisma.data.findUnique({
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
      const stocks = await prisma.data.findMany({
        orderBy: {
          name: 'asc'
        },
        take: 10
      });
      res.json({ status: 'Success', message: 'Stocks retrieved', data: stocks });
    } catch (error) {
      res.json({ status: 'Failed', message: error.message });
    }
  }
}

/*
POST
Query: name AND code AND low AND high AND open AND close
Used for internal purposes. Not used by the user.
*/
const stock_post = async (req, res) => {
  try {
    const { name, code, low, high, open, close } = req.query;
    const stock = await prisma.data.create({
      data: {
        name: name,
        code: code,
        open: parseFloat(open),
        low: parseFloat(low),
        high: parseFloat(high),
        close: parseFloat(close)
      }
    });
    res.json({ status: 'Success', message: 'Stock added', data: stock });
  } catch (error) {
    res.json({ status: 'Failed', message: error.message });
  }
}

const stock_post_csv = async (data) => {
  try {
    await prisma.data.createMany({ data: data });
    console.log('Stocks added');
  } catch (error) {
    console.log(error);
  }
}


/*
DELETE
Query: name OR code OR null
*/
const stock_delete = async (req, res) => {
  if (req.query.name || req.query.code) {
    try {
      await prisma.data.delete({
        where: {
          OR: [
            { name: req.query.name },
            { code: req.query.code }
          ]
        }
      });
      res.json({ status: 'Success', message: 'Stock deleted' });
    } catch (error) {
      res.json({ status: 'Failed', message: error.message });
    }
  } else {
    try {
      await prisma.data.deleteMany();
      res.json({ status: 'Success', message: 'All Stocks deleted' });
    } catch (error) {
      res.json({ status: 'Failed', message: error.message });
    }
  }
}

// Export the functions
module.exports = {
  stock_get,
  stock_post,
  stock_delete,
  stock_post_csv
}