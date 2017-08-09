DELETE FROM favorite_recipes
WHERE user_id = $1 and
recipe_id = $2
