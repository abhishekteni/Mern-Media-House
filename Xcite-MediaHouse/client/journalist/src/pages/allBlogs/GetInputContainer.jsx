import axios from "axios";

import { Typography, Button, TextField, Chip, MenuItem } from "@mui/material";
import styled from "@emotion/styled";

const InputContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagWrapper = styled.div``;

const TagContainer = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 10px;
`;
const Input = styled(TextField)``;

const GetInputContainer = ({ props }) => {
  const handleDelete = (data) => () => {
    props.handleDelete(data);
  };

  const imgUpload = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    formdata.append("upload_preset", "ih1rthv8");
    await axios
      .post("https://api.cloudinary.com/v1_1/vdshgp/image/upload", formdata)
      .then((res) => {
        let filename = res.data.original_filename + "." + res.data.format;
        props.handleImgData({ filename, url: res.data.secure_url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const keyupHandler = ({ target, keyCode }) => {
    if (keyCode === 13 || keyCode === 32) {
      let tag = target.value.trim();
      if (tag !== "") {
        props.pushTag(tag);
      }
      target.value = "";
    }
  };

  return (
    <InputContainer>
      <Input
        label="Blog Title"
        required
        id="title"
        inputProps={{ maxLength: 200 }}
        value={props.title}
        onChange={props.changeHandler}
        disabled={props.disabled}
      />
      <Input
        label="Blog Description"
        required
        id="description"
        inputProps={{ maxLength: 500 }}
        value={props.description}
        onChange={props.changeHandler}
        disabled={props.disabled}
      />
      <Input
        label="Blog Body"
        required
        id="body"
        rows={10}
        multiline
        inputProps={{ maxLength: 2000 }}
        value={props.body}
        onChange={props.changeHandler}
        disabled={props.disabled}
      />
      <Input
        id="type"
        select
        label="Type"
        value={props.type}
        onChange={props.changeHandler}
        disabled={props.disabled}
      >
        {props.types.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Input>
      <TagWrapper>
        <Input
          id="tag"
          label="Tag"
          disabled={props.disabled}
          onKeyUp={keyupHandler}
        />
        <TagContainer>
          {props.tagData.map((data) => (
            <Chip
              label={data}
              key={data}
              onDelete={props.disabled ? undefined : handleDelete(data)}
            />
          ))}
        </TagContainer>
      </TagWrapper>
      <Button
        variant="outlined"
        component="label"
        sx={{ width: "100px" }}
        disabled={props.disabled}
      >
        Upload
        <input type="file" hidden onChange={imgUpload} />
      </Button>
      <Typography variant="p" color="gray">
        <b>Image: </b>
        {props.imgData.filename}
      </Typography>
    </InputContainer>
  );
};

export default GetInputContainer;
