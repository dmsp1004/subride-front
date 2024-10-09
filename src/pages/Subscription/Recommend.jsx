import { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navigation from "components/Navigation";
import BackHeader from "components/BackHeader";
import api from "utils/apiInstance";

const RecommendPage = styled.div`
  color: #4a4646;

  p {
    margin: 0;
  }

  span {
    font-family: "KBFGDisplayB";
  }

  .title {
    font-size: 16px;
    margin-top: 40px;
    color: #4a483f;
  }

  .sub-title {
    font-size: 12px;
    color: #767676;
    margin: 0.5rem 0rem;
    white-space: nowrap;
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  '&:hover': {
    boxShadow: theme.shadows[5],
    cursor: 'pointer',
  },
}));

const getCategories = async () => {
  try {
    const { data } = await api.get("/categories");
    return data;
  } catch (err) {
    return err;
  }
};

const getEnrollList = async (categoryId, userId) => {
  try {
    const { data } = await api.get("/subscriptions/enroll-subscriptions", {
      params: { categoryId, userId },
    });
    return data;
  } catch (err) {
    return err;
  }
};

function Recommend({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultCategory = location.state?.defaultCategory || 1;
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [categoryList, setCategoryList] = useState([]);
  const [subscribeList, setSubscribeList] = useState([]);

  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleServiceClick = useCallback((serviceId) => {
    navigate(`/subscription/service/${serviceId}`, { state: { serviceId: serviceId, alreadyEnroll:false } });
  }, [navigate]);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategories();
      console.log(result);
      setCategoryList(result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchEnrollList = useCallback(async (categoryId, userId) => {
    try {
      const result = await getEnrollList(categoryId, userId);
      console.log(result);
      setSubscribeList(result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchEnrollList(defaultCategory, user.id);
  }, [fetchCategories, fetchEnrollList, user.id, defaultCategory]);

  useEffect(() => {
    fetchEnrollList(selectedCategory, user.id);
  }, [fetchEnrollList, user.id, selectedCategory]);

  return (
    <>
      <BackHeader text="추천"></BackHeader>
      <RecommendPage>
        <p className="title">
          {user.userName}님을 위한{" "}
          <span style={{ fontSize: "20px", color: "#F8A809" }}>
            구독서비스 추천
          </span>
        </p>
        <p className="sub-title">지난 한달 생활요금에 281,000원을 지출했어요</p>
      </RecommendPage>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {categoryList.map((item) => (
          <Grid item xs={4} key={item.id}>
            <Button
              fullWidth
              variant={selectedCategory === item.id ? "contained" : "outlined"}
              color={selectedCategory === item.id ? "primary" : "inherit"}
              onClick={() => handleCategoryClick(item.id)}
            >
              {item.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 4, mb: 8 }}>
        {subscribeList.map((item) => (
          <Grid item xs={6} sm={4} md={3} key={item.serviceId}>
            <StyledCard
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              onClick={() => handleServiceClick(item.serviceId)}
            >
              <CardMedia component="img" height="140" image={process.env.PUBLIC_URL +
                `/service/` + item.logo} alt={item.serviceName} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.serviceName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {item.fee.toLocaleString("ko-KR")}원
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Navigation />
    </>
  );
}

export default Recommend;