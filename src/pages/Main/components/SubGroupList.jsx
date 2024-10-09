import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

const SubGroupListContainer = styled.div`
  background-color: #f8f8f8;
  padding: 1rem;
  width: 100%;
  border-radius: 10px;
  margin: 1rem 0rem;
  color: #4a483f;

  .display-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0px;
  }

  .images {
    list-style: none;
    padding: 0;
    margin-top: 20px;
    overflow-x: auto;
    white-space: nowrap;
    margin: 0px;
  }

  .image-box {
    display: inline-block;
    width: 65px;
    height: 65px;
    border-radius: 70%;
    background-color: pink;
    margin: 0rem 1rem 0rem 0rem;
    object-fit: cover;
    cursor: pointer; 
    p {
      font-size: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      text-align: center;
    }
  }

  .image-profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-box-recommend {
    display: inline-block;
    width: 90px;
    height: 120px;
    border-radius: 5px;
    background-color: pink;
    margin: 7px;
  }
`;

function SubGroupList({ subGroupList, userName, navigate }) {
  const handleNavigateToMySub = () => {
    navigate("/subgroup/mysubgroup");
  };

  const handleGroupClick = (groupId) => {
    navigate("/subgroup/groupdetail", { state: { groupId: groupId } });
  };

  return (
    <SubGroupListContainer>
      <div className="display-flex">
        <p className="title">{userName}님의 썹</p>
        <Button onClick={handleNavigateToMySub} sx={{ marginRight: "-1.5rem" }}>
          <ArrowForwardIos />
        </Button>
      </div>
      <ul className="images">
        {subGroupList.map((item) => (
          <li
            key={item.id}
            className="image-box"
            onClick={() => handleGroupClick(item.id)}
          >
            <img
              className="image-profile"
              src={`${process.env.PUBLIC_URL}/service/${item.subscribeDTO.logo}`}
              alt={item.subscribeDTO.serviceName}
            />
            <p>{item.groupName}</p>
          </li>
        ))}
      </ul>
    </SubGroupListContainer>
  );
}

export default SubGroupList;