document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const videoTitle = document.getElementById('videoTitle');
    const videoThumbnailContainer = document.getElementById('videoThumbnailContainer');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const updateWatchRecordButton = document.getElementById('updateWatchRecordButton');
    const removeFromPlaylistButton = document.getElementById('removeFromPlaylistButton');
    let videoLink = document.getElementById('videoLink');

    let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    if (!currentVideo) {
        alert('No current video found!');
        return;
    }

    // 初始設置標題
    const maxTitleLength = 20;
    let fullTitle = currentVideo.title;
    if (fullTitle.length > maxTitleLength) {
        videoTitle.innerHTML = `<span id="shortTitle">${fullTitle.slice(0, maxTitleLength)}...</span> <span id="more" style="color: #08375f; cursor: pointer;">more</span>`;
        videoTitle.querySelector('#more').addEventListener('click', () => {
            videoTitle.innerHTML = `${fullTitle} <span id="less" style="color: #08375f; cursor: pointer;">less</span>`;
            videoTitle.querySelector('#less').addEventListener('click', () => {
                videoTitle.innerHTML = `<span id="shortTitle">${fullTitle.slice(0, maxTitleLength)}...</span> <span id="more" style="color: #08375f; cursor: pointer;">more</span>`;
                videoTitle.querySelector('#more').addEventListener('click', () => {
                    videoTitle.innerHTML = `${fullTitle} <span id="less" style="color: #08375f; cursor: pointer;">less</span>`;
                    videoTitle.querySelector('#less').addEventListener('click', () => {
                        videoTitle.innerHTML = `<span id="shortTitle">${fullTitle.slice(0, maxTitleLength)}...</span> <span id="more" style="color: #08375f; cursor: pointer;">more</span>`;
                    });
                });
            });
        });
    } else {
        videoTitle.textContent = fullTitle;
    }

    const [h, m, s] = currentVideo.watchTime.split(':').map(time => time.padStart(2, '0'));
    hours.value = h;
    minutes.value = m;
    seconds.value = s;

    const videoBaseLink = `https://www.youtube.com/watch?v=${currentVideo.id}`;
    localStorage.setItem('videoBaseLink', videoBaseLink);

    function getTotalSeconds() {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        return hoursInSeconds + minutesInSeconds + secondsInSeconds;
    }

    function embedVideoWithStartTime() {
        const totalSeconds = getTotalSeconds();
        const videoId = currentVideo.id;
        const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${totalSeconds}`;

        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.width = '560';
        iframe.height = '315';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        videoThumbnailContainer.innerHTML = ''; // 清空容器
        videoThumbnailContainer.appendChild(iframe); // 插入影片
    }

    function updateVideoLink() {
        const totalSeconds = getTotalSeconds();
        videoLink.href = `${videoBaseLink}${totalSeconds ? `&t=${totalSeconds}` : ''}`;
        embedVideoWithStartTime(); // 更新嵌入的影片
    }

    // 初始嵌入影片
    embedVideoWithStartTime();
    updateVideoLink();

    // 監聽輸入框變動事件
    hours.addEventListener('input', updateVideoLink);
    minutes.addEventListener('input', updateVideoLink);
    seconds.addEventListener('input', updateVideoLink);

    updateWatchRecordButton.addEventListener('click', () => {
        const totalSeconds = getTotalSeconds();
        const watchTime = `${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}:${seconds.value.padStart(2, '0')}`;
        currentVideo.watchTime = watchTime;
        currentVideo.totalSeconds = totalSeconds;

        const videoIndex = playlist.findIndex(v => v.id === currentVideo.id);
        if (videoIndex !== -1) {
            playlist[videoIndex] = currentVideo;
            localStorage.setItem('playlist', JSON.stringify(playlist));
            alert('Watch record updated');
        }
    });

    removeFromPlaylistButton.addEventListener('click', () => {
        playlist = playlist.filter(video => video.id !== currentVideo.id);
        localStorage.setItem('playlist', JSON.stringify(playlist));
        alert('Video removed from playlist');
        window.location.href = 'playlist.html';
    });

    backButton.addEventListener('click', () => {
        window.history.back();
    });

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });
});


/*連結錯誤
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const videoTitle = document.getElementById('videoTitle');
    const videoThumbnailContainer = document.getElementById('videoThumbnailContainer');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const updateWatchRecordButton = document.getElementById('updateWatchRecordButton');
    const removeFromPlaylistButton = document.getElementById('removeFromPlaylistButton');
    let videoLink = document.getElementById('videoLink');
    
    let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    // 初始化頁面內容
    videoTitle.textContent = currentVideo.title;
    const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
    const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
    const secondsInSeconds = parseInt(seconds.value, 10) || 0;
    const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;
    videoLink.href =`https://www.youtube.com/watch?v=${currentVideo.id}${totalSeconds ? `&t=${totalSeconds}` : ''}`;

    function embedVideoWithStartTime() {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;

        const videoId = currentVideo.id;
        const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${totalSeconds}`;
        
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.width = '560';
        iframe.height = '315';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        videoThumbnailContainer.innerHTML = ''; // 清空容器
        videoThumbnailContainer.appendChild(iframe); // 插入影片
    }

    const [h, m, s] = currentVideo.watchTime.split(':');
    hours.value = h;
    minutes.value = m;
    seconds.value = s;

    // 初始嵌入影片
    embedVideoWithStartTime();

    // 確保 videoBaseLink 正確設置
    const videoBaseLink = `https://www.youtube.com/watch?v=${currentVideo.id}`;
    localStorage.setItem('videoBaseLink', videoBaseLink);

    function updateVideoLink() {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;

        videoLink.href = `${videoBaseLink}${totalSeconds ? `&t=${totalSeconds}` : ''}`;
        embedVideoWithStartTime(); // 更新嵌入的影片
    }

    // 監聽輸入框變動事件
    hours.addEventListener('input', updateVideoLink);
    minutes.addEventListener('input', updateVideoLink);
    seconds.addEventListener('input', updateVideoLink);

    updateWatchRecordButton.addEventListener('click', () => {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;

        const watchTime = `${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}:${seconds.value.padStart(2, '0')}`;
        currentVideo.watchTime = watchTime;
        currentVideo.totalSeconds = totalSeconds;

        const videoIndex = playlist.findIndex(v => v.id === currentVideo.id);
        if (videoIndex !== -1) {
            playlist[videoIndex] = currentVideo;
            localStorage.setItem('playlist', JSON.stringify(playlist));
            alert('Watch record updated');
        }
    });

    removeFromPlaylistButton.addEventListener('click', () => {
        playlist = playlist.filter(video => video.id !== currentVideo.id);
        localStorage.setItem('playlist', JSON.stringify(playlist));
        alert('Video removed from playlist');
        window.location.href = 'playlist.html';
    });

    backButton.addEventListener('click', () => {
        window.history.back();
    });

    
});
document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });






/* 鄭成功-縮圖版
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const videoTitle = document.getElementById('videoTitle');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const updateWatchRecordButton = document.getElementById('updateWatchRecordButton');
    const removeFromPlaylistButton = document.getElementById('removeFromPlaylistButton');
    const videoLink = document.getElementById('videoLink');
    let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    // 初始化頁面內容
    videoTitle.textContent = currentVideo.title;
    videoThumbnail.src = currentVideo.thumbnail;

    const [h, m, s] = currentVideo.watchTime.split(':');
    hours.value = h;
    minutes.value = m;
    seconds.value = s;

    // 確保 videoBaseLink 正確設置
    const videoBaseLink = `https://www.youtube.com/watch?v=${currentVideo.id}`;
    localStorage.setItem('videoBaseLink', videoBaseLink);

    function updateVideoLink() {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;
        
        videoLink.href = `${videoBaseLink}${totalSeconds ? `&t=${totalSeconds}` : ''}`;
    }

    // 初始更新連結
    updateVideoLink();

    // 監聽輸入框變動事件
    hours.addEventListener('input', updateVideoLink);
    minutes.addEventListener('input', updateVideoLink);
    seconds.addEventListener('input', updateVideoLink);

    updateWatchRecordButton.addEventListener('click', () => {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;

        const watchTime = `${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}:${seconds.value.padStart(2, '0')}`;
        currentVideo.watchTime = watchTime;
        currentVideo.totalSeconds = totalSeconds;

        const videoIndex = playlist.findIndex(v => v.id === currentVideo.id);
        if (videoIndex !== -1) {
            playlist[videoIndex] = currentVideo;
            localStorage.setItem('playlist', JSON.stringify(playlist));
            alert('Watch record updated');
        }
    });

    removeFromPlaylistButton.addEventListener('click', () => {
        playlist = playlist.filter(video => video.id !== currentVideo.id);
        localStorage.setItem('playlist', JSON.stringify(playlist));
        alert('Video removed from playlist');
        window.location.href = 'playlist.html';
    });

    backButton.addEventListener('click', () => {
        window.history.back();
    });

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });
});




/*document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const videoTitle = document.getElementById('videoTitle');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const updateWatchRecordButton = document.getElementById('updateWatchRecordButton');
    const removeFromPlaylistButton = document.getElementById('removeFromPlaylistButton');
    const videoLink = document.getElementById('videoLink');
    let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    videoTitle.textContent = currentVideo.title;
    videoThumbnail.src = currentVideo.thumbnail;
    
    let totalSeconds = 0;

    // 根據 totalSeconds 的值設定 videoLink.href
    videoLink.href = `https://www.youtube.com/watch?v=${currentVideo.id.videoId}${totalSeconds ? `&t=${totalSeconds}` : ''}`;

    const [h, m, s] = currentVideo.watchTime.split(':');
    hours.value = h;
    minutes.value = m;
    seconds.value = s;

    updateWatchRecordButton.addEventListener('click', () => {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60;
        const seconds = parseInt(seconds.value, 10);
        const totalSeconds = hoursInSeconds + minutesInSeconds + seconds;


        const watchTime = `${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}:${seconds.value.padStart(2, '0')}`;
        currentVideo.watchTime = watchTime;
        currentVideo.totalSeconds = totalSeconds; // 更新 totalSeconds

        const videoIndex = playlist.findIndex(v => v.id === currentVideo.id);
        if (videoIndex !== -1) {
            playlist[videoIndex] = currentVideo;
            localStorage.setItem('playlist', JSON.stringify(playlist));
            alert('Watch record updated');
        }
    });

    removeFromPlaylistButton.addEventListener('click', () => {
        playlist = playlist.filter(video => video.id !== currentVideo.id);
        localStorage.setItem('playlist', JSON.stringify(playlist));
        alert('Video removed from playlist');
        window.location.href = 'playlist.html';
    });

    backButton.addEventListener('click', () => {
        window.history.back();
    });
});





    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });
    */