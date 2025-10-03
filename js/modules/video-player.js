const VideoPlayer = {
    init: function() {
        this.initVideoPlayers();
    },

    initVideoPlayers: function() {
        const videoPlayers = document.querySelectorAll('.video-player');
        
        videoPlayers.forEach(player => {
            this.setupVideoPlayer(player);
        });
    },

    setupVideoPlayer: function(player) {
        const video = player.querySelector('video');
        const playPauseBtn = player.querySelector('.play-pause');
        const volumeBtn = player.querySelector('.volume-btn');
        const progressBar = player.querySelector('.progress-bar');
        const progress = player.querySelector('.progress');
        const currentTimeEl = player.querySelector('.current-time');
        const totalTimeEl = player.querySelector('.total-time');
        const fullscreenBtn = player.querySelector('.fullscreen-btn');
        
        // Format time
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        // Update time display
        function updateTime() {
            currentTimeEl.textContent = formatTime(video.currentTime);
            totalTimeEl.textContent = formatTime(video.duration);
            progress.style.width = (video.currentTime / video.duration) * 100 + '%';
        }
        
        // Play/pause functionality
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '❚❚';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
            }
        });
        
        // Volume control
        volumeBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                volumeBtn.textContent = '🔊';
            } else {
                video.muted = true;
                volumeBtn.textContent = '🔇';
            }
        });
        
        // Progress bar seeking
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            video.currentTime = percent * video.duration;
        });
        
        // Fullscreen functionality
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                player.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
        
        // Event listeners
        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateTime);
        video.addEventListener('ended', () => {
            playPauseBtn.textContent = '▶';
            video.currentTime = 0;
        });
        
        // Auto-hide controls
        let controlsTimeout;
        player.addEventListener('mousemove', () => {
            player.querySelector('.video-controls').style.opacity = '1';
            clearTimeout(controlsTimeout);
            controlsTimeout = setTimeout(() => {
                player.querySelector('.video-controls').style.opacity = '0';
            }, 3000);
        });

        // Show controls when hovering
        player.addEventListener('mouseenter', () => {
            player.querySelector('.video-controls').style.opacity = '1';
        });

        player.addEventListener('mouseleave', () => {
            controlsTimeout = setTimeout(() => {
                player.querySelector('.video-controls').style.opacity = '0';
            }, 1000);
        });
    },

    pauseAllVideos: function() {
        document.querySelectorAll('.video-player video').forEach(video => {
            video.pause();
        });
    },

    playAllVideos: function() {
        document.querySelectorAll('.video-player video').forEach(video => {
            video.play();
        });
    }
};