import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthChecker = ({ page1, page2 }: { page1: string; page2: string }) => {
  const navigate = useNavigate();
  async function authCheck() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blogs/auth`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.data.error === "Unauthorized") {
        navigate(page2);
      } else {
        if(page1 === "") {
          return;
        } else {
        navigate(page1);
        }
      }
    } catch (e) {
      console.log(e);
      navigate(page2);
    }
  }
  useEffect(() => {
    authCheck();
  }, [navigate]);
};

export default AuthChecker;
