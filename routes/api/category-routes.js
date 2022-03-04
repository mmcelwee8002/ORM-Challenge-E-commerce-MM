const router = require('express').Router();
const { Category, Product} = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

  // find all categories
  Category.findAll({
    model: Product,
   
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbCatData => {
      if (!dbCatData) {
        res.status(404).json({ message: 'No categories found' });
        return;
      }
      res.json(dbCatData);
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



  router.get('/:id', (req, res) => {
    // find one category by its `id` value
    Category.findOne({

      where: {
        id: req.params.id
      },
      attributes: ['id', 'catagory_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'catagory_id']
        },
        // be sure to include its associated Products
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No catagory found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', (req, res) => {
    // create a new category
    Category.create({
      catagory_name: req.body.tag_name
    })
      .then((dbTagData) => res.status(200).json(dbTagData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });

  // update a category by its `id` value
  router.put('/:id', (req, res) => {
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(dbTagData => {
        if (!dbTagData) {
          res.status(404).json({ message: 'No catagory found with this id' });
          return;
        }
        res.json(dbTagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

  });

  router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No catagory found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;
