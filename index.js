import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.render("index");
});
app.get('/index2',(req,res)=>{
    res.render("index2");
});
const blog=[];
app.post('/blogSubmit',(req,res)=>{
    const blog_content = req.body.blogContent;
    if(blog_content){
        blog.push(blog_content);
    }
    res.render("index3",{blog_content: blog});
})
app.post('/delete', (req, res) => {
    const blogIndex = parseInt(req.body.delete, 10); // Convert to number
    if (!isNaN(blogIndex) && blogIndex >= 0 && blogIndex < blog.length) {
        blog.splice(blogIndex, 1); // Remove the blog at the specified index
    }
    res.render('index3', { blog_content: blog }); // Pass updated array
});

app.post('/edit', (req, res) => {
    const blogNo = parseInt(req.body.blogNumber, 10);
    const blogCt = req.body.blogText;
    if (!isNaN(blogNo) && blogCt && blogNo >= 0 && blogNo < blog.length) {
        blog[blogNo] = blogCt; // Update blog
    }
    res.render('index3', { blog_content :blog }); // Pass updated blog array
});
app.listen(port, ()=>{
    console.log(`Server is running on ${port}.`);
});