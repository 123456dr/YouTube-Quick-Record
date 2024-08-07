document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const playlistSection = document.getElementById('playlistSection');
    const playlist = document.getElementById('playlist');
    const videoDetailSection = document.getElementById('videoDetailSection');
    const videoTitle = document.getElementById('videoTitle');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const addToPlaylistButton = document.getElementById('addToPlaylistButton');
    const watchTimeInput = document.getElementById('watchTimeInput');
    const updateWatchRecordButton = document.getElementById('updateWatchRecordButton');
    const videoLink = document.getElementById('videoLink');
    const removeFromPlaylistButton = document.getElementById('removeFromPlaylistButton');
    const homeButton = document.getElementById('homeButton');
    const playlistButton = document.getElementById('playlistButton');
    const backButton = document.getElementById('backButton');
    const API_KEY = 'AIzaSyCHIxiJYonPXPkbdE5tssHxgN1v5jw1Xqs';

    let currentVideoId = '';
    let playlistVideos = [];





// 當按下搜索按鈕時，觸發搜索功能
searchButton.addEventListener('click', async () => {
    const query = searchInput.value;  // 獲取輸入的搜索關鍵字
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${API_KEY}`);  // 向 YouTube API 發送搜索請求
    const data = await response.json();  // 解析返回的 JSON 數據
    searchResults.innerHTML = '';  // 清空之前的搜索結果
    data.items.forEach(video => {  // 遍歷返回的影片數據
        const videoElement = document.createElement('div');  // 創建一個新的 `div` 元素來顯示影片
        videoElement.classList.add('video-item');  // 添加 `video-item` 類名以應用樣式
        videoElement.innerHTML = `
            <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">  // 顯示影片縮略圖
            <div>
                <h3>${video.snippet.title}</h3>  // 顯示影片標題
            </div>
        `;
        // 當點擊某個搜索結果時，顯示影片詳情
        videoElement.addEventListener('click', () => {
            currentVideoId = video.id.videoId;  // 設置當前影片 ID
            showVideoDetail(video.snippet.title, video.snippet.thumbnails.high.url);  // 顯示影片詳情
        });
        searchResults.appendChild(videoElement);  // 將影片元素添加到搜索結果區域
    });
});

// 顯示影片詳情的函數
const showVideoDetail = (title, thumbnail) => {
    searchResults.classList.add('hidden');  // 隱藏搜索結果區域
    videoDetailSection.classList.remove('hidden');  // 顯示影片詳情區域
    videoTitle.textContent = title;  // 設置影片標題
    videoThumbnail.src = thumbnail;  // 設置影片縮略圖
    videoLink.href = `https://www.youtube.com/watch?v=${currentVideoId}`;  // 設置影片連結
};

// 當按下添加到播放清單按鈕時，將影片添加到播放清單
addToPlaylistButton.addEventListener('click', () => {
    if (!playlistVideos.includes(currentVideoId)) {  // 如果播放清單中沒有當前影片
        playlistVideos.push(currentVideoId);  // 將當前影片添加到播放清單
        alert('Video added to playlist');  // 彈出提示框顯示已添加
    }
});

// 當按下首頁按鈕時，顯示搜索結果區域並隱藏其他區域
homeButton.addEventListener('click', () => {
    playlistSection.classList.add('hidden');  // 隱藏播放清單區域
    searchResults.classList.remove('hidden');  // 顯示搜索結果區域
    videoDetailSection.classList.add('hidden');  // 隱藏影片詳情區域
});

// 當按下播放清單按鈕時，顯示播放清單區域並隱藏其他區域
playlistButton.addEventListener('click', () => {
    searchResults.classList.add('hidden');  // 隱藏搜索結果區域
    videoDetailSection.classList.add('hidden');  // 隱藏影片詳情區域
    playlistSection.classList.remove('hidden');  // 顯示播放清單區域
    showPlaylist();  // 顯示播放清單
});

// 顯示播放清單的函數
const showPlaylist = () => {
    playlist.innerHTML = '';  // 清空之前的播放清單
    playlistVideos.forEach(videoId => {  // 遍歷播放清單中的影片 ID
        const videoElement = document.createElement('div');  // 創建一個新的 `div` 元素來顯示播放清單中的影片
        videoElement.classList.add('video-item');  // 添加 `video-item` 類名以應用樣式
        videoElement.innerHTML = `
            <img src="https://img.youtube.com/vi/${videoId}/default.jpg" alt="Video">  // 顯示影片縮略圖
            <div>
                <h3>Video Title</h3>  // 顯示影片標題（實際應替換為真實標題）
            </div>
        `;
        videoElement.addEventListener('click', () => {
            // 實現顯示播放清單中影片的詳情
        });
        playlist.appendChild(videoElement);  // 將影片元素添加到播放清單區域
    });
};

// 當按下返回按鈕時，顯示搜索結果區域並隱藏影片詳情區域
backButton.addEventListener('click', () => {
    videoDetailSection.classList.add('hidden');  // 隱藏影片詳情區域
    searchResults.classList.remove('hidden');  // 顯示搜索結果區域
});

// 實現剩餘的事件監聽器和功能
});


