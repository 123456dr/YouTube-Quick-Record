# YouTube-Quick-Record

## A website that can quickly set up video recording points, <br>
Inspired by the fact that more and more people in today's society like to watch long-form YouTube storytelling series videos, <br>
but cannot watch more than 20 hours of videos in one go,<br>
so it provides them with the opportunity to rely on this platform to record. <br>
<br>
## Why not use the playlist function provided by YouTube? <br>
Since the original idea was to create a functional website with one-click projection to smart TVs,<br>
 due to considerations of time and ability,<br>
 I have not yet conducted in-depth research (I am a student who recently took the 學測)



### note
保全:avoid those who load in this page without entering passwd (who via type the url in search) 

```
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
