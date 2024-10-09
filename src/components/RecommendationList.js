import React, { useState, useEffect } from 'react';
import { Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Navigator from './Navigator';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchTopSpendingCategory, fetchSubscriptionsByCategory } from './api';
 
const RecommendationList = () => {
  const history = useHistory();
  const [topSpending, setTopSpending] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const topSpendingData = await fetchTopSpendingCategory('user1'); // 실제 사용자 ID로 변경해야 함
        setTopSpending(topSpendingData);
        const subscriptionsData = await fetchSubscriptionsByCategory(topSpendingData.topCategory);
        setSubscriptions(subscriptionsData);
        setLoading(false);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 
  if (loading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
 
  return (
<Box className="screen-container">
<ArrowBackIcon className="back-button" onClick={() => history.goBack()} />
<Typography variant="h4" className="screen-title">추천 구독 서비스</Typography>
      {topSpending && (
<>
<Typography variant="h6" gutterBottom>지난달 최고 지출 카테고리: {topSpending.topCategory}</Typography>
<Typography variant="body1" gutterBottom>총 지출액: {new Intl.NumberFormat('ko-KR').format(topSpending.totalSpending)}원</Typography>
</>
      )}
<List>
        {subscriptions.map((subscription) => (
<ListItem key={subscription.id} button onClick={() => history.push(`/subscription/${subscription.id}`)}>
<ListItemAvatar>
<Avatar src={`/${subscription.logo}`} alt={subscription.name} />
</ListItemAvatar>
<ListItemText 
              primary={subscription.name} 
              secondary={`${subscription.description} - ${new Intl.NumberFormat('ko-KR').format(subscription.price)}원`} 
            />
</ListItem>
        ))}
</List>
<Navigator />
</Box>
  );
};
 
export default RecommendationList;