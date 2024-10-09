import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import Navigator from './Navigator';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchSubscriptionDetails } from './api';
 
const SubscriptionDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubscriptionDetails(id);
        setSubscription(data);
        setLoading(false);
      } catch (err) {
        setError('구독 서비스 정보를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
 
  const handleSubscribe = () => {
    alert('구독이 완료되었습니다.');
    history.push('/recommendations');
  };
 
  if (loading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
 
  return (
<Box className="screen-container">
<ArrowBackIcon className="back-button" onClick={() => history.goBack()} />
<Typography variant="h4" className="screen-title">구독 상세</Typography>
      {subscription && (
<>
<img src={`/${subscription.logo}`} alt={subscription.name} style={{ width: '100px', marginBottom: '20px' }} />
<Typography variant="h5">{subscription.name}</Typography>
<Typography variant="body1">카테고리: {subscription.category}</Typography>
<Typography variant="body1">{subscription.description}</Typography>
<Typography variant="body1">구독료: {new Intl.NumberFormat('ko-KR').format(subscription.price)}원</Typography>
<Typography variant="body1">최대 공유 인원: {subscription.maxSharing}명</Typography>
<Button variant="contained" color="primary" onClick={handleSubscribe} style={{ marginTop: '20px' }}>
            구독하기
</Button>
</>
      )}
<Navigator />
</Box>
  );
};
 
export default SubscriptionDetail;