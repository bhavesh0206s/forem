const passport = require('passport');
const User = require('../modals/User');

module.exports = (app)=>{
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  
  app.get('/auth/google/callback', passport.authenticate('google'), async (req, res)=>{
    try{
      const user = await User.findById(req.user._id);
      if(user.username.length !== 0 ){
        res.redirect('/home')
      }else{
        res.redirect('/signup/userForm')
      }
    }catch(e){
      console.log('error from auth callback: ', e)
    }
  });

  app.get('/api/current_user', (req,res)=>{
    res.json(req.user);
  })

  app.get('/api/logout', (req,res)=>{
    req.logout();
    res.redirect('/')
  })

}