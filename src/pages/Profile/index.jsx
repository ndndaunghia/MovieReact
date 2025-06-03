import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword, clearError, updateProfile } from "../../redux/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    name: user?.data?.name || "",
    email: user?.data?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateProfile({
          name: profileData.name,
          email: profileData.email,
        }),
      ).unwrap();
      toast.success("Cập nhật thông tin thành công!");
      setIsEditingProfile(false);
    } catch (error) {
      if (error.detail) {
        const errorMessages = Object.values(error.detail)
          .filter((msg) => msg)
          .join(" ");
        toast.error(errorMessages || "Có lỗi xảy ra, vui lòng thử lại!");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
      console.error("Update profile error:", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("Xác nhận mật khẩu không khớp");
      return;
    }

    try {
      await dispatch(
        changePassword({
          password: passwordData.password,
          new_password: passwordData.new_password,
        }),
      ).unwrap();
      toast.success("Đổi mật khẩu thành công!");
      setPasswordData({ password: "", new_password: "", confirm_password: "" });
    } catch (error) {
      if (error.detail) {
        const errorMessages = Object.values(error.detail)
          .filter((msg) => msg)
          .join(" ");
        toast.error(errorMessages || "Có lỗi xảy ra, vui lòng thử lại!");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
      console.error("Change password error:", error);
    }
  };

  const handleProfileInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const cancelProfileEdit = () => {
    setProfileData({
      name: user?.data?.name || "",
      email: user?.data?.email || "",
    });
    setIsEditingProfile(false);
  };

  useEffect(() => {
    if (error && !error.detail) {
      toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại!");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const inputStyle = {
    background: "#333",
    border: "none",
    outline: "none",
    boxShadow: "none",
    borderBottom: "1px solid orange",
    color: "white",
  };

  const disabledInputStyle = {
    ...inputStyle,
    borderBottom: "1px solid #666",
    opacity: 0.7,
  };

  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <ul className="nav nav-tabs mb-4" style={{ borderBottom: "1px solid #444" }}>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
                style={{
                  background: activeTab === "profile" ? "#333" : "transparent",
                  color: activeTab === "profile" ? "orange" : "white",
                  border: "none",
                  borderBottom: activeTab === "profile" ? "2px solid orange" : "none",
                }}
              >
                Thông tin cá nhân
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "password" ? "active" : ""}`}
                onClick={() => setActiveTab("password")}
                style={{
                  background: activeTab === "password" ? "#333" : "transparent",
                  color: activeTab === "password" ? "orange" : "white",
                  border: "none",
                  borderBottom: activeTab === "password" ? "2px solid orange" : "none",
                }}
              >
                Đổi mật khẩu
              </button>
            </li>
          </ul>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSubmit} style={{ color: "white" }}>
              <h3 className="text-center mb-4">Thông tin tài khoản</h3>

              <div className="mb-3">
                <label className="form-label">Tên người dùng</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={profileData.name}
                  onChange={handleProfileInputChange}
                  disabled={!isEditingProfile}
                  style={isEditingProfile ? inputStyle : disabledInputStyle}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={profileData.email}
                  onChange={handleProfileInputChange}
                  disabled={!isEditingProfile}
                  style={isEditingProfile ? inputStyle : disabledInputStyle}
                  required
                />
              </div>

              <div className="text-center">
                {!isEditingProfile ? (
                  <button type="button" className="btn btn-outline-warning" onClick={() => setIsEditingProfile(true)}>
                    Chỉnh sửa thông tin
                  </button>
                ) : (
                  <div>
                    <button type="submit" className="btn btn-warning me-3" disabled={loading}>
                      {loading ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={cancelProfileEdit} disabled={loading}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} style={{ color: "white" }}>
              <h3 className="text-center mb-4">Đổi mật khẩu</h3>

              <div className="mb-3">
                <label className="form-label">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={passwordData.password}
                  onChange={handlePasswordInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  name="new_password"
                  className="form-control"
                  value={passwordData.new_password}
                  onChange={handlePasswordInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  name="confirm_password"
                  className="form-control"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-warning" disabled={loading}>
                  {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}