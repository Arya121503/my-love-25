// src/components/Roadmap.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Roadmap.css';

const Roadmap = () => {
  const [visibleItems, setVisibleItems] = useState([]);

  const roadmapData = [
    {
      id: 1,
      period: "TK",
      age: "4-6 tahun",
      title: "Fashion Star Cilik",
      description: "Memenangkan banyak lomba fashion waktu masih TK",
      icon: "👗",
      color: "#ff6b9d",
      category: "achievement"
    },
    {
      id: 2,
      period: "SD Kelas 1",
      age: "6-7 tahun",
      title: "Penulis Muda Berbakat",
      description: "Menang lomba menulis waktu SD kelas 1",
      icon: "✍️",
      color: "#4ecdc4",
      category: "achievement"
    },
    {
      id: 3,
      period: "SD Kelas 3-6",
      age: "8-12 tahun",
      title: "Komandan Marching Band",
      description: "Memenangkan lomba marching band sebagai color guard dan field commander",
      icon: "🎺",
      color: "#45b7d1",
      category: "leadership"
    },
    {
      id: 4,
      period: "SD Kelas 3",
      age: "8-9 tahun",
      title: "Petualangan Bahasa Inggris Dimulai",
      description: "Memulai les bahasa Inggris di kelas 3 SD",
      icon: "🌍",
      color: "#96ceb4",
      category: "education"
    },
    {
      id: 5,
      period: "SD Kelas 4-5",
      age: "9-11 tahun",
      title: "Melodi Kehidupan",
      description: "Les alat musik sejak kelas 4/5 SD",
      icon: "🎵",
      color: "#feca57",
      category: "skill"
    },
    {
      id: 6,
      period: "SD Kelas 4-5",
      age: "9-11 tahun",
      title: "Suara Emas",
      description: "Ikut lomba nyanyi kelas 4/5 SD dan menyanyi waktu wisuda",
      icon: "🎤",
      color: "#ff9ff3",
      category: "talent"
    },
    {
      id: 7,
      period: "SMP",
      age: "12-15 tahun",
      title: "Pemimpin Klub Bahasa",
      description: "Ikut bina bakat bahasa jadi ketua klub bahasa waktu SMP",
      icon: "👑",
      color: "#54a0ff",
      category: "leadership"
    },
    {
      id: 8,
      period: "SMP",
      age: "12-15 tahun",
      title: "Anggota OSIS",
      description: "Menjadi anggota OSIS waktu SMP",
      icon: "🏛️",
      color: "#5f27cd",
      category: "organization"
    },
    {
      id: 9,
      period: "SMP",
      age: "12-15 tahun",
      title: "Paskibraka",
      description: "Jadi anggota paskibraka",
      icon: "🇮🇩",
      color: "#ff3838",
      category: "honor"
    },
    {
      id: 10,
      period: "SMP (3 tahun)",
      age: "12-15 tahun",
      title: "Triple Champion",
      description: "Ikut lomba speech, spelling bee, dan thinking skill selama 3 tahun",
      icon: "🏆",
      color: "#ffd700",
      category: "achievement"
    },
    {
      id: 11,
      period: "Wisuda SMP",
      age: "15 tahun",
      title: "Bintang Drama",
      description: "Tampil jadi pemeran utama drama perpisahan di wisuda SMP",
      icon: "🎭",
      color: "#e056fd",
      category: "talent"
    },
    {
      id: 12,
      period: "SMA Kelas 10",
      age: "15-16 tahun",
      title: "Fokus Akademik",
      description: "Masuk SMA, fokus belajar. Kelas 10 cuma les private",
      icon: "📚",
      color: "#30336b",
      category: "education"
    },
    {
      id: 13,
      period: "SMA Kelas 11",
      age: "16-17 tahun",
      title: "Super Learning Mode",
      description: "Les private + bimbel + les piano + les bahasa Inggris",
      icon: "⚡",
      color: "#f0932b",
      category: "education"
    },
    {
      id: 14,
      period: "SMA Kelas 11-12",
      age: "16-18 tahun",
      title: "English Mastery",
      description: "Pindah les dari LIA ke LBI. Ambil General English sampai English Writing",
      icon: "🎓",
      color: "#6c5ce7",
      category: "skill"
    },
    {
      id: 15,
      period: "UI Tahun 1",
      age: "18-19 tahun",
      title: "Mahasiswa Aktif",
      description: "Magang BEM dan masuk kepanitiaan Open House Fasilkom UI",
      icon: "🏫",
      color: "#00b894",
      category: "organization"
    },
    {
      id: 16,
      period: "UI",
      age: "18-22 tahun",
      title: "MBUI Journey",
      description: "Jadi Cadets MBUI, lanjut jadi Pasukan",
      icon: "⚔️",
      color: "#e17055",
      category: "organization"
    },
    {
      id: 17,
      period: "UI 2019",
      age: "19-20 tahun",
      title: "Juara IDCC",
      description: "Lomba juara 1 IDCC 2019",
      icon: "🥇",
      color: "#fdcb6e",
      category: "achievement"
    },
    {
      id: 18,
      period: "UI",
      age: "19-20 tahun",
      title: "VPIC Compfest",
      description: "Jadi VPIC divisi seminar Compfest",
      icon: "💼",
      color: "#a29bfe",
      category: "leadership"
    },
    {
      id: 19,
      period: "UI",
      age: "20-22 tahun",
      title: "Multi-Talented Leader",
      description: "Staff humpub MBUI, MC, ketua panitia berbagai acara, moderator Pemilihan Ketua",
      icon: "🌟",
      color: "#fd79a8",
      category: "leadership"
    },
    {
      id: 20,
      period: "Pasca UI",
      age: "22-23 tahun",
      title: "Next Level: NUS S2",
      description: "Lulus S1, melanjutkan S2 di NUS",
      icon: "🚀",
      color: "#00cec9",
      category: "education"
    },
    {
      id: 21,
      age: "24 tahun",
      title: "Anomali: The Future",
      description: "Diterima kerja di Bank Indonesia",
      icon: "🏦",
      color: "#00b894",
      category: "career"
    },
    {
      id: 22,
      age: "24+ tahun",
      title: "The Masterpiece",
      description: "Lulus S2, siap mengukir prestasi baru",
      icon: "🌈",
      color: "#d63031",
      category: "future"
    },
    {
      id: 23,
      age: "25+ tahun",
      title: "Legacy in the Making",
      description: "Membangun warisan yang menginspirasi generasi mendatang",
      icon: "🏰",
      color: "#6c5ce7",
      category: "future"
    }

  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setVisibleItems(prev => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.roadmap-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getCategoryLabel = (category) => {
    const labels = {
      achievement: "Prestasi",
      leadership: "Kepemimpinan", 
      education: "Pendidikan",
      skill: "Keahlian",
      talent: "Bakat",
      organization: "Organisasi",
      honor: "Kehormatan",
      career: "Karir",
      future: "Masa Depan"
      
    };
    return labels[category] || category;
  };

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <h2>🌟 Perjalanan Hidup Sang Bintang 🌟</h2>
        <p>Jejak langkah menuju kesuksesan yang menginspirasi</p>
      </div>

      <div className="roadmap-timeline">
        {roadmapData.map((item, index) => (
          <div
            key={item.id}
            className={`roadmap-item ${visibleItems.includes(item.id) ? 'visible' : ''} ${index % 2 === 0 ? 'left' : 'right'}`}
            data-id={item.id}
            style={{ '--accent-color': item.color }}
          >
            <div className="roadmap-content">
              <div className="roadmap-icon" style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <div className="roadmap-details">
                <div className="roadmap-period">{item.period}</div>
                <div className="roadmap-age">Usia: {item.age}</div>
                <h3 className="roadmap-title">{item.title}</h3>
                <p className="roadmap-description">{item.description}</p>
                <span className="roadmap-category" style={{ backgroundColor: item.color }}>
                  {getCategoryLabel(item.category)}
                </span>
              </div>
            </div>
            <div className="roadmap-connector"></div>
          </div>
        ))}
      </div>

      <div className="roadmap-footer">
        <div className="achievement-stats">
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">Pencapaian</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24</span>
            <span className="stat-label">Tahun Perjalanan</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Potensi Masa Depan</span>
          </div>
        </div>
        <div className="roadmap-message">
          <p>✨ "Setiap langkah adalah bagian dari masterpiece kehidupan yang luar biasa" ✨</p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
