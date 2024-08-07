document.addEventListener('DOMContentLoaded', () => {
    const playlistContainer = document.getElementById('playlist');
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    const renderPlaylist = () => {
        playlistContainer.innerHTML = '';
        playlist.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-item');
            videoElement.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <div>
                    <h3>${video.title}</h3>
                    <p>Watch Time: ${video.watchTime}</p>
                </div>
                <div class="button-container">
                    <button class="removeFromPlaylistButton">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            videoElement.querySelector('.removeFromPlaylistButton').addEventListener('click', (event) => {
                event.stopPropagation(); // 防止點擊事件傳播到 videoElement
                playlist = playlist.filter(v => v.id !== video.id);
                localStorage.setItem('playlist', JSON.stringify(playlist));
                renderPlaylist(); // 重新渲染播放列表
                //alert('Video removed from playlist');
            });
            videoElement.addEventListener('click', () => {
                localStorage.setItem('currentVideo', JSON.stringify(video));
                window.location.href = 'playlistDetail.html';
            });
            playlistContainer.appendChild(videoElement);
        });
    };

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.history.back();
    });

    renderPlaylist();
});

document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('playlistButton').addEventListener('click', () => {
    window.location.href = 'playlist.html';
});




/*document.addEventListener('DOMContentLoaded', () => {
    const playlistContainer = document.getElementById('playlist');
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

    const renderPlaylist = () => {
        playlistContainer.innerHTML = '';
        playlist.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video-item');
            videoElement.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <div>
                    <h3>${video.title}</h3>
                    <p>Watch Time: ${video.watchTime}</p>
                </div>
            `;
            videoElement.addEventListener('click', () => {
                localStorage.setItem('currentVideo', JSON.stringify(video));
                window.location.href = 'playlistDetail.html';
            });
            playlistContainer.appendChild(videoElement);
        });
    };
    backButton.addEventListener('click', () => {
        window.history.back();
    });

    renderPlaylist();
});



    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });

    */