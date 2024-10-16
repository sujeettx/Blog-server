import express from 'express';
const app = express();
const PORT= 3000;
import bodyParser from 'body-parser';

// using body-parser middlewarwe to reading the request body
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// we are using arrray instead of using the database
let BlogsList = [];

//get method for getting blogs list
app.get('/blogs',(req,res)=>{
    return res.status(200).json({
        data:BlogsList,
        success:true
    });
});

//get method for getting a specific blog by id
app.get('/blogs/:id',(req,res)=>{
    const result = BlogsList.filter((blog)=>blog.id == req.params.id);
    return res.status(200).json({
        blog:result,
        success:true
    })
})
//post method for adding a new blog
app.post('/blogs',(req,res)=>{
    let newBlog = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        id: Math.floor(Math.random() * 500)
    }
    BlogsList.push(newBlog);
    console.log(newBlog);
    return res.status(201).json({
        success: true
    });
})

//put method for updating a blog

app.put('/blogs/:id',(req,res)=>{
    const index = BlogsList.findIndex((blog)=>blog.id == req.params.id);
    if(index>-1){
        BlogsList[index] = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            id: req.params.id
        }
        return res.status(200).json({
            success: true
        });
    }else{
        return res.status(404).json({
            message: 'Blog not found',
            success: false
        })
    }
})

//delete method for deleting a blog

app.delete('/blogs/:id',(req,res)=>{
    const index = BlogsList.findIndex((blog)=>blog.id == req.params.id);
    if(index>-1){
        BlogsList.splice(index,1);
        return res.status(200).json({
            success: true
        });
    }else{
        return res.status(404).json({
            message: 'Blog not found',
            success: false
        })
    }
})
app.listen(PORT,()=>console.log(`server is running at ${PORT}`));