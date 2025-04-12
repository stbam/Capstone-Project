const User = require("../models/UserSchema")

exports.BookAdd = async(req,res)=>{
    try{
        console.log("book added")
        const { title,genre,description,author,userId,thumbnail } = req.body;
        console.log(userId+ "here");
        const newBook={
            title,
            genre,
            description,
            author,
            thumbnail
        }
        const user = await User.findById(userId);  // Assuming 'userId' is a valid field in the User model
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          
        user.favorite_books.push(newBook);
        //console.log("book pushed?")
        await user.save();
        res.status(200).json({ message: 'Book added to favorites' });
        
    }
    catch(error){
      //  console.log(error);
     //  console.log("Book error!")
        res.status(500).json({ error: "Failed to add book" }); // 👈 and this

    }
}