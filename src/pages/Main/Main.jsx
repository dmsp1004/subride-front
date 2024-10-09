import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "pages/Main/components/Header";
import Navigation from "components/Navigation";
import TotalFeeSave from "pages/Main/components/TotalFeeSave";
import SubGroupList from "pages/Main/components/SubGroupList";
import SubscriptionList from "pages/Main/components/SubscriptionList";
import RecommendService from "pages/Main/components/RecommendService";
import { getGroupList, getTotalFee, getSubscriptionList } from "pages/Main/api/mainApi";

function Home({ user }) {
  const navigate = useNavigate();
  const [subGroupList, setSubGroupList] = useState([]);
  const [totalFee, setTotalFee] = useState({});
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupList, totalFee, subscriptionList] = await Promise.all([
          getGroupList(user.id),
          getTotalFee(user.id),
          getSubscriptionList(user.id),
        ]);
        setSubGroupList(groupList);
        setTotalFee(totalFee);
        setSubscriptionList(subscriptionList);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate("/login");
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Header handleLogout={handleLogout} />
      <TotalFeeSave totalFee={totalFee} navigate={navigate} />
      <SubGroupList
        subGroupList={subGroupList}
        userName={user.userName}
        navigate={navigate}
      />
      <SubscriptionList
        subscriptionList={subscriptionList}
        userName={user.userName}
        navigate={navigate}
      />
      <RecommendService navigate={navigate} />
      <Navigation />
    </>
  );
}

export default Home;