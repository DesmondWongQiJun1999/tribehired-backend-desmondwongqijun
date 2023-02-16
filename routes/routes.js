const express = require('express');

const router = express.Router()

module.exports = router;

//Get top post
router.get('/TopPost', (req, res) => {
    let url = `https://jsonplaceholder.typicode.com/comments`
    fetch(url)
    .then(res => res.json())
    .then(out =>{

        let output = out.reduce((objectsByKeyValue, obj) => {
            const value = obj["postId"];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
          }, {})

        let topList = []
        
        Object.keys(output).forEach(function (key) {
            let topPostURL = `https://jsonplaceholder.typicode.com/posts/${key}`
            fetch(topPostURL)
            .then(res => res.json())
            .then(out =>{
               topList?.push(
                {
                    post_id: out?.id,
                    post_title: out?.title,
                    post_body: out?.body, 
                    total_number_of_comments: output[key]?.length
                }
               )
               if (topList?.length == Object.keys(output).length){
                topList?.sort(function(a,b) {
                    return b.total_number_of_comments - a.total_number_of_comments;
                });
                res.send(topList)
               }
            })
         });
    }
    )
    .catch(err => { throw err });
})

//Filter comment 
router.get('/filter', (req, res) => {

    let commentsURL = `https://jsonplaceholder.typicode.com/comments`

    fetch(commentsURL)
    .then(res => res.json())
    .then(out =>{
        console.log(out);
        const filters = req.query;
        const filteredComments = out.filter(comment => {
          let isValid = true;
          for (key in filters) {
            
            isValid = isValid && comment[key] == filters[key];
          }
          return isValid;
        });

        res.send(filteredComments);
        
    })
})
