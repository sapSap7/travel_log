import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function useRequireAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "יש להתחבר",
        text: "עליך להתחבר כדי להמשיך לשימוש במערכת",
        confirmButtonText: "הבנתי",
        timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
      }).then(() => {
        navigate("/");
      });
    }
  }, [navigate]);
}
