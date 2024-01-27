const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const favourites_get = async (req, res) => {
  try {
    const favourites = await prisma.favourites.findMany();
    res.json({ status: 'Success', message: 'Favourites retrieved', data: favourites });
  } catch (error) {
    res.json({ status: 'Failed', message: error });
  }
}

const favourites_post = async (req, res) => {
  try {
    const name = req.query.name, code = req.query.code;
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

module.exports = {
  favourites_get,
  favourites_post,
  favourites_delete
};