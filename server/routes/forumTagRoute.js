const verifyLogin = require('../middleware/verifyLogin');
const Tag = require('../modals/Tag');
const User = require('../modals/User');

module.exports = (app)=>{
  app.post('api/forum/tag/', async (req, res) => {
    try{
      const tag = req.params.body;
      console.log(tag)
      // let tags = await Tag.findById(req.user._id);
      // if(!tags){
      //   tags.tags = [tag];
      // }else{
      //   tags.tags.push(tag);
      // }
      // await tags.save();
      // res.json(tags)
    }catch(e){
      console.log('error from forum tag: ', e)
    }
  })
}