document.addEventListener('DOMContentLoaded', () => {
    
    const backButton = document.getElementById('backButton');


    //保全:avoid those who load in this page without entering passwd (who via type the url in search) 
    if (!sessionStorage.getItem('authorized')) {
        window.location.href = 'index.html';
    }

    document.getElementById('homeButton').addEventListener('click', () => {
        sessionStorage.removeItem('authorized'); // 清除授權狀態
    });
    document.getElementById('how').addEventListener('click', () => {
        sessionStorage.removeItem('authorized'); // 清除授權狀態
    });
    document.getElementById('playlistButton').addEventListener('click', () => {
        sessionStorage.removeItem('authorized'); // 清除授權狀態
    });


    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    
    document.getElementById('how').addEventListener('click', () => {
        window.location.href = 'how.html';
    });

    document.getElementById('playlistButton').addEventListener('click', () => {
        window.location.href = 'playlist.html';
    });




    document.getElementById('birthButton').addEventListener('click', () => {
        window.location.href = 'birthday.html';
    });
    
});