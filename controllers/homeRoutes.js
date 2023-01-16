const router = require('express').Router();
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in,
      user_id:req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This is for the updating of project posts
router.get('/projectUpdate/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });
    console.log('****');
    console.log(projectData);

    res.render('projectUpdate', {
      ...project,
      id: projectData.dataValues.id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// This is for the updating of project posts
router.post('/projectUpdate/:id', async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);

    Project.findByPk(req.params.id).then((record) => {
      record.name = req.body.title;
      record.description = req.body.body;
      record.save();
      res.status(200).json({ status: `updated project` });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/project/:id/comment', async (req, res) => {
  console.log(req.body.body);
  console.log(req.params.id);
  console.log(req.session.user_id)
  const newComment0 = await Comment.create({
    description: req.body.body,
    user_id: req.session.user_id,
    project_id: req.params.id
  });
  console.log(newComment0)
  try {
    const newComment = await Comment.create({
      description: req.body.body,
      user_id: req.session.user_id,
      project_id: req.params.id
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err)
  
    res.status(400).json(err);
  }
});

router.delete('./projectUpdate/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
