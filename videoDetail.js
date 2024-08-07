//鄭成功嵌入版
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const videoTitle = document.getElementById('videoTitle');
    const videoThumbnailContainer = document.getElementById('videoThumbnailContainer');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const addToPlaylistButton = document.getElementById('addToPlaylistButton');
    const updurl = document.getElementById('updurl');
    const videoLink = document.getElementById('videoLink');
    let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    if (currentVideo) {
        const fullTitle = currentVideo.snippet.title;
        const maxTitleLength = 20;

        // 設置初始標題顯示狀態
        function setTitleDisplay(expand = false) {
            if (expand) {
                videoTitle.innerHTML = `${fullTitle} <span id="toggleTitle" style="color: #08375f; cursor: pointer;">less</span>`;
            } else {
                videoTitle.innerHTML = `<span id="shortTitle">${fullTitle.slice(0, maxTitleLength)}...</span> <span id="toggleTitle" style="color: #08375f; cursor: pointer;">more</span>`;
            }
            // 重新綁定事件處理器
            videoTitle.querySelector('#toggleTitle').addEventListener('click', () => {
                setTitleDisplay(!expand); // 切換顯示狀態
            });
        }

        // 如果標題超過最大長度，顯示縮短版標題，否則顯示完整標題
        if (fullTitle.length > maxTitleLength) {
            setTitleDisplay(false); // 初始顯示縮短版標題
        } else {
            videoTitle.textContent = fullTitle;
        }
        
        const videoId = currentVideo.id.videoId;
        embedVideoWithStartTime(videoId, 0); // 初始嵌入影片，初始時間為0

        updateVideoLink(); // 初始化時更新連結
    }
    

    function embedVideoWithStartTime(videoId, startTime) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?start=${startTime}`;
        iframe.width = '560';
        iframe.height = '315';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        videoThumbnailContainer.innerHTML = ''; // 清空容器
        videoThumbnailContainer.appendChild(iframe); // 插入影片
    }

    function updateVideoLink() {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;

        const videoId = currentVideo.id.videoId;
        const baseLink = `https://www.youtube.com/watch?v=${videoId}`;
        videoLink.href = `${baseLink}&t=${totalSeconds}`;

        localStorage.setItem('videoBaseLink', baseLink);

        embedVideoWithStartTime(videoId, totalSeconds); // 更新嵌入影片的開始時間
    }

    // 監聽所有輸入框的變動
    hours.addEventListener('input', updateVideoLink);
    minutes.addEventListener('input', updateVideoLink);
    seconds.addEventListener('input', updateVideoLink);

    addToPlaylistButton.addEventListener('click', () => {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;

        const watchTime = `${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}:${seconds.value.padStart(2, '0')}`;
        const video = {
            id: currentVideo.id.videoId,
            title: currentVideo.snippet.title,
            thumbnail: currentVideo.snippet.thumbnails.high.url,
            watchTime: watchTime,
            totalSeconds: totalSeconds
        };

        const existingVideo = playlist.find(v => v.id === video.id);
        if (existingVideo) {
            existingVideo.watchTime = watchTime;
            existingVideo.totalSeconds = totalSeconds;
            alert('已經添加過囉!  Watch time updated in the playlist');
        } else {
            playlist.push(video);
            alert('成功新增至片單!  Video added to the playlist');
        }

        localStorage.setItem('playlist', JSON.stringify(playlist));
        //window.location.href = 'index.html';
    });

    backButton.addEventListener('click', () => {
        window.history.back();
    });

    updurl.addEventListener('click', () => {
        updateVideoLink();
        // 重新加載頁面以顯示最新的連結
        window.location.reload();
    });

    
});
document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('playlistButton').addEventListener('click', () => {
    window.location.href = 'playlist.html';
});

/* 鄭成功版
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const videoTitle = document.getElementById('videoTitle');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const addToPlaylistButton = document.getElementById('addToPlaylistButton');
    const updurl = document.getElementById('updurl');
    const videoLink = document.getElementById('videoLink');
    let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    if (currentVideo) {
        videoTitle.textContent = currentVideo.snippet.title;
        videoThumbnail.src = currentVideo.snippet.thumbnails.high.url;

        
        updateVideoLink(); // 初始化時更新連結
    }

    function updateVideoLink() {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;
        
        
        const baseLink = `https://www.youtube.com/watch?v=${currentVideo.id.videoId}`;
        videoLink.href = `https://www.youtube.com/watch?v=${currentVideo.id.videoId}&t=${totalSeconds}`;

        localStorage.setItem('videoBaseLink', baseLink);
    }

    // 監聽所有輸入框的變動
    hours.addEventListener('input', updateVideoLink);
    minutes.addEventListener('input', updateVideoLink);
    seconds.addEventListener('input', updateVideoLink);

    addToPlaylistButton.addEventListener('click', () => {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        const totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;

        console.log(hoursInSeconds, minutesInSeconds, secondsInSeconds, totalSeconds);

        const watchTime = `${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}:${seconds.value.padStart(2, '0')}`;
        const video = {
            id: currentVideo.id.videoId,
            title: currentVideo.snippet.title,
            thumbnail: currentVideo.snippet.thumbnails.high.url,
            watchTime: watchTime,
            totalSeconds: totalSeconds
        };

        const existingVideo = playlist.find(v => v.id === video.id);
        if (existingVideo) {
            existingVideo.watchTime = watchTime;
            existingVideo.totalSeconds = totalSeconds;
            alert('Watch time updated in the playlist');
        } else {
            playlist.push(video);
            alert('Video added to the playlist');
        }

        localStorage.setItem('playlist', JSON.stringify(playlist));
        window.location.href = 'index.html';
    });

    backButton.addEventListener('click', () => {
        window.history.back();
    });

    updurl.addEventListener('click', () => {
        updateVideoLink();
        // 重新加載頁面以顯示最新的連結
        window.location.reload();
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
    const addToPlaylistButton = document.getElementById('addToPlaylistButton');
    const updurl = document.getElementById('addToPlaylistButton');
    const videoLink = document.getElementById('videoLink');
    let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    if (currentVideo) {
        videoTitle.textContent = currentVideo.snippet.title;
        videoThumbnail.src = currentVideo.snippet.thumbnails.high.url;
        videoLink.href = `https://www.youtube.com/watch?v=${currentVideo.id.videoId}&t=${0}`;
    }

    addToPlaylistButton.addEventListener('click', () => {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600 || 0;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60 || 0;
        const secondsInSeconds = parseInt(seconds.value, 10) || 0;
        let totalSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;

        console.log(hoursInSeconds, minutesInSeconds, secondsInSeconds, totalSeconds);

        const watchTime = `${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}:${seconds.value.padStart(2, '0')}`;
        const video = {
            id: currentVideo.id.videoId,
            title: currentVideo.snippet.title,
            thumbnail: currentVideo.snippet.thumbnails.high.url,
            watchTime: watchTime,
            totalSeconds: totalSeconds
        };

        const existingVideo = playlist.find(v => v.id === video.id);
        if (existingVideo) {
            existingVideo.watchTime = watchTime;
            existingVideo.totalSeconds = totalSeconds;
            alert('Watch time updated in the playlist');
        } else {
            playlist.push(video);
            alert('Video added to the playlist');
        }

        localStorage.setItem('playlist', JSON.stringify(playlist));
        window.location.href = 'index.html';
    });

    backButton.addEventListener('click', () => {
        window.history.back();
    });


    updurl.addEventListener('click', () => {
        videoLink.href = `https://www.youtube.com/watch?v=${currentVideo.id.videoId}${totalSeconds ? `&t=${totalSeconds}` : ''}`;
    });
    
    

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const videoTitle = document.getElementById('videoTitle');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const addToPlaylistButton = document.getElementById('addToPlaylistButton');
    const videoLink = document.getElementById('videoLink');
    let currentVideo = JSON.parse(localStorage.getItem('currentVideo'));
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    videoTitle.textContent = currentVideo.snippet.title;
    videoThumbnail.src = currentVideo.snippet.thumbnails.high.url;

    let totalSeconds = 0; 
    videoLink.href = `https://www.youtube.com/watch?v=${currentVideo.id.videoId}&t=${totalSeconds}`;

    addToPlaylistButton.addEventListener('click', () => {
        const hoursInSeconds = parseInt(hours.value, 10) * 3600;
        const minutesInSeconds = parseInt(minutes.value, 10) * 60;
        const seconds = parseInt(seconds.value, 10);
        const totalSeconds = hoursInSeconds + minutesInSeconds + seconds;


        const watchTime = `${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}:${seconds.value.padStart(2, '0')}`;
        const video = {
            id: currentVideo.id.videoId,
            title: currentVideo.snippet.title,
            thumbnail: currentVideo.snippet.thumbnails.high.url,
            watchTime: watchTime,
            totalSeconds: totalSeconds
        };

        const existingVideo = playlist.find(v => v.id === video.id);
        if (existingVideo) {
            existingVideo.watchTime = watchTime;
            existingVideo.totalSeconds = totalSeconds;
            alert('Watch time updated in the playlist');
        } else {
            playlist.push(video);
            alert('Video added to the playlist');
        }

        localStorage.setItem('playlist', JSON.stringify(playlist));
        window.location.href = 'index.html';
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