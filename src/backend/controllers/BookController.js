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
            thumbnail,
         

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


exports.getUserBook = async (req, res) => {
    try {
      const username = req.params.username;
  
      console.log("Fetching favorite books for:", username);
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user.favorite_books); // Send only favorite_books
    } catch (error) {
      console.error("Error fetching favorite books:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  