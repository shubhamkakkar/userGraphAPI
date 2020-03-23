import BlogSchema from '../../../models/blogModel';
export default function getAllBlogs() {
  return BlogSchema.find()
    .then(blogs => blogs)
    .catch(getAllBlogsEr => {
      console.log({getAllBlogsEr});
      return getAllBlogsEr;
    });
}
