const verifyLogin = require('../middleware/verifyLogin');
const Tag = require('../modals/Tag');
const User = require('../modals/User');

module.exports = (app)=>{
  app.post('/api/forum/tag', async (req, res) => {
    try{
      const tag = req.body.tag;
      let tags = await Tag.findOne();
      if(!tags){
        const newTags = await Tag({
          tags: [
            {
              user: req.user._id,
              userTags: [tag]
            }
          ]
        })
        await newTags.save();
        res.json(newTags);
      }else{
        let isUserFound = false
        let isTagFound = false;
        for(let t of tags.tags){
          for(let userTag of t.userTags){
            if(tag.toLowerCase() === userTag.toLowerCase()){
              isTagFound = true
              break
            }
          }
        }
        if(!isTagFound){
          for(let t of tags.tags){
            if(String(t.user) === String(req.user._id)){
              t.userTags.push(tag)
              isUserFound = true
              break
            }
          }
          if(!isUserFound){
            const newUserTag = {
              userTags: [tag],
              user: req.user._id
            }
            tags.tags.push(newUserTag)
          }
        }else{
          res.json({errorTag: ['Tag already present!']})
        }
        await tags.save();
        res.json(Tag)
      }
      
    }catch(e){
      console.log('error from forum tag: ', e)
    }
  });

  app.get('/api/forum/tag', async (req, res) => {
    try{
      let tags = await Tag.findOne();
      let temp = [];
      tags.tags.forEach(tag => {
        tag.userTags.forEach(userTag => {
          temp.push(userTag)
        })
      });
      res.json(temp)
    }catch(e){
      console.log('error from get forum tag: ', e)
    }
  })

  app.get('/api/forum/tag/user', async (req, res) => {
    try{
      let userId = req.user._id;
      let tags = await Tag.findOne();
      let userTags = []
      for(let tag of tags.tags){
        if(String(tag.user) === String(userId)){
          userTags = [...tag.userTags];
          break
        }
      }
      console.log(userTags);
      res.json(userTags)
    }catch(e){
      console.log('error from get forum tag: ', e)
    }
  })
}