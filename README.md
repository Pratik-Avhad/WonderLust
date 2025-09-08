# WonderLust 🌍
An Airbnb-inspired web app built with **Node.js, Express, MongoDB, and EJS**.  

## 🚀 Features
- User authentication (register/login/logout)  
- Create, edit, and delete property listings  
- Add reviews & ratings to listings  
- Interactive Map integration with Mapbox  
- Categories (Rooms, Mountains, Farms, etc.)  
- Image uploads with Cloudinary  
- Form validation using Joi  

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS, Bootstrap, custom CSS  
- **Database:** MongoDB, Mongoose  
- **Authentication:** Passport.js  
- **File Storage:** Cloudinary  
- **Maps:** Mapbox  

## 📦 Installation
Clone the repo and install dependencies:
```bash
git clone https://github.com/your-username/WonderLust-AirbnbClone.git
cd WonderLust-AirbnbClone
npm install
```

## ⚙️ Environment Variables
Create a `.env` file in the root folder and add:
```env
MAP_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MONGO_URL=mongodb://127.0.0.1:27017/wonderlust
SECRET=your_session_secret
```

## ▶️ Run Locally
```bash
npm start
```
Then open [http://localhost:3000](http://localhost:3000) 🎉  


## 🧑‍💻 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.  
  
