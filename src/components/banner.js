import { useState } from "react";
import defaultBannerIcon from "../assets/images/Web_App_Bg_Transparent.png"; 

function BannerUploader() {
    const [imageBanner, setBanner] = useState(null);

    const handleBannerUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBanner(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="banner-picture">
            <label htmlFor="banner-upload">
                <div className="banner-picture">
                    {imageBanner ? (
                        <img src={imageBanner} alt="Banner" className="banner-img" />
                    ) : (
                        <img src={defaultBannerIcon} alt="Default Banner" className="banner-img" />
                    )}
                </div>
            </label>
            <input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                style={{ display: "none" }}
            />
        </div>
    );
}

export default BannerUploader;
