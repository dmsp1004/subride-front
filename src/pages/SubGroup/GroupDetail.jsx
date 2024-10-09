import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import BackHeader from "components/BackHeader";
import api from "utils/apiInstance";
import GroupInfo from "./components/GroupInfo";
import InvitationButtonComponent from "./components/InvitationButton";
import PaymentDetail from "./components/PaymentDetail";
import Navigation from "components/Navigation";

function GroupDetail({ user }) {
  const location = useLocation();
  const groupId = location.state?.groupId || null;
  const [serviceData, setServiceData] = useState({
    subscribeDTO: {
      logo: "",
      serviceName: "",
      description: "",
      maxUser: 0,
    },
    users: [],
    groupName: "",
    billingDate: 0,
    pays: [],
    leaderUserId: null, // leaderUserId 추가
  });

  const getServiceData = useCallback(async () => {
    try {
      if (groupId !== null) {
        const { data } = await api.get("/groups/" + groupId, {
          params: {
            include: "subscribe,users,pays"
          }
        });
        setServiceData(data);
      }
    } catch (err) {
      console.log("error");
    }
  }, [groupId]);

  useEffect(() => {
    getServiceData();
  }, [getServiceData]);

  // user.id와 serviceData.leaderUserId 비교
  const isLeader = user.id === serviceData.leaderUserId;

  return (
    <>
      <BackHeader text="썹 그룹 상세"></BackHeader>
      <GroupInfo serviceData={serviceData} />
      <InvitationButtonComponent serviceData={serviceData} user={user} />
      {isLeader && <PaymentDetail serviceData={serviceData} />}
      <Navigation />
    </>
  );
}

export default GroupDetail;