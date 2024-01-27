const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/*
GET
Query: null
*/
const favourites_get = async (req, res) => {
  try {
    const favourites = await prisma.favourites.findMany();
    res.json({ status: 'Success', message: 'Favourites retrieved', data: favourites });
  } catch (error) {
    res.json({ status: 'Failed', message: error });
  }
}

/*
POST
Query: name AND code
*/
const favourites_post = async (req, res) => {
  try {
    const { name, code } = req.query;
    const favourite = await prisma.favourites.create({
      data: {
        name: name,
        code: code
      }
    });
    res.json({ status: 'Success', message: 'Favourite added', data: favourite });
  } catch (error) {
    res.json({ status: 'Failed', message: error.message });
  }
}

/*
DELETE
Query: code
*/
const favourites_delete = async (req, res) => {
  try {
    const code = req.query.code;
    await prisma.favourites.delete({
      where: {
        code: code
      }
    });
    res.json({ status: 'Success', message: 'Favourite deleted' });
  } catch (error) {
    res.json({ status: 'Failed', message: error });
  }
}

// Export the functions
module.exports = {
  favourites_get,
  favourites_post,
  favourites_delete
};