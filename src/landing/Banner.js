import { useState } from "react";

const bannerImages = [
  {
    id: 0,
    src: "/images/hoakhaitruong/hoakhaitruong1.jpg",
    title: "Hương Sắc Thiên Nhiên – Kết Nối Cảm Xúc",
    description: "Trao Hoa – Trao Cảm Xúc, Gửi Yêu Thương",
  },
  {
    id: 1,
    src: "/images/hoasinhnhat/hoasinhnhat1.jpg",
    title: "Hoa Sinh Nhật - Món Quà Ý Nghĩa",
    description: "Những bó hoa tươi thắm, đầy màu sắc dành cho người thân yêu.",
  },
  {
    id: 2,
    src: "/images/hoakhaitruong/hoakhaitruong2.jpg",
    title: "Lan Hồ Điệp - Vẻ Đẹp Tinh Tế",
    description: "Vẻ đẹp thanh tao, phù hợp cho mọi dịp quan trọng.",
  },
];

function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      id="bannerCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "56px" }}
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {bannerImages.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide-to={index}
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel Items */}
      <div className="carousel-inner">
        {bannerImages.map((banner, index) => (
          <div
            key={banner.id}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            data-bs-interval="2000"
          >
            <div
              className="ratio"
              style={{ "--bs-aspect-ratio": "50%", maxHeight: "460px" }}
            >
              <img
                className="d-block w-100 h-100 object-fit-cover"
                alt={banner.title}
                src={banner.src}
              />
            </div>
            <div className="carousel-caption d-none d-lg-block text-dark">
              <h5 className="fw-bold">{banner.title}</h5>
              <p className="fw-normal">{banner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
