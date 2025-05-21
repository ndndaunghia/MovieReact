import { useState, useEffect } from "react"
import "./Dashboard.css"
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESENT_NAME } from "../../../utils/cloudinary-config"

const Dashboard = () => {
  const [activityData, setActivityData] = useState([])

  // Giả lập dữ liệu hoạt động
  useEffect(() => {
    const generateData = () => {
      const data = []
      const now = new Date()

      for (let i = 29; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        data.push({
          date: `${date.getDate()}/${date.getMonth() + 1}`,
          users: Math.floor(Math.random() * 500) + 800,
        })
      }

      return data
    }

    setActivityData(generateData())
  }, [])

  console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESENT_NAME);
  

  // Dữ liệu mẫu cho phim gần đây
  const recentMovies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      poster: "https://via.placeholder.com/40x60",
      category: "Hành động",
      date: "12/05/2023",
      status: "published",
    },
    {
      id: 2,
      title: "Joker",
      poster: "https://via.placeholder.com/40x60",
      category: "Tâm lý",
      date: "10/05/2023",
      status: "published",
    },
    {
      id: 3,
      title: "Parasite",
      poster: "https://via.placeholder.com/40x60",
      category: "Kinh dị",
      date: "09/05/2023",
      status: "draft",
    },
    {
      id: 4,
      title: "The Shawshank Redemption",
      poster: "https://via.placeholder.com/40x60",
      category: "Tâm lý",
      date: "08/05/2023",
      status: "published",
    },
    {
      id: 5,
      title: "Inception",
      poster: "https://via.placeholder.com/40x60",
      category: "Khoa học viễn tưởng",
      date: "07/05/2023",
      status: "published",
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Tổng quan về hoạt động của hệ thống</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Tổng số phim</h3>
            <div className="stat-card-icon" style={{ backgroundColor: "#e3f2fd", color: "#2196f3" }}>
              🎬
            </div>
          </div>
          <div className="stat-card-value">150</div>
          <div className="stat-card-trend trend-up">
            <span className="trend-icon">↑</span> 12% so với tháng trước
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Người dùng</h3>
            <div className="stat-card-icon" style={{ backgroundColor: "#e8f5e9", color: "#4caf50" }}>
              👥
            </div>
          </div>
          <div className="stat-card-value">1,234</div>
          <div className="stat-card-trend trend-up">
            <span className="trend-icon">↑</span> 8% so với tháng trước
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Doanh thu</h3>
            <div className="stat-card-icon" style={{ backgroundColor: "#fff8e1", color: "#ffc107" }}>
              💰
            </div>
          </div>
          <div className="stat-card-value">$24,563</div>
          <div className="stat-card-trend trend-down">
            <span className="trend-icon">↓</span> 3% so với tháng trước
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Tỷ lệ chuyển đổi</h3>
            <div className="stat-card-icon" style={{ backgroundColor: "#f3e5f5", color: "#9c27b0" }}>
              📈
            </div>
          </div>
          <div className="stat-card-value">8.2%</div>
          <div className="stat-card-trend trend-up">
            <span className="trend-icon">↑</span> 1.2% so với tháng trước
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Hoạt động người dùng</h3>
          <div className="chart-container">
            {/* <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2196f3"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer> */}
          </div>
        </div>

        <div className="recent-movies">
          <h3>Phim mới thêm gần đây</h3>
          <ul className="movie-list">
            {recentMovies.map((movie) => (
              <li key={movie.id} className="movie-item">
                <img src={movie.poster || "/placeholder.svg"} alt={movie.title} className="movie-poster" />
                <div className="movie-info">
                  <h4 className="movie-title">{movie.title}</h4>
                  <div className="movie-meta">
                    <span className="movie-category">{movie.category}</span>
                    <span className="movie-date">{movie.date}</span>
                  </div>
                </div>
                <span className={`movie-status status-${movie.status}`}>
                  {movie.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
