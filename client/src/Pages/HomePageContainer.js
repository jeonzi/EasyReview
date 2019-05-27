import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";

import Loader from "../component/LoaderSpinner/Loader";
import Modal from "../component/Modal/Modal";

const MainContainer = styled.div`
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px auto;
  padding: 16px 0px;
`;

const Review = styled.div`
  margin: 0px 8px 8px;
  width: 400px;
  cursor: pointer;
  &:hover #hide {
    opacity: 0;
  }
  &:hover #popup {
    opacity: 1;

    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    box-sizing: border-box;
  }
`;

const PhotoContainer = styled.figure`
  height: 350px;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 10px auto;
  border-style: none;
  border-radius: 10px;
  background-color: white;
`;

const Photo = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
  vertical-align: middle;
  border-style: none;
  border-radius: 10px;
  backface-visibility: hidden;
  opacity: 0.8;
`;

const TextContainer = styled.figcaption`
  background-color: rgba(0, 0, 0, 0.1);
  text-align: left;
  top: 0px;
  left: 0px;
  color: #fff;
  padding: 2rem;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    color: rgba(0, 0, 0, 0);
  }
`;

const Blockq = styled.blockquote`
  font-family: Georgia, serif;
  font-weight: bold;
  font-size: 2rem;
  line-height: 2.3;
  position: relative;
  padding: 0.5rem;
  margin-block-start: 0.8em;
  margin-block-end: 0.8em;
  margin-inline-start: 37px;
  margin-inline-end: 37px;
  opacity: 0;

  &:before,
  &:after {
    position: absolute;
    width: 3rem;
    height: 3rem;
    opacity: 0.8;
    z-index: 50;
  }

  &:before {
    content: "“";
    color: #ffeded;
    font-size: 5rem;
    left: -4rem;
    top: -2rem;
    opacity: 0.8;
  }
  &:after {
    content: "”";
    color: #ffeded;
    font-size: 5rem;
    right: -4.5rem;
    bottom: 1rem;
  }
`;

const Contents = styled.p`
  font-family: "East Sea Dokdo", cursive;
  text-align: center;
  color: #fff;
  line-height: 1;
  font-size: 2.3rem;
  letter-spacing: 2px;
  margin-top: 5rem;
  margin-bottom: 0.7rem;
  padding: 0;
  font-weight: lighter;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: noraml;
  height: 6.7rem;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ModalContents = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const MImgBox = styled.div`
  min-width: 460px;
  max-width: 470px;
  height: 595px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ModalImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px 0 0 10px;
  object-fit: fill;
`;

const ContentsBox = styled.div`
  color: black;
  padding: 0 16px;
  margin-left: 16px;
  height: 580px;
  min-width: 460px;
  box-sizing: border-box;
  border-radius: 5px;
  align-items: center;
  text-align: left;
  display: block;
  flex: 1;
`;

const ReviewBox = styled.div`
  width: 560px;
  display: block;
  margin-top: 1.3rem;
`;

const Subject = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
  padding-left: 0.5rem;
  padding-bottom: 10px;
  padding-top: 15px;
  border-bottom: 1px solid #dbd9d9;
  font-family: "Nanum Gothic", serif;
`;

const RContents = styled.div`
  font-size: 1.3rem;
  overflow-y: scroll;
  margin: 3px auto;
  height: 342px;
  padding: 8px;
  line-height: 180%;
  border-bottom: 1px solid #dbd9d9;
  letter-spacing: 1px;
  font-family: "Nanum Gothic", serif;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BookInfo = styled.div`
  min-width: 400px;
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 0;
`;

const ImgContainer = styled.div`
  height: 140px;
  position: relative;
  display: flex;
  flex: 0.8;
  align-items: center;
  justify-content: center;
  line-height: 1.15;
`;

const BImg = styled.img`
  height: 80%;
  object-fit: fill;
  width: 80%;
  vertical-align: middle;
  border-style: none;
  border-radius: 5px;
`;

const BookDetail = styled.div`
  background: rgba(0, 0, 0, 0);
  color: black;
  padding: 18px 16px;
  width: 450px;
  height: 135px;
  box-sizing: border-box;
  border-radius: 5px;
  flex: 3.5;
  align-items: center;
  overflow: hidden;
  text-align: left;
`;

const Title = styled.div`
  width: 450px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 7px;
  font-family: "Nanum Gothic", sans-serif;
`;

const Author = styled.div`
  font-size: 1.3rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
  margin-bottom: 7px;
  font-family: "Nanum Gothic", sans-serif;
`;

const Publisher = styled.div`
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
  font-family: "Nanum Gothic", sans-serif;
`;

const READ_REVIEWS = gql`
  query reviews {
    reviews {
      id
      subject
      contents
      image
      book {
        title
        author
        image
        publisher
      }
    }
  }
`;

let handleArrowKeys;

const HomePageContainer = () => {
  const [isReview, setIsReview] = useState(false);
  const [rSubject, setRSubject] = useState("");
  const [rImage, setRImage] = useState("");
  const [rIndex, setRIndex] = useState();
  const [rContents, setRContents] = useState("");
  const [bTitle, setBTitle] = useState("");
  const [bAuthor, setBAuthor] = useState("");
  const [bImage, setBImage] = useState("");
  const [bPub, setBPub] = useState("");
  const [modal, setModal] = useState();

  const chooseReview = (review, index) => {
    setIsReview(true);
    setRSubject(review.subject);
    setRImage(review.image);
    setRContents(review.contents);
    setBTitle(review.book.title.replace(/\(.*\)/, ""));
    setBAuthor(review.book.author);
    setBImage(review.book.image);
    setBPub(review.book.publisher);
    setRIndex(index);
  };

  const closeModal = () => {
    setIsReview(false);
  };

  console.log(modal);

  return (
    <MainContainer>
      <Query query={READ_REVIEWS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <div>ERROR!!!!!</div>;
          const reviews = data.reviews;
          console.log(reviews);
          return (
            <Container>
              {
                (handleArrowKeys = (modal, setModal) => e => {
                  console.log(e.key);
                  if (e.key === "ArrowRight") setModal(modal + 1);
                  else if (e.key === "ArrowLeft") setModal(modal - 1);
                  // else if (e.key === "Escape") setIsReview(false);
                  chooseReview(reviews[modal], modal);
                  console.log(reviews);
                })
              }
              {reviews.map((review, index) => {
                return (
                  <Review
                    key={review.id}
                    onClick={() => {
                      chooseReview(review, index);
                    }}
                  >
                    <PhotoContainer onClick={() => setModal(index)}>
                      <Photo src={review.image} />
                      <TextContainer>
                        <Blockq id="popup">
                          <Contents>{review.contents}</Contents>
                        </Blockq>
                      </TextContainer>
                    </PhotoContainer>
                  </Review>
                );
              })}
            </Container>
          );
        }}
      </Query>
      {isReview && (
        <Modal
          {...{
            handleArrowKeys,
            onClose: closeModal,
            open: rIndex === modal,
            modal,
            setModal
          }}
        >
          <ModalContents onClick={e => e.stopPropagation()}>
            <MImgBox>
              <ModalImg src={rImage} />
            </MImgBox>
            <ContentsBox>
              <ReviewBox>
                <Subject>{rSubject}</Subject>
                <RContents>{rContents}</RContents>
              </ReviewBox>
              <BookInfo>
                <ImgContainer>
                  <BImg src={bImage} />
                </ImgContainer>
                <BookDetail>
                  <Title>{bTitle}</Title>
                  <Author>{bAuthor}</Author>
                  <Publisher>{bPub}</Publisher>
                </BookDetail>
              </BookInfo>
            </ContentsBox>
          </ModalContents>
        </Modal>
      )}
    </MainContainer>
  );
};
export default HomePageContainer;
