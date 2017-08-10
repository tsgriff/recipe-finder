DELETE FROM notes
WHERE user_id = $1
AND recipe_id = $2
AND note_id = $3
