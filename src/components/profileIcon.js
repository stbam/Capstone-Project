import { useState } from "react";
import defaultProfileIcon from "../assets/images/user-avatar.png"; 

function ProfilePictureUploader() {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-picture-container">
            <label htmlFor="profile-upload">
                <div className="profile-picture">
                    {image ? (
                        <img src={image} alt="Profile" className="profile-img" />
                    ) : (
                        <img src={defaultProfileIcon} alt="Default Icon" className="profile-img" />
                    )}
                </div>
            </label>
            <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />
        </div>
    );
}

export default ProfilePictureUploader;
