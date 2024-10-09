import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Navigator from './Navigator';
import { fetchRecommendedCategory } from './api';
 
const MainScreen = () => {
  const history = useHistory();
  const [recommendedCategory, setRecommendedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecommendedCategory('user1'); // 실제 사용자 ID로 변경해야 함
        setRecommendedCategory(data);
        setLoading(false);
      } catch (err) {
        setError('추천 카테고리를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 
  if (loading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
 
  return (
<Box className="screen-container">
<img src="/mainlogo.png" alt="Main Logo" style={{ width: '100px', marginBottom: '20px' }} />
<Typography variant="h4" gutterBottom>메인 화면</Typography>
      {recommendedCategory && (
<>
<img src={`/${recommendedCategory.categoryImage}`} alt="Category" style={{ width: '150px', marginBottom: '20px' }} />
<Typography variant="h6" gutterBottom>{new Date().toLocaleDateString()} 기준 추천 구독 카테고리</Typography>
<Typography variant="body1" gutterBottom>{recommendedCategory.categoryName}</Typography>
</>
      )}
<Button 
        variant="contained" 
        color="primary" 
        onClick={() => history.push('/recommendations')}
        style={{ marginTop: '20px' }}
>
        추천 구독 서비스 보기
</Button>
<Navigator />
</Box>
  );
};
 
export default MainScreen;