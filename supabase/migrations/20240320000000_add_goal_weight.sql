-- Add goal_weight column as nullable
ALTER TABLE user_profiles ADD COLUMN goal_weight decimal;

-- Add a check constraint to ensure goal weight is positive when set
ALTER TABLE user_profiles ADD CONSTRAINT goal_weight_positive CHECK (goal_weight IS NULL OR goal_weight > 0); 