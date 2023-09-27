import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { message, Spin, Upload } from "antd";
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error("Image must smaller than 2MB!");
  // }
  // return isJpgOrPng && isLt2M;
  return isJpgOrPng;
};
const UploadProfilePic = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const cloudName = "dq1drdyzc";
      const uploadPreset = "donate_life";
      const data = new FormData();
      data.append("file", info.file.originFileObj);
      data.append("upload_preset", uploadPreset);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const img = await res.json();
      console.log(img);
      setLoading(false);
      setImageUrl(img.secure_url);
      props.setProfileImgUrl(img.secure_url);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <Spin></Spin> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        action={"http://127.0.0.1:8000/api/health-check"}
        // action={"http://16.171.57.202:8000/api/health-check"}
        onChange={handleChange}
        accept=".png,.jpeg,.jpg"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
export default UploadProfilePic;
