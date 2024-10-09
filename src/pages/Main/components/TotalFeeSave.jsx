import React from "react";
import styled from "@emotion/styled";
import { ArrowForwardIos } from "@mui/icons-material";

const TotalFeeSaveContainer = styled.div`
  text-align: center;
  img {
    margin: 25px auto 0px;
    display: block;
    padding-bottom: 8px;
  }
  p {
    margin: 6px;
  }
  p.title {
    margin: 10px 0px 7px 0px;
    color: #4a483f;
    font-family: KBFGDisplayM;
  }
  .subtitle-container {
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;
    margin: 0 auto;
    cursor: ${(props) => (props.canClick ? "pointer" : "default")};
  }
  .subtitle {
    color: #4a483f;
    margin: 1px 0px;
    font-size: 13px;
    color: #0e131a;
    font-family: KBFGDisplayM;
  }
`;

function TotalFeeSave({ totalFee, navigate }) {
  const canClickButton = totalFee.totalSavedAmount > 0;

  return (
    <TotalFeeSaveContainer canClick={canClickButton}>
      <img
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
        src={
          totalFee.feelevel
            ? `/feelevel/feelevel${totalFee.feelevel}.jpeg`
            : "/feelevel/feelevel0.jpeg"
        }
        alt="bankbook"
      />
      <p className="title">
        총 구독료{" "}
        <span style={{ fontFamily: "KBFGDisplayB" }}>
          {" "}
          {totalFee.totalfee && totalFee.totalfee.toLocaleString("ko-KR")} 원{" "}
        </span>
      </p>
      <button
        className="subtitle-container"
        onClick={canClickButton ? () => navigate("/subgroup/subgroup-candidate") : undefined}
      >
        <p className="subtitle">
          썹 타고 매월 최대{" "}
          <span
            style={{
              color: "#ff0000",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {totalFee.totalSavedAmount && totalFee.totalSavedAmount.toLocaleString("ko-KR")} 원{" "}
          </span>{" "}
          아끼러 가기
        </p>
        <ArrowForwardIos fontSize="small" />
      </button>
    </TotalFeeSaveContainer>
  );
}

export default TotalFeeSave;