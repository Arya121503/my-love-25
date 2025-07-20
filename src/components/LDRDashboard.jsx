import React, { useState, useEffect } from 'react';
import './LDRDashboard.css';

const LDRDashboard = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [daysTogether, setDaysTogether] = useState(0);
    const [nextMeetingDate, setNextMeetingDate] = useState('');
    const [daysUntilMeeting, setDaysUntilMeeting] = useState(0);
    const [virtualHugs, setVirtualHugs] = useState(0);
    const [todayMood, setTodayMood] = useState('');
    const [partnerMood, setPartnerMood] = useState('');
    const [showStartDateModal, setShowStartDateModal] = useState(false);
    const [showMeetingModal, setShowMeetingModal] = useState(false);
    const [tempDate, setTempDate] = useState('');

    // Koordinat Surabaya dan Depok
    const locations = {
        surabaya: { lat: -7.2575, lng: 112.7521, city: "Surabaya" },
        depok: { lat: -6.4025, lng: 106.7942, city: "Depok" }
    };

    // Hitung jarak antara Surabaya dan Depok
    const calculateDistance = () => {
        const R = 6371; // Radius bumi dalam km
        const dLat = (locations.depok.lat - locations.surabaya.lat) * Math.PI / 180;
        const dLon = (locations.depok.lng - locations.surabaya.lng) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(locations.surabaya.lat * Math.PI / 180) * Math.cos(locations.depok.lat * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return Math.round(R * c);
    };

    const distance = calculateDistance();

    // Update waktu setiap detik
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Load data dari localStorage
    useEffect(() => {
        const savedHugs = localStorage.getItem('virtualHugs');
        const savedMeeting = localStorage.getItem('nextMeetingDate');
        const savedStartDate = localStorage.getItem('relationshipStartDate');
        const savedTodayMood = localStorage.getItem('todayMood');
        const savedPartnerMood = localStorage.getItem('partnerMood');

        if (savedHugs) setVirtualHugs(parseInt(savedHugs));
        if (savedMeeting) setNextMeetingDate(savedMeeting);
        if (savedTodayMood) setTodayMood(savedTodayMood);
        if (savedPartnerMood) setPartnerMood(savedPartnerMood);

        // Hitung hari bersama
        if (savedStartDate) {
            const startDate = new Date(savedStartDate);
            const today = new Date();
            const diffTime = Math.abs(today - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysTogether(diffDays);
        }
    }, []);

    // Hitung hari sampai meeting
    useEffect(() => {
        if (nextMeetingDate) {
            const meetingDate = new Date(nextMeetingDate);
            const today = new Date();
            const diffTime = meetingDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysUntilMeeting(diffDays > 0 ? diffDays : 0);
        }
    }, [nextMeetingDate]);

    const sendVirtualHug = () => {
        const newHugCount = virtualHugs + 1;
        setVirtualHugs(newHugCount);
        localStorage.setItem('virtualHugs', newHugCount.toString());
        
        // Animasi hug
        const hugButton = document.querySelector('.hug-button');
        hugButton.classList.add('hug-sent');
        setTimeout(() => {
            hugButton.classList.remove('hug-sent');
        }, 1000);
    };

    const openMeetingModal = () => {
        setTempDate(nextMeetingDate || '');
        setShowMeetingModal(true);
    };

    const openStartDateModal = () => {
        const savedStartDate = localStorage.getItem('relationshipStartDate');
        setTempDate(savedStartDate || '');
        setShowStartDateModal(true);
    };

    const saveMeetingDate = () => {
        if (tempDate) {
            setNextMeetingDate(tempDate);
            localStorage.setItem('nextMeetingDate', tempDate);
        }
        setShowMeetingModal(false);
        setTempDate('');
    };

    const saveStartDate = () => {
        if (tempDate) {
            localStorage.setItem('relationshipStartDate', tempDate);
            const startDate = new Date(tempDate);
            const today = new Date();
            const diffTime = Math.abs(today - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysTogether(diffDays);
        }
        setShowStartDateModal(false);
        setTempDate('');
    };

    const closeModal = () => {
        setShowMeetingModal(false);
        setShowStartDateModal(false);
        setTempDate('');
    };

    const updateMood = (mood, isYours = true) => {
        if (isYours) {
            setTodayMood(mood);
            localStorage.setItem('todayMood', mood);
        } else {
            setPartnerMood(mood);
            localStorage.setItem('partnerMood', mood);
        }
    };

    const moodEmojis = {
        happy: '😊',
        love: '🥰',
        miss: '😢',
        excited: '🤩',
        tired: '😴',
        work: '💼'
    };

    return (
        <div className="ldr-dashboard">
            <div className="dashboard-header">
                <h2>💕 Dashboard LDR Kita</h2>
                <div className="current-time">
                    <p>{currentTime}</p>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Distance Card */}
                <div className="dashboard-card distance-card">
                    <div className="card-icon">📍</div>
                    <h3>Jarak Kita</h3>
                    <div className="distance-info">
                        <p className="distance-number">{distance} km</p>
                        <p className="locations">Surabaya ↔ Depok</p>
                        <p className="travel-time">~12 jam perjalanan darat</p>
                    </div>
                </div>

                {/* Days Together Card */}
                <div className="dashboard-card days-card">
                    <div className="card-icon">💖</div>
                    <h3>Hari Bersama</h3>
                    <div className="days-info">
                        <p className="days-number">{daysTogether}</p>
                        <p>hari bersama</p>
                        <button onClick={openStartDateModal} className="set-date-btn">
                            {daysTogether === 0 ? 'Set Tanggal Mulai' : 'Update Tanggal'}
                        </button>
                    </div>
                </div>

                {/* Next Meeting Card */}
                <div className="dashboard-card meeting-card">
                    <div className="card-icon">✈️</div>
                    <h3>Pertemuan Selanjutnya</h3>
                    <div className="meeting-info">
                        {daysUntilMeeting > 0 ? (
                            <>
                                <p className="days-number">{daysUntilMeeting}</p>
                                <p>hari lagi!</p>
                                <p className="meeting-date">{new Date(nextMeetingDate).toLocaleDateString('id-ID')}</p>
                            </>
                        ) : (
                            <p>Belum ada rencana</p>
                        )}
                        <button onClick={openMeetingModal} className="set-meeting-btn">
                            {nextMeetingDate ? 'Update Tanggal' : 'Set Tanggal Meeting'}
                        </button>
                    </div>
                </div>

                {/* Virtual Hugs Card */}
                <div className="dashboard-card hugs-card">
                    <div className="card-icon">🤗</div>
                    <h3>Virtual Hugs</h3>
                    <div className="hugs-info">
                        <p className="hugs-number">{virtualHugs}</p>
                        <p>pelukan terkirim</p>
                        <button onClick={sendVirtualHug} className="hug-button">
                            Kirim Pelukan 💕
                        </button>
                    </div>
                </div>

                {/* Mood Tracker */}
                <div className="dashboard-card mood-card">
                    <div className="card-icon">😊</div>
                    <h3>Mood Hari Ini</h3>
                    <div className="mood-section">
                        <div className="your-mood">
                            <p>Mood Kamu:</p>
                            <div className="current-mood">
                                {todayMood ? moodEmojis[todayMood] : '❓'}
                            </div>
                            <div className="mood-buttons">
                                {Object.entries(moodEmojis).map(([mood, emoji]) => (
                                    <button 
                                        key={mood}
                                        onClick={() => updateMood(mood, true)}
                                        className={`mood-btn ${todayMood === mood ? 'active' : ''}`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="partner-mood">
                            <p>Mood Pasangan:</p>
                            <div className="current-mood">
                                {partnerMood ? moodEmojis[partnerMood] : '❓'}
                            </div>
                            <div className="mood-buttons">
                                {Object.entries(moodEmojis).map(([mood, emoji]) => (
                                    <button 
                                        key={mood}
                                        onClick={() => updateMood(mood, false)}
                                        className={`mood-btn ${partnerMood === mood ? 'active' : ''}`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="dashboard-card stats-card">
                    <div className="card-icon">📊</div>
                    <h3>Quick Stats</h3>
                    <div className="stats-list">
                        <div className="stat-item">
                            <span>🚄</span>
                            <span>Kereta: ~8-10 jam</span>
                        </div>
                        <div className="stat-item">
                            <span>✈️</span>
                            <span>Pesawat: ~1.5 jam</span>
                        </div>
                        <div className="stat-item">
                            <span>🚗</span>
                            <span>Mobil: ~12 jam</span>
                        </div>
                        <div className="stat-item">
                            <span>💕</span>
                            <span>Cinta: Tak terbatas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Start Date Modal */}
            {showStartDateModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>💕 Kapan Kalian Mulai Bersama?</h3>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>Pilih tanggal spesial ketika kalian resmi bersama</p>
                            <div className="date-input-container">
                                <label htmlFor="start-date">Tanggal Mulai Hubungan:</label>
                                <input
                                    id="start-date"
                                    type="date"
                                    value={tempDate}
                                    onChange={(e) => setTempDate(e.target.value)}
                                    className="date-input"
                                    max={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="modal-actions">
                                <button onClick={closeModal} className="cancel-btn">
                                    Batal
                                </button>
                                <button onClick={saveStartDate} className="save-btn" disabled={!tempDate}>
                                    💖 Simpan Tanggal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Meeting Date Modal */}
            {showMeetingModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>✈️ Kapan Kalian Akan Bertemu?</h3>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>Tentukan tanggal pertemuan yang sudah direncanakan</p>
                            <div className="date-input-container">
                                <label htmlFor="meeting-date">Tanggal Pertemuan:</label>
                                <input
                                    id="meeting-date"
                                    type="date"
                                    value={tempDate}
                                    onChange={(e) => setTempDate(e.target.value)}
                                    className="date-input"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="meeting-suggestions">
                                <p>💡 Saran pertemuan:</p>
                                <div className="suggestion-buttons">
                                    <button 
                                        onClick={() => {
                                            const nextWeek = new Date();
                                            nextWeek.setDate(nextWeek.getDate() + 7);
                                            setTempDate(nextWeek.toISOString().split('T')[0]);
                                        }}
                                        className="suggestion-btn"
                                    >
                                        Minggu Depan
                                    </button>
                                    <button 
                                        onClick={() => {
                                            const nextMonth = new Date();
                                            nextMonth.setMonth(nextMonth.getMonth() + 1);
                                            setTempDate(nextMonth.toISOString().split('T')[0]);
                                        }}
                                        className="suggestion-btn"
                                    >
                                        Bulan Depan
                                    </button>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button onClick={closeModal} className="cancel-btn">
                                    Batal
                                </button>
                                <button onClick={saveMeetingDate} className="save-btn" disabled={!tempDate}>
                                    🎯 Simpan Tanggal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LDRDashboard;