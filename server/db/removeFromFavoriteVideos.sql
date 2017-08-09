DELETE FROM favorite_videos
WHERE user_id = $1 and
video_id = $2
