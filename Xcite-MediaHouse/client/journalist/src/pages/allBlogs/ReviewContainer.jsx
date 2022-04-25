import styled from "@emotion/styled";
import { Chip } from "@mui/material";

const Container = styled.div`
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
  font-weight: 500;
`;
const Desc = styled.p``;
const Body = styled.p``;
const Type = styled.p`
  font-weight: bold;
`;

const Tags = styled.div`
  display: flex;
  gap: 5px;
`;

const Article = styled.article`
  padding: 1rem;
  font-weight: 350;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-align: justify;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 80%;
`;

const ReviewContainer = ({ props }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={props.imgData.url} />
      </ImageContainer>
      <Article>
        <Title>{props.title}</Title>
        <Desc>{props.description}</Desc>
        <Body>{props.body}</Body>
        <Type>{props.type}</Type>
        <Tags>
          {props.tagData.map((tag) => (
            <Chip label={tag} key={tag} />
          ))}
        </Tags>
      </Article>
    </Container>
  );
};

export default ReviewContainer;
