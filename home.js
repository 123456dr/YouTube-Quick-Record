document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const API_KEY = 'AIzaSyCHIxiJYonPXPkbdE5tssHxgN1v5jw1Xqs';
    const backButton = document.getElementById('backButton');

    // 從 sessionStorage 讀取並顯示搜尋結果
    const savedResults = sessionStorage.getItem('searchResults');
    if (savedResults) {
        searchResults.innerHTML = savedResults;
        attachVideoClickHandlers(); // 為儲存的影片項目附加點擊事件處理程序
    }

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${API_KEY}`);
        const searchData = await searchResponse.json();
        searchResults.innerHTML = '';

        // 獲取影片時長
        const videoIds = searchData.items.map(video => video.id.videoId).join(',');
        const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`);
        const detailsData = await detailsResponse.json();

        const videoDetails = detailsData.items.reduce((acc, video) => {
            acc[video.id] = video.contentDetails.duration;
            return acc;
        }, {});

        // 顯示搜尋結果
        let resultsHtml = '';
        searchData.items.forEach(video => {
            const duration = formatDuration(videoDetails[video.id.videoId]);
            resultsHtml += `
                <div class="video-item" data-id="${video.id.videoId}">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}"> <!-- 使用高解析度縮圖 -->
                    <div>
                        <h3>${video.snippet.title}</h3>
                        <p>${duration}</p>
                    </div>
                </div>
            `;
        });
        searchResults.innerHTML = resultsHtml;
        sessionStorage.setItem('searchResults', resultsHtml);
        attachVideoClickHandlers(); // 附加點擊事件處理程序
    });

    function formatDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = match[1] ? match[1].replace('H', '') : '0';
        const minutes = match[2] ? match[2].replace('M', '') : '0';
        const seconds = match[3] ? match[3].replace('S', '') : '0';
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }

    function attachVideoClickHandlers() {
        document.querySelectorAll('.video-item').forEach(videoElement => {
            videoElement.addEventListener('click', () => {
                const videoId = videoElement.getAttribute('data-id');
                // 構造影片物件並保存到 localStorage
                const video = {
                    id: { videoId },
                    snippet: {
                        title: videoElement.querySelector('h3').textContent,
                        thumbnails: { high: { url: videoElement.querySelector('img').src } }
                    }
                };
                localStorage.setItem('currentVideo', JSON.stringify(video));
                window.location.href = 'videoDetail.html';
            });
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });

    // 從 URL 讀取查詢並自動觸發搜尋
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query');
    if (searchQuery) {
        searchInput.value = searchQuery;
        searchButton.click(); // 觸發搜尋
    }
});




/* 鄭成功版無連結搜尋
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const API_KEY = 'AIzaSyCHIxiJYonPXPkbdE5tssHxgN1v5jw1Xqs';
    const backButton = document.getElementById('backButton');

    // 從 sessionStorage 讀取並顯示搜尋結果
    const savedResults = sessionStorage.getItem('searchResults');
    if (savedResults) {
        searchResults.innerHTML = savedResults;
        attachVideoClickHandlers(); // 為儲存的影片項目附加點擊事件處理程序
    }

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${API_KEY}`);
        const searchData = await searchResponse.json();
        searchResults.innerHTML = '';

        // 獲取影片時長
        const videoIds = searchData.items.map(video => video.id.videoId).join(',');
        const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`);
        const detailsData = await detailsResponse.json();

        const videoDetails = detailsData.items.reduce((acc, video) => {
            acc[video.id] = video.contentDetails.duration;
            return acc;
        }, {});
        

        // 顯示搜尋結果
        let resultsHtml = '';
        searchData.items.forEach(video => {
            const duration = formatDuration(videoDetails[video.id.videoId]);
            resultsHtml += `
                <div class="video-item" data-id="${video.id.videoId}">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}"> <!-- 使用高解析度縮圖 -->
                    <div>
                        <h3>${video.snippet.title}</h3>
                        <p> ${duration}</p>
                    </div>
                </div>
            `;
        });
        searchResults.innerHTML = resultsHtml;
        sessionStorage.setItem('searchResults', resultsHtml);
        attachVideoClickHandlers(); // 附加點擊事件處理程序
    });

    function formatDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = match[1] ? match[1].replace('H', '') : '0';
        const minutes = match[2] ? match[2].replace('M', '') : '0';
        const seconds = match[3] ? match[3].replace('S', '') : '0';
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }

    function attachVideoClickHandlers() {
        document.querySelectorAll('.video-item').forEach(videoElement => {
            videoElement.addEventListener('click', () => {
                const videoId = videoElement.getAttribute('data-id');
                const video = {
                    id: { videoId },
                    snippet: {
                        title: videoElement.querySelector('h3').textContent,
                        thumbnails: { high: { url: videoElement.querySelector('img').src } }
                    }
                };
                localStorage.setItem('currentVideo', JSON.stringify(video));
                window.location.href = 'videoDetail.html';
            });
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });
});








/*document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const API_KEY = 'AIzaSyCHIxiJYonPXPkbdE5tssHxgN1v5jw1Xqs';

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${API_KEY}`);
        const searchData = await searchResponse.json();
        searchResults.innerHTML = '';

        // 獲取影片時長
        const videoIds = searchData.items.map(video => video.id.videoId).join(',');
        const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`);
        const detailsData = await detailsResponse.json();

        const videoDetails = detailsData.items.reduce((acc, video) => {
            acc[video.id] = video.contentDetails.duration;
            return acc;
        }, {});

        // 顯示搜尋結果
        searchData.items.forEach(video => {
            const duration = formatDuration(videoDetails[video.id.videoId]);
            searchResults.innerHTML += `
                <div class="video-item" data-id="${video.id.videoId}">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}"> <!-- 使用高解析度縮圖 -->
                    <div>
                        <h3>${video.snippet.title}</h3>
                        <p>Duration: ${duration}</p>
                    </div>
                </div>
            `;
        });

        attachVideoClickHandlers(); // 附加點擊事件處理程序
    });

    function formatDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = match[1] ? match[1].replace('H', '') : '0';
        const minutes = match[2] ? match[2].replace('M', '') : '0';
        const seconds = match[3] ? match[3].replace('S', '') : '0';
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }

    function attachVideoClickHandlers() {
        document.querySelectorAll('.video-item').forEach(videoElement => {
            videoElement.addEventListener('click', () => {
                const videoId = videoElement.getAttribute('data-id');
                const video = {
                    id: { videoId },
                    snippet: {
                        title: videoElement.querySelector('h3').textContent,
                        thumbnails: { high: { url: videoElement.querySelector('img').src } }
                    }
                };
                localStorage.setItem('currentVideo', JSON.stringify(video));
                window.location.href = 'videoDetail.html';
            });
        });
    }

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });
});
*/


/* 無片長版鄭成功版
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const API_KEY = 'AIzaSyCHIxiJYonPXPkbdE5tssHxgN1v5jw1Xqs';

    // 從 sessionStorage 讀取並顯示搜尋結果
    const savedResults = sessionStorage.getItem('searchResults');
    if (savedResults) {
        searchResults.innerHTML = savedResults;
        attachVideoClickHandlers(); // 為儲存的影片項目附加點擊事件處理程序
    }

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${API_KEY}`);
        const data = await response.json();
        searchResults.innerHTML = '';

        // 儲存搜尋結果到 sessionStorage
        let resultsHtml = '';
        data.items.forEach(video => {
            resultsHtml += `
                <div class="video-item" data-id="${video.id.videoId}">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}"> <!-- 使用高解析度縮圖 -->
                    <div>
                        <h3>${video.snippet.title}</h3>
                    </div>
                </div>
            `;
        });
        searchResults.innerHTML = resultsHtml;
        sessionStorage.setItem('searchResults', resultsHtml);
        attachVideoClickHandlers(); // 附加點擊事件處理程序
    });

    // 附加影片項目的點擊事件處理程序
    function attachVideoClickHandlers() {
        document.querySelectorAll('.video-item').forEach(videoElement => {
            videoElement.addEventListener('click', () => {
                const videoId = videoElement.getAttribute('data-id');
                const video = {
                    id: { videoId },
                    snippet: {
                        title: videoElement.querySelector('h3').textContent,
                        thumbnails: { high: { url: videoElement.querySelector('img').src } }
                    }
                };
                localStorage.setItem('currentVideo', JSON.stringify(video));
                window.location.href = 'videoDetail.html';
            });
        });
    }
    backButton.addEventListener('click', () => {
        window.history.back();
    });
});

// 導航按鈕事件處理程序
document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('playlistButton').addEventListener('click', () => {
    window.location.href = 'playlist.html';
});












/*
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const API_KEY = 'AIzaSyCHIxiJYonPXPkbdE5tssHxgN1v5jw1Xqs';

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${API_KEY}`);
        const data = await response.json();
        searchResults.innerHTML = '';
        data.items.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-item');
            videoElement.innerHTML = `
                <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
                <div>
                    <h3>${video.snippet.title}</h3>
                </div>
            `;
            videoElement.addEventListener('click', () => {
                localStorage.setItem('currentVideo', JSON.stringify(video));
                window.location.href = 'videoDetail.html';
            });
            searchResults.appendChild(videoElement);
        });
    });
});



    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });
    */