const cloudinary = require("cloudinary").v2;

export const fileuploader = async (data) => {
  try {
    cloudinary.config({
      cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.REACT_APP_CLOUNDINARY_API_SECRET
    });
    
    cloudinary.v2.api.create_upload_preset(
      { 
        name: "my_preset", 
        unsigned: true, 
        categorization: "google_tagging,google_video_tagging",
        auto_tagging: 0.75,
        background_removal: "cloudinary_ai",  
        folder: "new-products" 
      },
      function(error, result){console.log(result);});

    const result = await cloudinary.uploader.upload(data.image)
    return result
  } catch (error) {
    console.log(error);
  }
  
}
